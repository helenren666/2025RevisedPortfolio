let font;               // 字体对象
let txt = "Apple";  // 初始文字
let textEffect;         // 全局的文本效果对象

// 用于选择效果2颜色的 color picker
let colorPicker;

function preload() {
  // 加载自定义字体（确保路径和文件名正确）
  font = loadFont("font2.otf");
}

function setup() {
  createCanvas(600, 600).parent("canvasContainer");
  textFont(font);
  textSize(64);
  textAlign(CENTER, CENTER);

  // 获取HTML中的 color picker
  colorPicker = select('#colorPicker');

  // 计算文字点
  let points = font.textToPoints(txt, 50, 380, 200, {
    sampleFactor: 0.3,
    simplifyThreshold: 0
  });

  // 创建文本效果对象，初始 style=1
  textEffect = new TextEffect(points, 1);

  // 按钮事件：切换不同风格
  select('#btn1').mousePressed(() => textEffect.style = 1);
  select('#btn2').mousePressed(() => textEffect.style = 2);
  select('#btn3').mousePressed(() => textEffect.style = 3);
}

function draw() {
  background(0);

  // 更新 & 绘制当前效果
  textEffect.update();
  textEffect.display();

//   // 绘制提示文字
//   noStroke();
//   fill(255);
//   textSize(16);
//   textAlign(LEFT, TOP);
//   text(
//     "Use keyboard to type/delete\n"+"Color only applied on effect 2",
//     10, 10
//   );
}

/** 键盘按下处理：退格 */
function keyPressed() {
  if (keyCode === BACKSPACE || keyCode === DELETE) {
    if (txt.length > 0) {
      txt = txt.substring(0, txt.length - 1);
      recalcPoints();
    }
  }
}

/** 键盘输入处理：添加字符 */
function keyTyped() {
  // 排除一些特殊按键，比如回车
  if (key.length === 1) {
    txt += key;
    recalcPoints();
  }
}

/** 重新计算文字点并更新到 textEffect */
function recalcPoints() {
  let points = font.textToPoints(txt, 50, 380, 200, {
    sampleFactor: 0.3,
    simplifyThreshold: 0
  });
  textEffect.updatePoints(points);
}

/**
 * TextEffect 类：管理三种不同的绘制风格
 */
class TextEffect {
  constructor(points, style) {
    this.points = points;
    this.style = style;
    this.threshold = 20; // 超过此距离就断开轮廓

    // 计算文字中心
    this.center = this.computeCenter(points);

    // 为每个点生成随机动画偏移
    this.offsets = [];
    for (let i = 0; i < points.length; i++) {
      this.offsets.push({
        angle: random(TWO_PI),
        speed: random(0.005, 0.02)
      });
    }
  }

  // 当文字更新时，重新计算
  updatePoints(newPoints) {
    this.points = newPoints;
    this.center = this.computeCenter(newPoints);

    this.offsets = [];
    for (let i = 0; i < newPoints.length; i++) {
      this.offsets.push({
        angle: random(TWO_PI),
        speed: random(0.005, 0.02)
      });
    }
  }

  // 计算所有点的平均位置，作为文字中心
  computeCenter(pts) {
    let cx = 0, cy = 0;
    for (let p of pts) {
      cx += p.x;
      cy += p.y;
    }
    cx /= pts.length;
    cy /= pts.length;
    return { x: cx, y: cy };
  }

  // 每帧更新动画属性
  update() {
    for (let i = 0; i < this.offsets.length; i++) {
      this.offsets[i].angle += this.offsets[i].speed;
    }
  }

  // 根据 style 不同，调用对应的绘制方法
  display() {
    switch (this.style) {
      case 1: this.displayWaveOutline(); break;
      case 2: this.display3DStack();     break;
      case 3: this.displayRadialLines(); break;
    }
  }

