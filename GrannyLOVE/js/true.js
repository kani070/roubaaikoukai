// テキストと画像の切り替え
const scenes = [
    { text: "寿子との喧嘩を思い出す…", showImg: false, backgroundImg: "img/myroom.PNG",  playSound: "audio/iitaikoto.mp3" },
	{ text: "「誤解を解くために、もう一度ちゃんと話したい…。」", showImg: false, backgroundImg: "img/myroom.PNG" },
	{ text: "プルルルル…", showImg: false, backgroundImg: "img/myroom.PNG", playSound: "audio/phonecall.mp3" },
	{ text: "「こんなときに電話？寿子かな…。」", showImg: false, backgroundImg: "img/myroom.PNG" },
	{ text: "「もしもし…」", showImg: false, backgroundImg: "img/myroom.PNG" },
	{ text: "友人「おい、祖母井が倒れたって！病院に運ばれたんだ！」", showImg: false, backgroundImg: "img/myroom.PNG",  playSound: "audio/serious.mp3" },
	{ text: "「えっ」", showImg: false, backgroundImg: "img/myroom.PNG" },
	{ text: "「すぐに行く！」", showImg: false, backgroundImg: "img/myroom.PNG" },
	{ text: "……", showImg: false, backgroundImg: "img/hashiru.PNG" },
	{ text: "「待っててくれ、寿子！」", showImg: false, backgroundImg: "img/hashiru.PNG" },
	{ text: "〜病院〜", showImg: false, backgroundImg: "img/hospital.PNG" },
	{ text: "「寿子は大丈夫なんですか！」", showImg: false, backgroundImg: "img/hospital.PNG" },
	{ text: "医者「彼女は心臓発作を起こしましたが、命に別状はありません。今は安静にしています。」", showImg: false, backgroundImg: "img/hospital.PNG" },
	{ text: "病室に入ると、彼女は顔色は少し悪いが、意識ははっきりしていた。",  showImg: false, backgroundImg: "img/byoushitsu.PNG",  playSound: "audio/nakanaori.mp3" },
	{ text: "寿子「来てくれたのね。」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "「無事でいてくれてよかった…。」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "「本当によかった…」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "「先生のことは誤解なんだ。」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "「寿子への誕生日プレゼントを選ぶために、相談にのってもらってただけなんだよ。」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "寿子「…！」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "寿子「ごめんなさい！アタシ……あなたは本当は先生のことが好きなんだって勘違いして、勝手にヤキモチ妬いて、辛く当たってしまった…。」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "「大丈夫だよ。誤解は解けたんだから。寿子を心から大切に思ってる。」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "覚悟を決め、彼女に思いを伝える。", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "「寿子、俺は…ずっと前から寿子が好きだった。これからもずっと一緒にいたい。」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG",  playSound: "audio/kokuhaku.mp3" },
	{ text: "寿子「…！でも、アタシは見ての通りこの先長くないわ。それでもいいの…？」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "「それでも好きだ！寿子がいる限り、ずっと一緒にいたい!」", showImg: true, img: "img/shifuku1.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "寿子「アタシも、あなたのことが大好きよ！あなたがそう言ってくれるなら、長生きして、ずっと一緒にいられるよう頑張る。」", showImg: true, img: "img/shifuku_tere.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "お互いの目を見つめ合い、微笑む。", showImg: true, img: "img/shifuku_tere.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "手を取り合い、誓い合う。", showImg: true, img: "img/shifuku_tere.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: "ー約束！どんな時でも一緒にいるって。ー ", showImg: true, img: "img/shifuku_tere.PNG", backgroundImg: "img/byoushitsu.PNG" },
	{ text: " ", showImg: true, img: "img/trueend.PNG", backgroundImg: "img/byoushitsu.PNG" },
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');
const backgroundImage = document.getElementById('background'); // 背景画像用の要素
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
        } else {
            seifukuImage.style.display = 'none';
        }
		
 // 背景画像の切り替え
        backgroundImage.src = scenes[currentScene].backgroundImg;

         // BGMを切り替え
        if (scenes[currentScene].playSound) {
            if (currentBGM) {
                currentBGM.pause(); // 現在のBGMを停止
            }
            currentBGM = new Audio(scenes[currentScene].playSound); // 新しいBGMを作成
            currentBGM.play().catch(function(e) {
                console.log("音声の再生に失敗しました: ", e);
            });
        }
    } else {
        // すべてのシーンが終了した場合、BGMを停止して次のページに遷移
        if (currentBGM) {
            currentBGM.pause(); // BGMを停止
        }
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "ending.html";  // 移動先のページを指定
    }
});