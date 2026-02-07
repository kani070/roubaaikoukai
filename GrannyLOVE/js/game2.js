// テキストと画像の切り替え
const scenes = [
    { text: "〜廊下〜", showImg: false },
	{ text: "〜チャイムの音〜", showImg: false },
    { text: "次の授業は教室移動だ。", showImg: false },
    { text: "……ん？何か落ちている……", showImg: false },
];

let currentScene = 0;
let chimePlayed = false; // チャイムが再生されたかを管理

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');

// 最初のシーンを表示
textContent.textContent = scenes[currentScene].text;

// ゲーム画面をクリックで次へ進む
gameContainer.addEventListener('click', () => {
    // チャイムがまだ再生されていない場合、再生
    if (!chimePlayed) {
        const audio = new Audio('audio/chime.mp3');
        audio.play().catch(function(e) {
            console.log("音声の再生に失敗しました: ", e);
        });
        chimePlayed = true; // 一度再生したらフラグを立てる
    }
    
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
        window.location.href = "part2_select.html";  // 移動先のページを指定
    }
});