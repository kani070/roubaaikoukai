const scenes = [
   { text: "変身し、怪物を倒した後 寿子さんは、", showImg: false },
   { text: "「正体がバレてしまった以上、もうここにはいられないわ。さようなら。」", showImg: false },
   { text: "そう告げて去っていった。", showImg: false },
   { text: "ー彼女の正体は……ー", showImg: false },
   { text: " ", showImg: true, img: "img/koshiend.PNG" },
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
            seifukuImage.src = scenes[currentScene].img;
			seifukuImage.style.display = 'block';
        } else {
            seifukuImage.style.display = 'none';
        }
    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "index.html";  // 移動先のページを指定
    }
});