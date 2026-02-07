// テキストと画像の切り替え
const scenes = [
    { text: "〜放課後〜", showImg: false, backgroundChange: false },
    { text: "〜チャイムの音〜", showImg: false, backgroundChange: false },
    { text: "デートが楽しみすぎて午後の授業は頭に入ってこなかったな……。", showImg: false, backgroundChange: false },
    { text: "寿子「待たせちゃったかしら？」", showImg: true, backgroundChange: false },
    { text: "「あ、いや…今来たところだよ！」", showImg: true, backgroundChange: false },
    { text: "寿子「ふふっ、それじゃあ行きましょうか。」", showImg: true, backgroundChange: false },
    { text: "二人で並んで歩く道、夕暮れの光が静かに包む。", showImg: false, backgroundChange: false },
    { text: "喫茶店に足を踏み入れると、ふわりとコーヒーや甘いデザートの香りが漂う。", showImg: false, playSound: "audio/cafe.mp3", backgroundChange: true },
    { text: "寿子「雰囲気が素敵ね。」", showImg: true, backgroundChange: true },
    { text: "店員「ご注文お伺いします。」", showImg: true, backgroundChange: true },
    { text: "何を頼もうか。変わったメニューだな……", showImg: true, backgroundChange: true },
];

let currentScene = 0;
let chimePlayed = false; // チャイムが再生されたかを管理

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
background2.style.display = 'none'; // 背景2は最初非表示

// 最初のシーンを表示
textContent.textContent = scenes[currentScene].text;

// ゲーム画面をクリックで次へ進む
gameContainer.addEventListener('click', () => {
    // チャイムがまだ再生されていない場合、再生
    if (!chimePlayed) {
        const audio = new Audio('audio/chime.mp3');
        audio.play().catch(function (e) {
            console.log("音声の再生に失敗しました: ", e);
        });
        chimePlayed = true; // 一度再生したらフラグを立てる
    }

    currentScene++;

    if (currentScene < scenes.length) {
        // テキストを更新
        textContent.textContent = scenes[currentScene].text;

        // 画像の表示/非表示を切り替え
        seifukuImage.style.display = scenes[currentScene].showImg ? 'block' : 'none';

        // 背景を切り替え
        if (scenes[currentScene].backgroundChange) {
            background.style.display = 'none';
            background2.style.display = 'block';
        } else {
            background.style.display = 'block';
            background2.style.display = 'none';
        }

        // 音声が設定されている場合に再生
        if (scenes[currentScene].playSound) {
            const bgm = new Audio(scenes[currentScene].playSound);
            bgm.play().catch(function (e) {
                console.log("音声の再生に失敗しました: ", e);
            });
        }
    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "part3_select.html"; // 移動先のページを指定
    }
});