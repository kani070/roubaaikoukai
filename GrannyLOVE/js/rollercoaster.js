// テキストと画像の切り替え
const scenes = [
    { text: "寿子「まさか、ジェットコースターなんて言わないわよね？」", showImg: true,img: "img/seifuku1.PNG",  backgroundChange: false, playSound: "audio/amusement.mp3" },
    { text: "「実は…ジェットコースターにも挑戦してみない？寿子なら楽しめると思うよ！」", showImg: true, img: "img/seifuku1.PNG",backgroundChange: false },
    { text: "寿子「本当に？でも、まあせっかくだから挑戦してみましょうか。どうなることやら…。」", showImg: true, img: "img/seifuku_fukigen.PNG", backgroundChange: false },
	{ text: "シートに座り、レバーを下ろすと、緊張感が高まる。", showImg: false,  backgroundChange: false, playSound: "audio/dokidoki.mp3" },
	{ text: "急上昇するコースター。こ、怖い！", showImg: false,  backgroundChange: false },
	{ text: "寿子「キャー！！！」", showImg: false,  backgroundChange: false },
    { text: "ｽﾎﾟｰﾝ‼︎", showImg: false, backgroundChange:true, playSound: "audio/lol.mp3" }, // スチル画像のパスを指定
	{ text: "え！？！？！？！？！？", showImg: false, backgroundChange:true }, 
	 { text: "寿子「あーびっくりしたっ」", showImg: true,img: "img/seifuku1.PNG",  backgroundChange:false }, 
	{ text: "「びっくりした…。落とした入れ歯はすぐに見つかったからよかったけど。(汗)」", showImg:false, backgroundChange:false, sound: "audio/ase.mp3" },
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');
const background = document.getElementById('background');
const background2 = document.getElementById('background2');

// 初期の背景を表示
background.style.display = 'block';

// 最初のシーンを表示
textContent.textContent = scenes[currentScene].text;
seifukuImage.src = scenes[currentScene].img;
seifukuImage.style.display = 'block';  // 初期は寿子の画像を表示

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
		  // サウンドを再生
                if (scenes[currentScene].sound) {
                    const audio = new Audio(scenes[currentScene].sound);
                    audio.play().catch(e => console.log("音声の再生に失敗しました: ", e));
                }
    } else {
        // すべてのシーンが終了した場合、BGMを停止して次のページに遷移
        if (currentBGM) {
            currentBGM.pause(); // BGMを停止
        }
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "amusement_continued.html";  // 移動先のページを指定
    }
});