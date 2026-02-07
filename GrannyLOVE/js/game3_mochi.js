const scenes = [
	{ text: "「お、餅がある…カフェなのに珍しいな。」", showImg: true, img: "img/seifuku1.PNG",  playSound: "audio/cafe.mp3" },
    { text: "寿子「えっ、餅？」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "ウェイターが餅を運んできた。", showImg: true, img: "img/mochi.PNG" },  // 餅表示
    { text: "「美味しそうだ。ちょっと意外だけど、こういうのもたまにはいいよな。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「まさかデートで餅を食べるなんて…。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "「これ、思ったより美味しいな。モチモチ。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「本当に…でも、少し大きいかも…」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「う゛ッッッ！！！！！」", showImg: true, img: "img/shizou_seifuku.PNG", playSound: "audio/panic.mp3" },
    { text: "「寿子さん、大丈夫か！？まさか餅が喉に…！」", showImg: true, img: "img/seifuku_aozame.PNG" },
    { text: "寿子「…あ、危なかったわ…。もう少しで危ないところだった。」", showImg: true, img: "img/seifuku_fukigen.PNG" },
    { text: "寿子「本当に驚いたわ。でも、お餅は美味しいからやめられないのよね。」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "「びっくりした…。でも、無事で良かったよ。」", showImg: true, img: "img/seifuku1.PNG", playSound: "audio/cafe.mp3" },
    { text: "「寿子さん、あの…もしよかったら、今週の日曜、一緒にどこかへ出かけませんか？」", showImg: true, img: "img/seifuku1.PNG" },
    { text: "寿子「まあ、デートの誘いかしら？こんなおばあさんでいいの？」", showImg: true, img: "img/seifuku_tere.PNG" },
    { text: "「そんなことないですよ。寿子さんといると楽しいし、もっといろんな場所に一緒に行きたいんです。」", showImg: true, img: "img/seifuku_tere.PNG" },
    { text: "寿子「まあ、嬉しいわ。じゃあ、次はどこに行きましょうか？どこでも付き合うわよ。」", showImg: true, img: "img/seifuku1.PNG" },
];

let currentScene = 0;
let currentBGM = null; // BGMの管理用変数

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const mochiImage = document.getElementById('mochi');
const gameContainer = document.getElementById('game-container');

// 最初のシーンを表示
textContent.textContent = scenes[currentScene].text;
seifukuImage.src = scenes[currentScene].img;
seifukuImage.style.display = 'block';  // 初期は寿子の画像を表示
mochiImage.style.display = 'none';      // 餅の画像は初期は非表示

// ゲーム画面をクリックで次へ進む
gameContainer.addEventListener('click', () => {
    // 最初のクリックで音声を再生
    if (currentScene === 0 && scenes[currentScene].playSound) {
        currentBGM = new Audio(scenes[currentScene].playSound); // 新しいBGMを作成
        currentBGM.play().catch(function(e) {
            console.log("音声の再生に失敗しました: ", e);
        });
    }

    currentScene++;

    if (currentScene < scenes.length) {
        // テキストを更新
        textContent.textContent = scenes[currentScene].text;

        // 画像の表示/非表示を切り替え
        if (scenes[currentScene].showImg) {
            seifukuImage.src = scenes[currentScene].img;
            seifukuImage.style.display = 'block';

            // 餅のシーンなら餅の画像を表示
            if (scenes[currentScene].img === "img/mochi.PNG") {
                mochiImage.style.display = 'block';
            } else {
                mochiImage.style.display = 'none';  // 餅を隠す
            }
        } else {
            seifukuImage.style.display = 'none';
            mochiImage.style.display = 'none';
        }

        // BGMを切り替え
        if (scenes[currentScene].playSound) {
            if (currentBGM) {
                currentBGM.pause(); // 現在のBGMを停止
            }
            currentBGM = new Audio(scenes[currentScene].playSound); // 新しいBGMを作成
            currentBGM.loop = true; // ループ設定（必要に応じて）
            currentBGM.play().catch(function(e) {
                console.log("音声の再生に失敗しました: ", e);
            });
        }
    } else {
        // すべてのシーンが終了した場合、BGMを停止して次のページに遷移
        if (currentBGM) {
            currentBGM.pause(); // BGMを停止
        }
        window.location.href = "part4.html";  // 移動先のページを指定
    }
});