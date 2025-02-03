let bgMusic;
let nextButton1, nextButton2, nextButton3;
let nextButton7, nextButton10, nextButton11, nextButton12;
let replayGame1button;
let pixelFont;
let replayGame15Button;

let foodArray = [];
let assets = [];
let mouth1;
let assetNum = 5; // initial amount of food generated
let sceneNum = 0;
let score = 0;
let foodCount = 0;
let scene1StartTime = 0;

let lastSpawnTime = 0; // last time food generated
let spawnedCount = 0; // # of food generated already
let maxAdditionalSpawn = 6; // Maximum # of extra generated food

let angle = 0; // Initial angle in degrees
let angleSpeed = 2; // Speed of rotation
let direction = 1; // Direction of rotation: 1 means clockwise, -1 means counterclockwise
let game2StartTime = 0; // To keep track of the start time of the game

// let goToBalanceSceneButton;
// let goToWeightLiftSceneButton;

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//let sceneNum = 12;
let img1down, img1up, img2down, img2up, img3down, img3up;
let actions = []; // 存储动作组合
let currentAction = 0; // 当前正在进行的动作索引
let repetitions = 0; // 当前动作的重复次数
let currentState = "down"; // 当前动作的状态，可能是 "down" 或 "up"
let timer; // 倒计时时间（秒）
let settime = 20;
let timerStart; // 记录计时开始的时间
let scene13Timer = 0; // 场景13的计时器
let replayGame3Button;
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let img1, img2;
let img3, img4;
let kitchenimg;
let woodimg;

let scene0img, scene1img, scene2img, scene4img, scene5img, scene6img;
let scene7img, scene8img, scene9img, scene10img, scene11img;
let scene13img, scene14img, scene15img;

function preload() {
  soundFormats("mp3", "wav"); // 指定支持的音频格式
  bgMusic = loadSound("background.wav"); // 加载背景音乐文件
  pixelFont = loadFont("pixelFont.ttf");

  img1 = loadImage("balanceGameAssets/ppl1.png");
  img2 = loadImage("balanceGameAssets/ppl2.png");
  img3 = loadImage("eatGame/eat1.png");
  img4 = loadImage("eatGame/eat2.png");
  kitchenimg = loadImage("eatGame/kitchen.png");
  woodimg = loadImage("balanceGameAssets/wood.png");

  scene0img = loadImage("scenepage/scene0.jpg");
  scene1img = loadImage("scenepage/scene1.jpg");
  scene2img = loadImage("scenepage/scene2.jpg");
  scene4img = loadImage("scenepage/scene4.jpg");
  scene5img = loadImage("scenepage/scene5.jpg");
  scene6img = loadImage("scenepage/scene6.jpg");
  scene7img = loadImage("scenepage/scene7.jpg");
  scene8img = loadImage("scenepage/scene8.jpg");
  scene9img = loadImage("scenepage/scene9.jpg");
  scene10img = loadImage("scenepage/scene10.jpg");
  scene11img = loadImage("scenepage/scene11.jpg");
  scene13img = loadImage("scenepage/scene13.jpg");
  scene14img = loadImage("scenepage/scene14.jpg");
  scene15img = loadImage("scenepage/scene15.jpg");

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  img1down = loadImage("game3/act1down.jpg");
  img1up = loadImage("game3/act1up.jpg");
  img2down = loadImage("game3/act2down.jpg");
  img2up = loadImage("game3/act2up.jpg");
  img3down = loadImage("game3/act3down.jpg");
  img3up = loadImage("game3/act3up.jpg");
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Manually define calorie values for each image
  const calorieValues = [
    0,
    150,
    25,
    135,
    200,
    200,
    75,
    100,
    10,
    35,
    70,
    200,
    10,
    20,
    145,
    250,
    350,
    20,
    15,
    15,
    5,
    140,
    85,
    15,
    200,
    115,
    15,
    85,
    85,
    100,
  ];
  //0=index0, 150=index 1

  // Load each image and pair it with its specific calorie value
  for (let i = 1; i <= 29; i++) {
    let img = loadImage(`assets/fod${nf(i, 5)}.png`); // Load images named 'food00001.jpg' to 'food00029.jpg'
    let calories = calorieValues[i]; // Assign calorie based on the index
    foodArray.push({ img: img, calories: calories });
  }
}

