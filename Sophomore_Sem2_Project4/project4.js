
const customFont = new FontFace('DripTitle', 'url(assets/coolfont.otf)');

customFont.load().then(function(loadedFont) {
  document.fonts.add(loadedFont);
  document.querySelector('h1').style.fontFamily = 'DripTitle, sans-serif';
});





// let anims = [...document.querySelectorAll("[anim]")];
// let click = (el, cb) => el.addEventListener("click", cb);
// let toggle = (el) => el.classList.toggle("toggled");
// let clickTog = (el) => click(el, () => {
//   toggle(el);
//   localStorage.setItem("score", 0); // ✅ 清空分数
//   // 跳转到 rule 页面
//   window.location.href = "rule.html";
// });
// anims.map(clickTog);

let anims = [...document.querySelectorAll("[anim]")];

let click = (el, cb) => el.addEventListener("click", cb);

let clickTog = (el) => click(el, () => {
  localStorage.setItem("score", 0); // ✅ 清空分数
  window.location.href = "rule.html"; // ✅ 跳转页面
});

anims.map(clickTog);

  