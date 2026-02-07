const scenes = [
   { text: "落ちていた巾着を拾う。", showImg: false },
   { text: "寿子「そ、それは…!!!」", showImg: true },
   { text: "「えっと、これ寿子さんの巾着…かな？何か大事な物が入ってるみたいだけど、渡しても大丈夫？」", showImg: true },
   { text: "なんだか、様子がおかしい…。寿子さんがこんなに慌てるなんて。", showImg: true },
   { text: "何かを急ぐ様子の彼女に巾着を手渡す。", showImg: true },
   { text: "寿子「ありがとう…」", showImg: true },
   { text: "『グギャォオオン！！』", showImg: true, sound: "audio/monster.mp3" },
   { text: "！？", showImg: true },
   { text: "何か怪物の鳴き声？のような物凄い音が聞こえる。一体外で何が起こっているんだ！？", showImg: true },
   { text: "寿子「はっ！もう時間がないわッ!」", showImg: true },
   { text: "　", showImg: false },
];

let currentScene = 0;

const textContent = document.getElementById('text-content');
const seifukuImage = document.getElementById('seifuku1');
const gameContainer = document.getElementById('game-container');

// 最初のシーンを表示
textContent.textContent = scenes[currentScene].text;
seifukuImage.style.display = scenes[currentScene].showImg ? 'block' : 'none';

// ゲーム画面をクリックで次へ進む
gameContainer.addEventListener('click', () => {
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
		  // サウンドを再生
                if (scenes[currentScene].sound) {
                    const audio = new Audio(scenes[currentScene].sound);
                    audio.play().catch(e => console.log("音声の再生に失敗しました: ", e));
                }
    } else {
        // すべてのシーンが終了した場合、別のページに遷移
        window.location.href = "koshiEND2.html";  // 移動先のページを指定
    }
});