function createDynamicButton(label, relativeX, relativeY, callback) {
  let button = createButton(label);
  button.mousePressed(callback);
  button.hide(); // 初始隐藏
  button.style("position", "absolute"); // 确保按钮绝对定位
  button.style("z-index", "10"); // 保证在画布之上
  positionButton(button, relativeX, relativeY); // 设置初始位置
  return button;
}

function positionButton(button, relativeX, relativeY) {
  let canvasPosition = canvas.position(); // 获取 canvas 的位置
  button.position(canvasPosition.x + relativeX, canvasPosition.y + relativeY);
}

function updateButtonPositions() {
  positionButton(replayGame3Button, 150, 400);
  positionButton(replayGame15Button, 200, 560);
  positionButton(nextButton1, 200, 500);
  positionButton(nextButton2, 200, 500);
  positionButton(nextButton3, 330, 560);
  positionButton(nextButton7, 330, 560);
  positionButton(nextButton10, 300, 560);
  positionButton(nextButton11, 200, 560);
  positionButton(nextButton12, 200, 500);
  positionButton(replayGame1button, 300, 560);
  positionButton(replayGame2button, 250, 500);
}


function setup() {
  // 创建 canvas 并指定父容器
  canvas = createCanvas(400, 600).parent("sketch-container1");
  bgMusic.loop(); // 循环播放背景音乐
  bgMusic.setVolume(0.5); // 设置音量

  // 初始化动作组合数组，确保每个动作至少出现两次
  actions = [1, 1, 2, 2, 3, 3];
  shuffle(actions, true); // 打乱数组顺序

  // 开始显示第一个动作的初始状态
  showCurrentAction();

  // 记录计时开始的时间
  timerStart = millis();

  // 创建动态按钮
  replayGame3Button = createDynamicButton("play again", 150, 400, replayGame);
  replayGame15Button = createDynamicButton("Play Everything Again", 200, 560, resetGame);
  nextButton1 = createDynamicButton("LETS GO", 200, 500, () => (sceneNum = 1));
  nextButton2 = createDynamicButton("Next", 200, 500, () => (sceneNum = 2));
  nextButton3 = createDynamicButton("begin", 330, 560, () => (sceneNum = 3));
  nextButton7 = createDynamicButton("begin", 330, 560, () => (sceneNum = 7));
  nextButton10 = createDynamicButton("Next Game", 300, 560, () => (sceneNum = 10));
  nextButton11 = createDynamicButton("See rules", 200, 560, () => (sceneNum = 11));
  nextButton12 = createDynamicButton("begin", 200, 500, () => {
    sceneNum = 12;
    timerStart = millis(); // 重新初始化计时器
    currentAction = 0; // 重置当前动作索引
    repetitions = 0; // 重置重复次数
  });
  replayGame1button = createDynamicButton("play again", 300, 560, () => {
    sceneNum = 3;
    score = 0; // 重置分数
    foodCount = 0; // 重置食物计数
    spawnedCount = 0; // 重置生成的食物数量
    assets = []; // 清空当前的食物对象
    lastSpawnTime = millis(); // 重置上一次生成食物的时间
    for (let i = 0; i < assetNum; i++) {
      let foodItem = random(foodArray);
      assets.push(
        new FoodAsset(
          random(0, 350),
          random(0, 400),
          foodItem.img,
          foodItem.calories
        )
      );
    }
  });
  replayGame2button = createDynamicButton("play again", 250, 500, () => {
    sceneNum = 7;
    angle = 0; // 重置角度
    direction = 1; // 重置旋转方向为顺时针
    game2StartTime = 0; // 重置游戏开始时间
  });

  // 创建玩家嘴巴对象
  mouth1 = new mouth(img3, img4);

  // 初始化食物对象
  for (let i = 0; i < assetNum; i++) {
    let foodItem = random(foodArray); // 随机选择食物和对应的卡路里值
    assets.push(
      new FoodAsset(
        random(0, 350), // 随机水平位置
        random(0, 400), // 随机垂直位置
        foodItem.img,
        foodItem.calories // 赋值卡路里
      )
    );
  }
}


