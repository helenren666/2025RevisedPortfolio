let font;               // 字体对象
let txt ;  // 初始文字
let textEffect;         // 全局的文本效果对象

// color picker，用于选择在三个效果中使用的基础色
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
  txt = "Stock";
  let points = font.textToPoints(txt, 60, 350, 200, {
    sampleFactor: 0.3,
    simplifyThreshold: 0
  });

  // 创建文本效果对象，初始 style=1
  textEffect = new TextEffect(points, 1);

// 按钮事件
select('#btn1').mousePressed(() => {
    txt = "Stock";
    recalcPoints();      // 重算文字点
    textEffect.style = 1; 
  });

  select('#btn2').mousePressed(() => {
    txt = "Helen";
    recalcPoints();
    textEffect.style = 2;
  });

  select('#btn3').mousePressed(() => {
    txt = "Apple";
    recalcPoints();
    textEffect.style = 3;
  });

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
//     "Keyboard input can change the displayed text (backspace supported)\n" +
//     "Click the color picker to set a base color for all effects\n" +
//     "Effect1 & 3 still do dynamic color changes based on distance, etc.\n" +
//     "Effect2 uses the same base color for multi-layer stack.\n" +
//     "Click buttons to switch different effects",
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
  let points = font.textToPoints(txt, 60, 350, 200, {
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

  // ========== 效果1：波动的轮廓线 (保持“随鼠标距离变暗/变亮”) ========== //
  displayWaveOutline() {
    strokeWeight(2);
    noFill();

    this.drawSegmentedLine((i, p) => {
      let off = this.offsets[i];
      let wave = sin(off.angle) * 10; 
      let x = p.x;
      let y = p.y + wave;

      // 1) 先获取 colorPicker 的基础色
      let { rVal, gVal, bVal } = this.getBaseRGB();
      // 2) 计算鼠标距离 -> factor (1 到 0.2)
      let d = dist(mouseX, mouseY, p.x, p.y);
      let factor = map(d, 0, width, 1.0, 0.2); 
      // 3) 用 factor 缩放基础色
      let rr = rVal * factor;
      let gg = gVal * factor;
      let bb = bVal * factor;

      stroke(rr, gg, bb);
      return { x, y };
    });
  }

  // ========== 效果2：多重堆叠 (堆叠层数随鼠标Y) ========== //
  display3DStack() {
    // 从 colorPicker 中取基础色
    let { rVal, gVal, bVal } = this.getBaseRGB();

    let baseline = this.center.y;
    let diff = mouseY - baseline;
    let distAbs = abs(diff);
    let layers = floor(distAbs / 10);

    if (layers === 0) {
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
      return;
    }

    // 先绘制一次基准文字
    stroke(rVal, gVal, bVal, 255);
    strokeWeight(2);
    noFill();
    this.drawSegmentedLine((i, p) => {
      let off = this.offsets[i];
      let dx = sin(off.angle) * 2;
      return { x: p.x + dx, y: p.y };
    });

    let direction = diff > 0 ? 1 : -1;
    for (let l = 1; l <= layers; l++) {
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
        return { x: p.x + dx, y: p.y + offsetY };
      });
    }
  }

  // ========== 效果3：点+辐射线 (保持“随鼠标距离”调节亮度/透明度) ========== //
  displayRadialLines() {
    strokeWeight(1);

    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i];
      let off = this.offsets[i];

      // 基础色
      let { rVal, gVal, bVal } = this.getBaseRGB();

      // 距离因子：越远越暗
      let d = dist(mouseX, mouseY, p.x, p.y);
      let factor = map(d, 0, width, 1.0, 0.2);
      let rr = rVal * factor;
      let gg = gVal * factor;
      let bb = bVal * factor;

      // 给点做少量抖动
      let dx = cos(off.angle) * 1.5;
      let dy = sin(off.angle) * 1.5;
      let px = p.x + dx;
      let py = p.y + dy;

      stroke(rr, gg, bb);
      fill(rr, gg, bb);
      ellipse(px, py, 3, 3);

      noFill();
      // 小线段指向文字中心 40% 处
      let alpha = 0.4;
      let cx = px + alpha * (this.center.x - px);
      let cy = py + alpha * (this.center.y - py);

      line(px, py, cx, cy);
    }
  }

  // 解析 colorPicker 的 hex 颜色为 (r, g, b)
  getBaseRGB() {
    let hexColor = colorPicker.value(); // "#RRGGBB"
    let cObj = color(hexColor);        // p5 color对象
    return {
      rVal: red(cObj),
      gVal: green(cObj),
      bVal: blue(cObj)
    };
  }
}
