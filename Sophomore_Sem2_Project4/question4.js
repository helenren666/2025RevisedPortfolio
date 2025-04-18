// 加载自定义字体
const customFont = new FontFace('DripTitle', 'url(assets/coolfont.otf)');
customFont.load().then(font => {
  document.fonts.add(font);
  document.querySelector('h1').style.fontFamily = 'DripTitle, sans-serif';
});

// 初始化分数
const scoreValue = document.getElementById('score-value');
let score = Number(localStorage.getItem("score")) || 0;
scoreValue.textContent = score;

// 元素绑定
const options = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');

const correctAnswer = "Ric Flair Drip";

options.forEach(btn => {
  btn.addEventListener('click', () => {
    options.forEach(b => b.disabled = true);
    const userAnswer = btn.dataset.answer; // ✅ 用 data-answer 取值
    localStorage.setItem("answer4", userAnswer);

    if (userAnswer === correctAnswer) {
      btn.classList.add('correct');
      feedback.textContent = "✅ Correct!";
      updateScore(10);
    } else {
      btn.classList.add('wrong');
      feedback.textContent = `❌ Wrong! Correct: ${correctAnswer}`;
    }

    nextBtn.style.display = 'inline-block';
  });
});

nextBtn.addEventListener('click', () => {
  window.location.href = "question5.html";
});

function updateScore(delta) {
  score += delta;
  localStorage.setItem("score", score);
  scoreValue.textContent = score;
}
