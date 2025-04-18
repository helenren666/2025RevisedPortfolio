// 加载自定义字体
const customFont = new FontFace('DripTitle', 'url(assets/coolfont.otf)');
customFont.load().then(font => {
  document.fonts.add(font);
  document.querySelector('h1').style.fontFamily = 'DripTitle, sans-serif';
});

// 获取分数
const score = localStorage.getItem("score") || 0;
document.getElementById("score-value").textContent = score;


// 展示所有答案
const answerList = [];
for (let i = 1; i <= 10; i++) {
  const ans = localStorage.getItem(`answer${i}`);
  if (ans) {
    answerList.push(`${i}: ${ans}`);
  }
}
document.getElementById("all-answers").innerHTML = answerList.map(a => `<p>${a}</p>`).join('');

// Restart 按钮逻辑
document.getElementById("restartBtn").addEventListener("click", () => {
  localStorage.clear(); // 清除所有分数和回答
  window.location.href = "project4.html";
});


