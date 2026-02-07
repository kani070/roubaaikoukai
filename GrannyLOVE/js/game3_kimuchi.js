const scenes = [
    { text: "「キムチ鍋…って結構辛そうだけど、大丈夫かな…？寿子さん、辛いものって平気ですか？」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「あら、気にしてくれてありがとう。でもね、これ私の大好物ですヨォ！キムチ！！」", showImg: true, img: "img/seifuku_tere.PNG" },
	{ text: "「えぇ！？寿子さんキムチ好きなの！？」", showImg: true, img: "img/seifuku_tere.PNG" },
    { text: "店員がキムチ鍋を運んできた。", showImg: true, img: "img/kimuchi.PNG" },  // アップルパイ表示
    { text: "「うわ、すごく辛そうだけど、いい匂いだな…」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「さあ、早く食べましょう！この辛さが癖になるのよ。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "「辛いけど…すごく美味しい！」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「でしょ？辛さと旨味が絶妙なのよ。この歳でも辛いものは全然平気よ！」", showImg: true, img: "img/seifuku1.PNG" },
	{ text: "寿子さんがこんなに辛いものが好きだなんて、意外だったけど楽しいな。", showImg: true, img: "img/seifuku1.PNG" },
	 { text: "「いやー、こんなに美味しいとは思わなかったよ。寿子さんと一緒だったから、より美味しく感じたのかも。」", showImg: true, img: "img/seifuku1.PNG" },
	 { text: "寿子「ふふっ、それは嬉しいわ。あなたと一緒に食べると、どんな料理でも特別に感じるものよ。」", showImg: true, img: "img/seifuku_tere.PNG" },
	  { text: "	「あの…寿子さん、」", showImg: true, img: "img/seifuku_tere.PNG" },
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
const kimuchiImage = document.getElementById('kimuchi');
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
        if (scenes[currentScene].img === "img/kimchi.PNG") {
            kimuchiImage.style.display = 'block';
        } else {
            kimuchiImage.style.display = 'none';
        }

    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "part4.html";  // 移動先のページを指定
    }
});