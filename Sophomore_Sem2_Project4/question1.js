// 加载 h1 字体
const customFont = new FontFace('DripTitle', 'url(assets/coolfont.otf)');
customFont.load().then(font => {
  document.fonts.add(font);
  document.querySelector('h1').style.fontFamily = 'DripTitle, sans-serif';
});

// 元素引用
const options = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const scoreValue = document.getElementById('score-value');

// 正确答案
const correctAnswer = "Sicko Mode";

// 初始化分数
let score = Number(localStorage.getItem("score")) || 0;
scoreValue.textContent = score;

// 答题逻辑
options.forEach(btn => {
  btn.addEventListener('click', () => {
    options.forEach(b => b.disabled = true);
    const userAnswer = btn.textContent;
    localStorage.setItem("answer1", userAnswer);

    if (userAnswer === correctAnswer) {
      btn.classList.add('correct');
      feedback.textContent = "✅ Correct!";
      updateScore(10); // 答对 +10 分
    } else {
      btn.classList.add('wrong');
      feedback.textContent = `❌ Wrong! Correct: ${correctAnswer}`;
    }

    nextBtn.style.display = 'inline-block';
  });
});

// 跳转下一题
nextBtn.addEventListener('click', () => {
  window.location.href = "question2.html";
});

// 更新分数
function updateScore(delta) {
  score += delta;
  localStorage.setItem("score", score);
  scoreValue.textContent = score;
}

