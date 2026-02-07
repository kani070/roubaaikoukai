function playSE() {
    const se = document.getElementById('se-select');
    if (se) {
        se.currentTime = 0;
        se.play().catch(e => {});
    }
}

// BGMの再生設定
window.onload = () => {
    window.addEventListener('click', () => {
        const bgm = document.getElementById('bgm-setting');
        if (bgm && bgm.paused) {
            bgm.volume = 0.3;
            bgm.play().catch(e => {});
        }
    }, { once: true });
};

// ボタンの切り替え（ハリボテ用）
document.querySelectorAll('.speed-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});