class mouth {
  constructor(playerImage, altImg) {
    this.x = width / 2;
    this.y = height - 50;
    this.w = 40;
    this.h = 40;
    this.c = color(0, 255, 0);

    this.img = playerImage;
    this.altImage = altImg;

    this.isAltImage = false;

    this.timer = 0;
  }
  body() {
    if (this.isAltImage) {
      push();
      translate(this.x, this.y); // 将图像的原点移动到 mouth 的中心
      rotate(radians(-45)); // 旋转 -45 度
      imageMode(CENTER); // 设置图像从中心开始绘制
      image(this.altImage, 0, 0, this.w, this.h); // 绘制图像
      pop();

      this.timer += deltaTime / 1000;
      if (this.timer > 0.5) {
        this.isAltImage = false;
      }
    } else {
      push();
      translate(this.x, this.y);
      rotate(radians(-45));
      imageMode(CENTER);
      image(this.img, 0, 0, this.w, this.h);
      pop();
    }
  }
  move() {
    // left
    if (keyIsDown(37)) {
      this.x -= 2;
    }
    // right
    if (keyIsDown(39)) {
      this.x += 2;
    }
  }
  setImage() {
    this.isAltImage = true;
    this.timer = 0;
  }
}

class FoodAsset {
  constructor(x, y, img, calories) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.scaleFactor = random(0.3, 0.6); // random size factor
    this.size = this.img.width * this.scaleFactor;
    this.colliding = false;
    this.previouscolliding = false;
    this.speed = random(0.7, 1.0); // random spee d falling
    this.calorieScore = calories; // assign calorie value
  }

  display() {
    image(this.img, this.x, this.y, this.size, this.size);
  }

  move() {
    this.y += this.speed; // speed assigned to food image
  }

  checkCollision() {
    if (
      mouth1.x + mouth1.w / 2 > this.x &&
      mouth1.x - mouth1.w / 2 < this.x + this.size &&
      mouth1.y + mouth1.h / 2 > this.y &&
      mouth1.y - mouth1.h / 2 < this.y + this.size
    ) {
      this.colliding = true;
    } else {
      this.colliding = false;
    }
  }
  win() {
    if ((score <= 300) & (foodCount == 4)) {
      sceneNum = 4; // win change scene
    } else if ((score > 300) & (foodCount == 4)) {
      sceneNum = 5; //lose scene
    }
  }
}

function draw() {
  switch (sceneNum) {
    case 0:
      scene0();
      break;
    case 1:
      scene1();
      break;
    case 2:
      scene2();
      break;

    case 3:
      scene3();
      break;

    case 4:
      if (scene1StartTime === 0) {
        scene1StartTime = millis();
      }

      scene4();

      // Check if 1.5 seconds have passed since entering scene1
      if (millis() - scene1StartTime > 1500) {
        sceneNum = 6;
        scene1StartTime = 0; // Reset the start time for future use
      }

      break;

    case 5:
      scene5();
      break;

    case 6:
      scene6();
      break;
    case 7:
      balanceGameplayScene();
      break;
    case 8:
      scene8();
      break;
    case 9:
      scene9();
      break;
    case 10:
      scene10();
      break;
    case 11:
      scene11();
      break;
    case 12:
      scene12();
      break;
    case 13:
      scene13();
      break;
    case 14:
      scene14();
      break;
    case 15:
      scene15();
      break;
    default:
      background(255, 0, 0);
  }
}
// 场景0
function scene0() {
  image(scene0img, 0, 0);
  nextButton1.show(); // 显示 "Next" 按钮
}
//场景1
function scene1() {
  image(scene1img, 0, 0);
  nextButton1.hide(); // 隐藏第一个按钮
  nextButton2.show(); // 显示第二个按钮
  // 在此处添加场景1的内容
}

// 场景2
function scene2() {
  image(scene2img, 0, 0);
  nextButton2.hide(); // 隐藏第二个按钮
  nextButton3.show(); // 显示第三个按钮
}

function scene3() {
  nextButton3.hide(); // 隐藏第三个按钮
  replayGame1button.hide();
  image(kitchenimg, 0, 0, 400, 600, 0, 0, width, height);

  // generate new food every second until maximum # of food assigned
  if (millis() - lastSpawnTime > 1000 && spawnedCount < maxAdditionalSpawn) {
    let foodItem = random(foodArray);
    assets.push(
      new FoodAsset(
        random(0, 400), // range horizontally
        random(0, 50), // range vertically
        foodItem.img,
        foodItem.calories
      )
    );
    lastSpawnTime = millis(); // update last generation time
    spawnedCount++; // increment food count
  }

  let indicesToRemove = []; // to record indices of colliding food items

  for (let i = 0; i < assets.length; i++) {
    assets[i].checkCollision();
    if (assets[i].colliding) {
      indicesToRemove.push(i);
      score += assets[i].calorieScore; // Add calories to score
      foodCount++;

      // mouth1.c = color(255, 0, 0); // change mouth color on collision
      mouth1.setImage();
    }
  }

  // Remove collided food items to avoid index conflicts
  for (let i = indicesToRemove.length - 1; i >= 0; i--) {
    assets.splice(indicesToRemove[i], 1);
  }

  // Display and move remaining food items
  for (let i = 0; i < assets.length; i++) {
    assets[i].display();
    assets[i].move();
    assets[i].win(); // check win condition
  }

  // Display mouth
  mouth1.body();
  mouth1.move();

  // Display score
  fill(0);
  textSize(16);
  text(`Calorie ${score}`, 50, 50);

  fill(0);
  textSize(16);
  text(`Food ${foodCount}`, 200, 50);
}

