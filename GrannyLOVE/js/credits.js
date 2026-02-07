const credits = document.getElementById('credits');
const bgm = document.getElementById('bgm');
bgm.loop = false; // ループを無効にする
// アニメーション終了後の処理
credits.addEventListener('animationend', () => {
    window.location.href = "index.html"; // 遷移先のページを指定
});