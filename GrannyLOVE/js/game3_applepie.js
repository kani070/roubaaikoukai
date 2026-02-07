 const scenes = [
    { text: "主人公：「お、アップルパイがある…これは美味しそうだ。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「いいセンスしてるわね。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "店員がアップルパイを運んできた。", showImg: true, img: "img/applepie.PNG" },  // アップルパイ表示
    { text: "「美味しそうだ。これ、結構大きいね。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「いい香り！早く食べましょ！」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「ああ、このサクサク感と甘さがちょうどいい！」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "「これにして正解だったな。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "「いやー、こんなに美味しいとは思わなかったよ。寿子さんと一緒だったから、より美味しく感じたのかも。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「ふふっ、それは嬉しいわ。あなたと一緒に食べると、どんな料理でも特別に感じるものよ。」", showImg: true, img: "img/seifuku_tere.PNG" },
    { text: "「あの…寿子さん、」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「寿子でいいわよ。」", showImg: true, img: "img/seifuku_tere.PNG" },
	{ text: "「！」", showImg: true, img: "img/seifuku_tere.PNG" },
	{ text: "「寿子、あの…もしよかったら、今週の日曜、一緒にどこかへ出かけませんか？」", showImg: true, img: "img/seifuku_tere.PNG" },
	{ text: "寿子「まあ、デートの誘いかしら？こんなおばあさんでいいの？」", showImg: true, img: "img/seifuku_tere.PNG" },
	{ text: "「そんなことないよ。寿子といると楽しいし、もっといろんな場所に一緒に行きたいんだ。」", showImg: true, img: "img/seifuku_tere.PNG" },
	{ text: "	寿子「まあ、嬉しいわ。じゃあ、次はどこに行きましょうか？どこでも付き合うわよ。」", showImg: true, img: "img/seifuku_tere.PNG" },	
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const applepieImage = document.getElementById('applepie');
const gameContainer = document.getElementById('game-container');

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

        // アップルパイのシーンならアップルパイの画像を表示
        if (scenes[currentScene].img === "img/applepie.PNG") {
            applepieImage.style.display = 'block';
        } else {
            applepieImage.style.display = 'none';
        }

    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "part4.html";  // 移動先のページを指定
    }
});