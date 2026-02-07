// テキストと画像の切り替え
const scenes = [
	{ text: "〜数日後〜", showImg: false, backgroundChange: false, playSound: "audio/nichijou.mp3" },
    { text: "今週末は寿子の誕生日だ。", showImg: false, backgroundChange: false },
	{ text: "プレゼントを買いに行こう。", showImg: false, backgroundChange: false },
	{ text: "何を用意したら喜んでくれるかな…", showImg: false, backgroundChange: false },
	{ text: "そうだ！先生に相談しよう！", showImg: false, backgroundChange: false },
	{ text: "…", showImg: false, backgroundChange: false },
	{ text: "「先生、祖母井さんへのプレゼントで悩んでいて…プレゼント選びに付き合っていただけますか？」", showImg: false, backgroundChange: false },
	{ text: "おばちゃん先生「あらいいわよ。」", showImg: false, backgroundChange: false },
	{ text: "「ありがとうございます！」", showImg: false, backgroundChange: false },
	{ text: "〜デパート〜", showImg: false, backgroundChange: true, playSound: "audio/Kanjiru_Happiness.mp3" },
	{ text: "おばちゃん先生「そうねぇ…おばあちゃんとは言え、やっぱり女性はおしゃれなものが好きよ。たとえばこれなんか…」", showImg: false, backgroundChange: true },
	{ text: "あれ？あそこにいるのって……", showImg: false, backgroundChange: true },
	{ text: "…", showImg: false, backgroundChange: true },
	{ text: "「先生、今日は本当にありがとうございました。これで寿子に喜んでもらえると思います！」", showImg: false, backgroundChange: true },
	{ text: "先生「どういたしまして。寿子さんもきっと嬉しがるわよ。頑張ってね。」", showImg: false, backgroundChange: true },
	{ text: "週末が楽しみだ。", showImg: false, backgroundChange: true },
	{ text: "……", showImg: false, backgroundChange: true },
	{ text: "そこにいるのは…寿子！？", showImg: true, img: "img/shifuku_fukigen.PNG", backgroundChange: true, playSound: "audio/Heartache.mp3" },
	{ text: "寿子「先生と一緒にいるところ、見てたわよ！！」", showImg: true, img: "img/shifuku_fukigen.PNG", backgroundChange: true },
	{ text: "寿子「やっぱりアタシみたいなおばあちゃんより、若い子がいいのね！！」", showImg: true, img: "img/shifuku_ikari.PNG", backgroundChange: true },
	{ text: "「若い子って言ったって先生60だぞ！？」", showImg: true, img: "img/shifuku_ikari.PNG", backgroundChange: true },
	{ text: "寿子「アタシから見たら若いわよ！」", showImg: true, img: "img/shifuku_ikari.PNG", backgroundChange: true },
	{ text: "寿子「アタシより先生が好きなんでしょ?」", showImg: true, img: "img/shifuku_ikari.PNG", backgroundChange: true },
	{ text: "「誤解だって！」", showImg: true, img: "img/shifuku_ikari.PNG", backgroundChange: true },
	{ text: "寿子「もう知らない！」", showImg: true, img: "img/shifuku_ikari.PNG", backgroundChange: true },
	{ text: "「寿子、待ってよ…！」", showImg: false, backgroundChange: true },
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
		
 // 背景を切り替え
        if (scenes[currentScene].backgroundChange) {
            background.style.display = 'none';   // 最初の背景を非表示
            background2.style.display = 'block'; // 新しい背景を表示
        } else {
            background.style.display = 'block';   // 最初の背景を表示
            background2.style.display = 'none';   // 新しい背景を非表示
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
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "true.html";  // 移動先のページを指定
    }
});