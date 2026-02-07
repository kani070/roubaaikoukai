// テキストと画像の切り替え
const scenes = [
    { text: "落ちていたものを拾う。", showImg: false },
	{ text: "寿子「あっ！それ！」", showImg: true },
    { text: "「もしかして寿子さんの？」", showImg: true },
    { text: "拾ったものを彼女に手渡す。", showImg: true },
	{ text: "寿子「拾ってくれてありがとう、助かったわ！」", showImg: true },
	{ text: "寿子「何かお礼がしたいんだけど、放課後一緒にカフェでもどう？」", showImg: true },
	{ text: "寿子「それじゃ、またあとでね！」", showImg: true },
	{ text: "落とし物なんて、寿子さんって意外とドジなんだな。でも、それも可愛いかも。",showImg: false },
	 { text:"お礼に放課後お茶のお誘いなんて、まさかデート!?…ちょっと緊張してきたな。", showImg: false },
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');

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
        window.location.href = "part3.html";  // 移動先のページを指定
    }
});