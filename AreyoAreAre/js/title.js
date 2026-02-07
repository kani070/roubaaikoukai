const bgm = document.getElementById("bgm");
const se = document.getElementById("se");

/* 初回操作でBGM */
document.addEventListener("pointerdown", () => {
  bgm.volume = 0.4;
  bgm.play();
}, { once: true });

/* 全ボタン共通SE（はじめる・プロフィール・設定・記録） */
document.querySelectorAll(".img-btn, .icon-btn").forEach(btn => {
  btn.addEventListener("pointerdown", () => {
    se.currentTime = 0;
    se.play();
  });
});