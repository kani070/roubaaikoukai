// テキストと画像の切り替え
const scenes = [
    { text: "〜日曜日〜" },
    { text: "ついにデート当日だ。" },
    { text: "場所は…" },
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const gameContainer = document.getElementById('game-container');
const background = document.getElementById('background');
const overlay = document.getElementById('fade-overlay');

// ページロード時にフェードイン
window.addEventListener('load', function() {
    setTimeout(() => {
        overlay.classList.add('hidden');  // フェードアウト効果を適用
    }, 100); // 0.1秒後にフェードアウト開始
});

// 初期の背景を表示
background.style.display = 'block';

// 最初のシーンを表示
textContent.textContent = scenes[currentScene].text;

// ゲーム画面をクリックで次へ進む
gameContainer.addEventListener('click', () => {
    currentScene++;
    
    if (currentScene < scenes.length) {
        // テキストを更新
        textContent.textContent = scenes[currentScene].text;
    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "part4_select.html";  // 移動先のページを指定
    }
});