  /**
   * 辅助方法：带“断开”的连续线
   * - drawFn(i, p) 用于返回当前点的 (x, y)
   */
  drawSegmentedLine(drawFn) {
    let px, py;
    let isFirstVertex = true;

    beginShape();
    for (let i = 0; i < this.points.length; i++) {
      let { x, y } = drawFn(i, this.points[i]);

      if (!isFirstVertex) {
        let d = dist(x, y, px, py);
        if (d > this.threshold) {
          endShape();
          beginShape();
        }
      }
      vertex(x, y);
      px = x; py = y;
      isFirstVertex = false;
    }
    endShape();
  }

  // ========== 效果1：波动的轮廓线 + 鼠标距离控制颜色 ========== //
  displayWaveOutline() {
    strokeWeight(2);
    noFill();

    this.drawSegmentedLine((i, p) => {
      let off = this.offsets[i];
      let wave = sin(off.angle) * 10;
      let x = p.x;
      let y = p.y + wave;

      // 简单地用鼠标距离映射蓝色值
      let d = dist(mouseX, mouseY, p.x, p.y);
      let b = map(d, 0, width, 255, 50);
      stroke(0, 150, b);

      return { x, y };
    });
  }

  // ========== 效果2：多重堆叠 + 鼠标Y上下扩展 + color picker控制颜色 ========== //
  display3DStack() {
    // 读取 color picker 的十六进制字符串（如 "#C86464"）
    let hexColor = colorPicker.value(); // "#RRGGBB"

    // 将 hex 转成 p5 color 对象
    let cObj = color(hexColor);

    // 分解出 R, G, B
    let rVal = red(cObj);
    let gVal = green(cObj);
    let bVal = blue(cObj);

    // 基准 y：文字中心
    let baseline = this.center.y;
    // 鼠标与基准的差值 (负=上方, 正=下方)
    let diff = mouseY - baseline;
    let distAbs = abs(diff);

    // 将差值映射为堆叠层数 (每 10 像素增加一层)
    let layers = floor(distAbs / 10);

    // 如果层数为 0，则只绘制一次原文字
    if (layers === 0) {
      stroke(rVal, gVal, bVal, 255); // 100%不透明
      strokeWeight(2);
      noFill();

      this.drawSegmentedLine((i, p) => {
        let off = this.offsets[i];
        let dx = sin(off.angle) * 2;
        let x = p.x + dx;
        let y = p.y;
        return { x, y };
      });
      return;
    }

    // 否则，先绘制一次原文字
    stroke(rVal, gVal, bVal, 255);
    strokeWeight(2);
    noFill();
    this.drawSegmentedLine((i, p) => {
      let off = this.offsets[i];
      let dx = sin(off.angle) * 2;
      let x = p.x + dx;
      let y = p.y;
      return { x, y };
    });

    // 判断向上(负)还是向下(正)堆叠
    let direction = diff > 0 ? 1 : -1;

    // 逐层绘制
    for (let l = 1; l <= layers; l++) {
      // 每层在 Y 方向的偏移
      let offsetY = l * 4 * direction;

      // 颜色从不透明到更淡
      let alpha = map(l, 1, layers, 200, 50);
      // 线条也可逐渐变细
      let sw = 2 - (l * 0.05);

      stroke(rVal, gVal, bVal, alpha);
      strokeWeight(sw);
      noFill();

      this.drawSegmentedLine((i, p) => {
        let off = this.offsets[i];
        let dx = sin(off.angle + l * 0.2) * 2;
        let x = p.x + dx;
        let y = p.y + offsetY;
        return { x, y };
      });
    }
  }

  // ========== 效果3：点+辐射线，颜色随鼠标距离变化 ========== //
  displayRadialLines() {
    strokeWeight(1);

    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let off = this.offsets[i];

      // 根据鼠标距离映射一个红色通道
      let d = dist(mouseX, mouseY, p.x, p.y);
      let r = map(d, 0, width, 255, 50);

      let dx = cos(off.angle) * 1.5;
      let dy = sin(off.angle) * 1.5;
      let px = p.x + dx;
      let py = p.y + dy;

      stroke(r, 0, 100);
      fill(r, 0, 100);
      ellipse(px, py, 3, 3);

      noFill();
      let alpha = 0.4;
      let cx = px + alpha * (this.center.x - px);
      let cy = py + alpha * (this.center.y - py);

      line(px, py, cx, cy);
    }
  }
}
