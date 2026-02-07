document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.char-card');
    const decideBtn = document.getElementById('btn-decide');
    const backBtn = document.getElementById('btn-back');
    const bgm = document.getElementById('bgm');
    const seSelect = document.getElementById('se-select');
    const seDecide = document.getElementById('se-decide');
    const seBack = document.getElementById('se-back');
    
    let selectedCharacter = null;
    let isBgmStarted = false;

    // BGM開始処理（以前の回答と同じ）
    document.addEventListener('click', () => {
        if (!isBgmStarted) {
            bgm.volume = 0.5;
            bgm.play().catch(e => console.log("BGM再生失敗:", e));
            isBgmStarted = true;
        }
    }, { once: true });

    // カード選択（以前の回答と同じ）
    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedCharacter = card.dataset.char; // ここに "toshiko", "keiko", "yoshie" が入る

            seSelect.currentTime = 0;
            seSelect.play();
        });
    });

    // --- 決定ボタン：キャラクターに応じたHTMLへ移動 ---
    decideBtn.addEventListener('click', () => {
        if (selectedCharacter) {
            seDecide.play();
            
            // 音が鳴り終わるのを少し待ってから遷移（0.5秒）
            setTimeout(() => {
                // キャラクター名.html へ移動
                window.location.href = `${selectedCharacter}.html`;
            }, 500);
        } else {
            alert("誰と話すか選んでください。");
        }
    });

    // --- もどるボタン：index.htmlへ移動 ---
    backBtn.addEventListener('click', () => {
        seBack.play();
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    });
});