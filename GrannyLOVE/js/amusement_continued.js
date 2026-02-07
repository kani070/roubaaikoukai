// テキストと画像の切り替え
const scenes = [
    { text: "「寿子、今日は本当に楽しかったよ。君も楽しんでくれた？」", showImg: true,img: "img/seifuku1.PNG" },
	{ text: "寿子「ええ、若い頃を思い出したわ。でも…さすがに疲れたわね。」", showImg: true,img: "img/seifuku1.PNG" },
	{ text: "「今日一日あっという間に過ぎちゃったな…もっと一緒にいたいくらい。」", showImg: true,img: "img/seifuku1.PNG" },
	{ text: "寿子「ふふ、また会えるじゃない。こんな素敵な日を過ごせるのも、あなたのおかげね。」", showImg: true,img: "img/seifuku1.PNG" },
	{ text: "「もちろん、また一緒に出かけよう。今度はもっと楽しい場所に連れて行くよ。」", showImg: true,img: "img/seifuku1.PNG" },
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');
const background = document.getElementById('background');
const background2 = document.getElementById('background2');
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
seifukuImage.src = scenes[currentScene].img;
seifukuImage.style.display = 'block';  // 初期は寿子の画像を表示

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
        window.location.href = "part5.html";  // 移動先のページを指定
    }
});