function scene4() {
  image(scene4img, 0, 0);
}
function scene5() {
  replayGame1button.show();
  image(scene5img, 0, 0);
}
function scene6() {
  image(scene6img, 0, 0);
  nextButton7.show();
}
function balanceGameplayScene() {
  image(scene7img, 0, 0);
  image(woodimg, 175, 285, 60, 60);

  // 隐藏 replayGame2button
  replayGame2button.hide();
  nextButton7.hide();

  // 启动游戏计时器
  if (game2StartTime === 0) {
    game2StartTime = millis();
  }

  // 显示倒计时
  textSize(32);
  text(`time: ${floor((millis() - game2StartTime) / 1000)}` + " s", 100, 100);

  // 进行画布的旋转和移动
  push(); // 保存当前的绘制状态
  translate(width / 2, height / 2);
  rotate(radians(angle));

  // 根据旋转角度选择图像
  let currentImg;
  if (angle > -45 && angle < 45) {
    currentImg = img1;
  } else {
    currentImg = img2;
  }

  // 绘制中心点的角色
  imageMode(CENTER);
  image(currentImg, 0, -currentImg.height / 2);

  pop(); // 恢复绘制状态

  // 更新角度
  angle += angleSpeed * direction;

  // 游戏逻辑判断
  if (angle >= 90 || angle <= -90) {
    sceneNum = 9; // 切换到失败场景
    game2StartTime = millis(); // 记录失败时间
    return;
  }

  if (millis() - game2StartTime >= 10000) {
    sceneNum = 8; // 切换到成功场景
    game2StartTime = millis(); // 记录成功时间
    return;
  }
}

function scene8() {
  image(scene8img, 0, 0);
  nextButton10.show();
  // textSize(19);
  // fill('red');
  // text("press right arrow to continue", 0, 500);
}

function scene9() {
  image(scene9img, 0, 0);
  replayGame2button.show(); // 显示 replayGame2button 按钮
}
function scene10() {
  image(scene10img, 0, 0);
  nextButton10.hide();
  nextButton11.show();
}
function scene11() {
  image(scene11img, 0, 0);
  nextButton11.hide();
  nextButton12.show();
}
function scene12() {
  nextButton11.hide();
  nextButton12.hide();
  // 更新倒计时器
  let elapsedTime = (millis() - timerStart) / 1000;
  timer = settime - elapsedTime;

  //gpt1新给我加的 测试一下
  // 根据 currentState 显示当前动作的图片
  switch (actions[currentAction]) {
    case 1:
      if (currentState === "down") {
        image(img1down, 0, 0);
      } else {
        image(img1up, 0, 0);
      }
      break;
    case 2:
      if (currentState === "down") {
        image(img2down, 0, 0);
      } else {
        image(img2up, 0, 0);
      }
      break;
    case 3:
      if (currentState === "down") {
        image(img3down, 0, 0);
      } else {
        image(img3up, 0, 0);
      }
      break;
  }

  push();
  // 显示动作和重复次数
  fill(0);
  textSize(24);
  textAlign(LEFT, TOP);
  text(
    "Actions Completed: " +
      currentAction +
      " / 6\nReps: " +
      repetitions +
      " / 4",
    10,
    10
  );
  pop();

  // 显示进度条
  let progressBarWidth = 300;
  let progress = map(timer, 0, settime, 0, progressBarWidth);
  fill(255);
  rect(50, 100, progressBarWidth, 20); // 绘制空的进度条框架
  fill(255, 150, 0);
  rect(50, 100, progress, 20); // 绘制进度条

  // 检查是否超时
  if (timer <= 0) {
    if (currentAction < actions.length) {
      sceneNum = 14; // 时间结束且未完成所有动作，跳转到场景14
    } else {
      sceneNum = 13; // 时间结束且已完成所有动作，跳转到场景13
    }
  }
}
function scene13() {
  // 胜利场景
  image(scene13img, 0, 0);

  scene13Timer += deltaTime / 1000; // 使用 deltaTime 保证时间准确

  // 检查是否经过5秒，跳转到场景15
  if (scene13Timer >= 2) {
    sceneNum = 15; // 跳转到场景15
  }
}
function scene14() {
  // 失败场景
  image(scene14img, 0, 0);
  replayGame3Button.show();
}
function scene15() {
  // 胜利场景
  image(scene15img, 0, 0);
  replayGame15Button.show();
}

