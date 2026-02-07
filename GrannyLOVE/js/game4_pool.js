// テキストと画像の切り替え
const scenes = [
    { text: "今日は寿子とプールデート。寿子の水着…", showImg: false, backgroundChange: false, playSound: "audio/date.mp3" },
    { text: "寿子「ごめんなさい、待たせちゃったかしら？少し道に迷っちゃって。」", showImg: true,img: "img/shifuku1.PNG", backgroundChange: false },
	{ text: "「全然大丈夫だよ。会えて嬉しい！」", showImg: true, img: "img/shifuku1.PNG", backgroundChange: false },
    { text: "寿子「駅っていつも人が多いわね。でもあなたがいると安心するわ。」", showImg: true,img: "img/shifuku1.PNG", backgroundChange: false },
    { text: "「それじゃ、行こうか。」", showImg: true,img: "img/shifuku1.PNG",  backgroundChange: false },
	{ text: "到着！", showImg: false,backgroundChange: true, playSound: "audio/summer_enjoy.mp3" },
	{ text: "寿子「どうかしら…」", showImg: true, img: "img/bikini1.PNG",  backgroundChange: true  },	
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
        window.location.href = "pool_select.html";  // 移動先のページを指定
    }
});