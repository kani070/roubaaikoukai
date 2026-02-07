// テキストと画像の切り替え
const scenes = [
    { text: "寿子「え！？セ、セクシーって…！」", showImg: true,img: "img/bikini_tere.PNG" },
	{ text: "寿子「年寄りを揶揄うんじゃないわよ！熟女熟女っていやらしい目で見て！！」", showImg: true,img: "img/bikini_tereikari.PNG" },
	{ text: "「ご、ごめん！褒めたつもりだったんだけど…。」", showImg: true,img: "img/bikini_tereikari.PNG" },
	{ text: "寿子「もう…！こんな年でセクシーなんて言われたら恥ずかしいでしょ！でも、ありがとうね。」", showImg: true,img: "img/bikini_tere.PNG" },
	{ text: "寿子「さ！プールに入りましょ！」", showImg: true,img: "img/bikini1.PNG" },
	{ text: "…", showImg: false },
	{ text: "寿子「プールの中をゆっくり歩くと、足にいいのよ。運動しながらリラックスできるし。」", showImg: true,img: "img/bikini1.PNG" },
	 { text: "「なるほど、健康にも気を使ってるんだね。やっぱり、寿子は何でも知ってるんだな。」", showImg: true,img: "img/bikini1.PNG" },
	{ text: "「僕も一緒に歩いてみようかな…あれ、意外と歩くのが難しい。」", showImg: true,img: "img/bikini1.PNG", sound: "audio/waterwalk.mp3" },
	{ text: "寿子「ふふ、そうでしょ？水の抵抗って案外強いのよ。だからそう焦っちゃダメっ。」", showImg: true,img: "img/bikini1.PNG" },
	{ text: "ツルッ", showImg: true,img: "img/bikini1.PNG" },
	{ text: "「おっと…！あ、危なかった…！」", showImg: true,img: "img/bikini1.PNG" },
	{ text: "寿子「ほら、言ったでしょ？無理をしないでね。」", showImg: true,img: "img/bikini1.PNG" },
	{ text: "…", showImg: false },
	{ text: "「歩くだけでも、思ったより運動になるんだね。なんだか、体がすっきりした感じがするよ。」", showImg: false },
	{ text: "寿子「そうでしょう？今度また一緒に来ましょうね、ゆっくり歩くのも悪くないでしょう？」", showImg: true,img: "img/bikini1.PNG" },
	
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');
const background = document.getElementById('background');

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
		
   // サウンドを再生
                if (scenes[currentScene].sound) {
                    const audio = new Audio(scenes[currentScene].sound);
                    audio.play().catch(e => console.log("音声の再生に失敗しました: ", e));
                }
    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "park_continued.html";  // 移動先のページを指定
    }
});