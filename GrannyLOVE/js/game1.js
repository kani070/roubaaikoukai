const scenes = [
    { text: "ある年の夏、老婆愛好家な普通の高校生である俺の前に、突然彼女は現れた……", showImg: false },
    { text: "先生「今日は転校生を紹介します。新しく越してきた、祖母井 寿子さんです。」", showImg: false },
    { text: "寿子「初めまして！アタシ祖母井 寿子って言います。趣味はゲートボールです。よろしくね！」", showImg: true },
    { text: "転校生……って、おばあさん!?転任の間違いじゃないのか？", showImg: false },
    { text: "なんて思いつつも、愛好家にはたまらない、好みドストライクな女性の登場に喜びを隠せない俺。", showImg: false },
    { text: "先生「それじゃあ、寿子さんの席はあそこね。」", showImg: false },
    { text: "運良く、空席だった俺の隣に、寿子さんは座ることになった。", showImg: true },
    { text: "寿子「今日からよろしくね！」", showImg: true },
    { text: "これが俺の、夢の学園生活の始まりだった―", showImg: false }
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');
const overlay = document.getElementById('fade-overlay');

// ページロード時にフェードイン
window.addEventListener('load', function() {
    setTimeout(() => {
        overlay.classList.add('hidden');  // フェードアウト効果を適用
    }, 100); // 0.1秒後にフェードアウト開始
});

// 最初のシーンを表示
textContent.textContent = scenes[currentScene].text;

// ゲーム画面をクリックで次へ進む
gameContainer.addEventListener('click', () => {
    currentScene++;

    if (currentScene < scenes.length) {
        // テキストを更新
        textContent.textContent = scenes[currentScene].text;

        // 画像の表示/非表示を切り替え
        if (scenes[currentScene].showImg) {
            seifukuImage.style.display = 'block';
        } else {
            seifukuImage.style.display = 'none';
        }
    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "part2.html";  // 移動先のページを指定
    }
});