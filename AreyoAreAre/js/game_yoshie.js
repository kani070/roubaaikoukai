
let isBgmPlaying = false;
let currentTurn = 0;
let remaining = 10;
let typingTimer = null;
let isAngry = false;

const scenario = [
    { q: ["食べ物？", "薬？", "機械？", "紙？"], a: "薬！それくらい見りゃわかるでしょ！" },
    { q: ["処方箋？", "甘い？", "市販薬？", "注射？"], a: "そうよ！薬局に決まってるでしょ！" },
    { q: ["粉薬？", "錠剤？", "液体？", "貼る薬？"], a: "……まあ、丸いわね" },
    { q: ["白い？", "大きい？", "すごく小さい？", "苦い？"], a: "ちっちゃい！あんな小さいの他にある！？" },
    { q: ["若者用？", "年寄り用？", "流行ってる？", "海外の薬？"], a: "若いのは知らないわよ！昔からあるの！" },
    { q: ["胃薬？", "風邪薬？", "のどの薬？", "痛み止め？"], a: "胃よ、胃！スーッとするやつ！" },
    { q: ["箱入り？", "瓶入り？", "チューブ？", "個包装？"], a: "そう！銀色のやつ！" },
    { q: ["……", "……", "……", "……"], a: "いつまで聞いてんのさ！さっさと答えな！" },
    { q: ["……", "……", "……", "……"], a: "（イライラしてこっちを睨んでいる）" },
    { q: ["……", "……", "……", "……"], a: "……。" }
];

const answers = ["正露丸", "キャベジン", "仁丹", "太田胃散"];

function makeChoice(idx) {
    if (remaining <= 0) return;
    playSE('se-select');
    if (currentTurn === 5) triggerAnger();
    typeWriter(scenario[currentTurn].a, 'toshiko-text');
    remaining--;
    document.getElementById('remaining-count').innerText = remaining;
    currentTurn++;
    if (remaining <= 0) {
        setTimeout(showDeathScreen, 1500);
        return;
    }
    setTimeout(() => {
        if (currentTurn < scenario.length) updateButtons(scenario[currentTurn].q);
    }, 1000);
}

function triggerAnger() {
    isAngry = true;
    const normalBgm = document.getElementById('bgm-normal');
    const angryBgm = document.getElementById('bgm-angry');
    if (normalBgm) normalBgm.pause();
    if (angryBgm) { angryBgm.volume = 0.5; angryBgm.play().catch(e => {}); }
    document.getElementById('anger-overlay').classList.add('is-angry');
}

function startAnswerPhase() {
    playSE('se-select');
    typeWriter("あたしが何を持ってたか、言ってみなさいよ！", 'toshiko-text');
    updateButtons(answers);
    const btns = document.querySelectorAll('.q-btn');
    btns.forEach((btn, i) => {
        btn.onclick = () => {
            if (answers[i] === "仁丹") {
                playSE('se-correct');
                document.getElementById('anger-overlay').classList.remove('is-angry');
                typeWriter("そうよ仁丹！こんなもん間違えるわけないでしょ！", 'toshiko-text');
                setTimeout(() => {
                    typeWriter("あたしが若い頃からあるんだから。\nあんたも覚えときなさい！", 'toshiko-text');
                    setTimeout(showSharePopup, 3000);
                }, 3000);
            } else {
                showDeathScreen();
            }
        };
    });
}

function showDeathScreen() {
    const angryBgm = document.getElementById('bgm-angry');
    if (angryBgm) angryBgm.pause();
    playSE('se-death');
    const screen = document.getElementById('death-screen');
    if (screen) screen.style.display = 'flex';
    setTimeout(() => { location.href = "index.html"; }, 4000);
}

function typeWriter(text, elementId) {
    const element = document.getElementById(elementId);
    const textSe = document.getElementById('se-text');
    let i = 0;
    if (typingTimer) { clearInterval(typingTimer); if (textSe) { textSe.pause(); textSe.currentTime = 0; } }
    element.innerHTML = "";
    typingTimer = setInterval(() => {
        if (i >= text.length) { clearInterval(typingTimer); if (textSe) { textSe.pause(); textSe.currentTime = 0; } return; }
        const char = text.charAt(i);
        element.innerHTML += char === "\n" ? "<br>" : char;
        if (textSe) { textSe.currentTime = 0; textSe.play().catch(e => {}); }
        i++;
    }, 50);
}

function playSE(id) { const se = document.getElementById(id); if (se) { se.currentTime = 0; se.play().catch(e => {}); } }

function updateButtons(list) {
    const btnSpans = document.querySelectorAll('.q-btn span');
    list.forEach((text, i) => { if (btnSpans[i]) btnSpans[i].innerText = text; });
}

function showSharePopup() {
    document.getElementById('final-remaining').innerText = remaining;
    document.getElementById('share-modal').style.display = 'flex';
}

function goToTitle() { location.href = "index.html"; }

function shareOnX() {
    const text = encodeURIComponent(`芳恵さんの「仁丹」を、のこり${remaining}回で突き止めたわ！\n#芳恵の喝 #あれよあれあれ`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

window.addEventListener('click', () => {
    const bgm = document.getElementById('bgm-normal');
    if (!isBgmPlaying && bgm && !isAngry) { bgm.volume = 0.3; bgm.play().then(() => { isBgmPlaying = true; }).catch(e=>{}); }
}, { once: true });

window.onload = () => { updateButtons(scenario[0].q); };
