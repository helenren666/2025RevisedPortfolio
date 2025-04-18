

// glitch animation toggle + page jump
let anims = [...document.querySelectorAll("[anim]")];
let click = (el, cb) => el.addEventListener("click", cb);
let toggle = (el) => el.classList.toggle("toggled");
let clickTog = (el) => click(el, () => {
  toggle(el);
  window.location.href = "question1.html";
});
anims.map(clickTog);