function keyPressed() {
  switch (sceneNum) {
    case 0:
      break;

    case 1:
      break;

    case 2:
      break;
    case 3:
      break;
    case 4:
      break;
    case 5:
      break;

    case 6:
      break;
    case 7:
      //left arrow pressed, counterclockwise
      if (keyCode === LEFT_ARROW) {
        direction = random(-0.1, -2);
      }

      // right arrow pressed, clockwise
      if (keyCode === RIGHT_ARROW) {
        direction = random(0.1, 2);
      }
      break;
    case 8:
      break;
    case 9:
      break;
    case 10:
      break;
    case 11:
      break;
    case 12:
      switch (actions[currentAction]) {
        case 1:
          if (currentState === "down" && keyCode === UP_ARROW) {
            image(img1up, 0, 0);
            currentState = "up";
          } else if (currentState === "up" && keyCode === DOWN_ARROW) {
            image(img1down, 0, 0);
            currentState = "down";
            repetitions++;
          }
          break;
        case 2:
          if (currentState === "down" && keyCode === UP_ARROW) {
            image(img2up, 0, 0);
            currentState = "up";
          } else if (currentState === "up" && keyCode === RIGHT_ARROW) {
            image(img2down, 0, 0);
            currentState = "down";
            repetitions++;
          }
          break;
        case 3:
          if (currentState === "down" && keyCode === UP_ARROW) {
            image(img3up, 0, 0);
            currentState = "up";
          } else if (currentState === "up" && keyCode === DOWN_ARROW) {
            image(img3down, 0, 0);
            currentState = "down";
            repetitions++;
          }
          break;
      }

      // 检查是否完成当前动作的4次重复
      if (repetitions >= 4) {
        currentAction++;
        repetitions = 0;

        // 检查是否完成所有动作
        if (currentAction >= actions.length) {
          sceneNum = 13; // 完成所有动作，跳转到场景13
        } else {
          // 显示下一个动作
          showCurrentAction();
        }
      }
      break;

    case 13:
      break;

    case 14:
      break;

    case 15:
      break;
  }
}
function showCurrentAction() {
  // // 显示当前动作的初始图片
  // currentState = "down";
  // switch (actions[currentAction]) {
  //   case 1:
  //     image(img1down, 0, 0);
  //     break;
  //   case 2:
  //     image(img2down, 0, 0);
  //     break;
  //   case 3:
  //     image(img3down, 0, 0);
  //     break;
  // }

  //gpt1测试一下
  currentState = "down";
}

function replayGame() {
  // 重置所有变量并重新开始游戏
  currentAction = 0;
  repetitions = 0;
  currentState = "down";
  timerStart = millis();
  sceneNum = 12;
  shuffle(actions, true);
  replayGame3Button.hide();
  showCurrentAction();
}

function resetGame() {
  sceneNum = 0; // Go back to scene0
  score = 0; // Reset score
  foodCount = 0; // Reset food count
  spawnedCount = 0; // Reset generated food count
  lastSpawnTime = 0; // Reset last food spawn time
  assets = []; // Clear all food assets
  angle = 0; // Reset rotation angle
  direction = 1; // Reset rotation direction
  game2StartTime = 0; // Reset game 2 start time
  timerStart = millis(); // Reset timer
  repetitions = 0; // Reset repetitions
  currentAction = 0; // Reset current action
  currentState = "down"; // Reset state
  shuffle(actions, true); // Reshuffle actions
  replayGame15Button.hide(); // Hide the reset button

  // Reinitialize food items
  for (let i = 0; i < assetNum; i++) {
    let foodItem = random(foodArray);
    assets.push(
      new FoodAsset(
        random(0, 350),
        random(0, 400),
        foodItem.img,
        foodItem.calories
      )
    );
  }
}
