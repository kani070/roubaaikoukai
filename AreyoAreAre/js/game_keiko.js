// --- 状態管理 ---
let isBgmPlaying = false;
let currentTurn = 0;
let remaining = 20;
let typingTimer = null;

// --- 恵子の問題データ (20問) ---
const scenario = [
    { q: ["形を持っている？", "人が作ったもの？", "抽象的な概念？", "名前は一般的？"], a: ["いいえ。視覚では捉えられないわ。", "人の思考が生み出したもの、と言えるかしら。", "ええ。思考の中で、きちんと刃を持つものよ。", "…教養、という言葉の範囲内ね。"] },
    { q: ["科学ですか？", "哲学ですか？", "宗教的ですか？", "比喩ですか？"], a: ["科学の基礎を支える考え方ね。", "ええ。でも哲学だけに閉じ込めると見失う。", "起源を辿れば修道士に行き着くけれど。", "ええ。鋭利な比喩よ。"] },
    { q: ["古代の言葉？", "中世に生まれた？", "近代の概念？", "現代は不要？"], a: ["もっと後ね。", "修道院の静けさの中で研がれたわ。", "形を変えて受け継がれたわ。", "いいえ。今こそ必要な考え方よ。"] },
    { q: ["人名が含まれる？", "地名が含まれる？", "数字が含まれる？", "動詞が含まれる？"], a: ["ええ。けれど、使い方のほうが大事よ。", "その人物の出身地、という形ね。", "いいえ。", "いいえ。"] },
    { q: ["法則ですか？", "定理ですか？", "原理ですか？", "教訓ですか？"], a: ["そう呼ばれることもあるけれど。", "証明された真理ではないわ。", "それが一番近いわ。指針ね。", "知恵、と言うべきかしらね。"] },
    { q: ["論理に関係する？", "感情に関係する？", "実験に関係する？", "統計に関係する？"], a: ["ええ。思考の暴走を止める柵よ。", "いいえ。感情を排する時に使うわ。", "実験結果の解釈に必要ね。", "親和性は高いわ。"] },
    { q: ["問題解決に使う？", "議論で使う？", "日常で使う？", "研究で使う？"], a: ["ええ。無駄な枝葉を払うために。", "不毛な仮説を排除するのに役立つわ。", "無意識にはね。名前は出さない。", "設計思想の基礎よ。"] },
    { q: ["単純さが大事？", "複雑さが大事？", "例外が大事？", "多さが大事？"], a: ["……ようやく触れたわね。", "複雑さは怠慢の隠れ蓑よ。", "例外すら飲み込む単純さを求めるの。", "ここでは純度が優先されるわ。"] },
    { q: ["最短経路を選ぶ？", "仮説を減らす？", "情報を最小化？", "結論を急ぐ？"], a: ["結果としてそうなるわね。", "そう。それこそが刃の役割。", "結果としてそう見えるだけよ。", "いいえ。慎重に進むためのもの。"] },
    { q: ["名前に刃物がある？", "道具の名前？", "怖い意味？", "危険な思想？"], a: ["ええ。鋭い名前がついているわ。", "比喩よ。血は流れないけれど。", "切り捨てる、という意味では鋭利ね。", "思考を安全に保つためのものよ。"] },
    { q: ["ガリレオに関係？", "ニュートンに関係？", "オッカムに関係？", "アインシュタイン？"], a: ["彼も意識していたでしょうね。", "近代科学の礎になったわ。", "（小さく頷く）その通りよ。", "相対性理論とも無縁ではないわね。"] },
    { q: ["学問の作法？", "魔法の言葉？", "宗教の教義？", "政治のスローガン？"], a: ["ええ、最も誠実な作法の一つよ。", "いいえ、極めて現実的な道具よ。", "神学の議論を整理するために生まれたわ。", "いいえ。真実のためのものよ。"] },
    { q: ["過学習を防ぐ？", "計算を速くする？", "記憶を助ける？", "嘘を見破る？"], a: ["機械学習の世界でもそう呼ばれるわね。", "思考の速度は上がるかもしれないわ。", "いいえ、整理するためのもの。", "「もっともらしい嘘」を削ぎ落とせるわ。"] },
    { q: ["シンプルイズベスト？", "最小仮説原理？", "経済性の原則？", "ケチの原理？"], a: ["違う。それはただの標語よ。", "学術的にはそう呼ばれるわね。", "経済ではなく、論理の節約よ。", "ふふ、面白い表現ね。でも本質よ。"] },
    { q: ["それは物理的？", "それは精神的？", "それは論理的？", "それは直感的？"], a: ["いいえ。触れることはできないわ。", "姿勢の問題でもあるわね。", "ええ。純粋に論理の刃よ。", "いいえ、訓練が必要なものよ。"] },
    { q: ["ウィリアム？", "トーマス？", "ジョン？", "リチャード？"], a: ["ええ、その男の名前よ。", "別の人ね。", "よくある名だけど違うわ。", "いいえ。"] },
    { q: ["仮説を立てる時？", "結論を出す時？", "嘘をつく時？", "喧嘩をする時？"], a: ["一番の使いどころね。", "その前の整理に使うのよ。", "嘘を暴くのに役立つわ。", "不毛な争いを終わらせられるわ。"] },
    { q: ["それは剃刀？", "それは鋏？", "それは斧？", "それは剣？"], a: ["ええ。比喩としてそう呼ばれる。", "それほど複雑な動きはしないわ。", "もっと繊細なものよ。", "守るためのものではないわ。"] },
    { q: ["不必要な仮定？", "必要な仮説？", "十分な証拠？", "完璧な真理？"], a: ["それを削ぎ落とすのが目的よ。", "最小限に留めるのがルール。", "証拠以前の、前提の話よ。", "真理へ近づくための杖ね。"] },
    { q: ["正解はこれ？", "わからない", "ヒントをちょうだい？", "もう一度最初から？"], a: ["自信があるなら、「わかった！」を選びなさい。", "焦らなくていいわ。時間はたっぷりある。", "既にたくさんの刃を渡したはずよ。", "（静かに見つめている）"] }
];

const answers = ["ハンロンの剃刀", "オッカムの剃刀", "モーリッツの法則", "ニュートンの法則"];

// --- 演出シーケンス：答え合わせとツッコミ ---
function runEndingSequence(isCorrect) {
    const textElement = document.getElementById('toshiko-text');
    
    if (isCorrect) {
        // 【正解演出】
        typeWriter("ええ、正解よ。「オッカムの剃刀」。\nある事柄を説明するのに、必要以上に多くを仮定すべきでないという指針ね。", 'toshiko-text');
        
        setTimeout(() => {
            textElement.className = "player-text"; 
            typeWriter("いやわかるかい！ってか、おばあちゃん、それだけはハッキリ覚えてるじゃん……", 'toshiko-text');
            
            setTimeout(() => {
                textElement.className = ""; 
                typeWriter("“最も単純な説明を採用せよ”。\n名前は忘れても、刃の感触は残るのよ。", 'toshiko-text');
                setTimeout(showSharePopup, 3000); 
            }, 4000);
        }, 5000);

    } else {
        // 【失敗演出】
        typeWriter("ここまでね。答えは「オッカムの剃刀」よ。", 'toshiko-text');
        setTimeout(() => {
            textElement.className = "player-text";
            typeWriter("えっ、あ、教えてくれるんだ……。ってかそんなムズい名前、ヒント無しじゃ絶対無理だって！", 'toshiko-text');
            setTimeout(() => {
                textElement.className = "";
                typeWriter("仮説の立て方が甘かったわね。また出直しなさい。", 'toshiko-text');
                setTimeout(() => { location.href = "index.html"; }, 3000);
            }, 4000);
        }, 4000);
    }
}

// 質問ボタン
function makeChoice(idx) {
    if (remaining <= 0 || currentTurn >= scenario.length) return;
    playSE('se-select');
    typeWriter(scenario[currentTurn].a[idx], 'toshiko-text');
    remaining--;
    document.getElementById('remaining-count').innerText = remaining;
    currentTurn++;

    if (remaining <= 0) {
        setTimeout(() => { runEndingSequence(false); }, 1500);
    } else {
        setTimeout(() => {
            if (currentTurn < scenario.length) updateButtons(scenario[currentTurn].q);
        }, 1200);
    }
}

// わかった！ボタン
function startAnswerPhase() {
    playSE('se-select');
    typeWriter("なんだったか分かったかしら？", 'toshiko-text');
    updateButtons(answers);
    
    const btns = document.querySelectorAll('.q-btn');
    btns.forEach((btn, i) => {
        btn.onclick = () => {
            if (answers[i] === "オッカムの剃刀") {
                playSE('se-correct');
                runEndingSequence(true); 
            } else {
                playSE('se-cancel');
                typeWriter("それは余計な仮説ね。もう一度考えなさい。", 'toshiko-text');
            }
        };
    });
}

// システム関数
function typeWriter(text, elementId) {
    const element = document.getElementById(elementId);
    const textSe = document.getElementById('se-text');
    let i = 0;
    if (typingTimer) clearInterval(typingTimer);
    element.innerHTML = ""; 
    typingTimer = setInterval(() => {
        if (i >= text.length) {
            clearInterval(typingTimer);
            if (textSe) { textSe.pause(); textSe.currentTime = 0; }
            return;
        }
        const char = text.charAt(i);
        element.innerHTML += char === "\n" ? "<br>" : char;
        if (textSe) { textSe.currentTime = 0; textSe.play().catch(e => {}); }
        i++;
    }, 70); 
}

function updateButtons(list) {
    const btnSpans = document.querySelectorAll('.q-btn span');
    list.forEach((text, i) => { if (btnSpans[i]) btnSpans[i].innerText = text; });
}

function showSharePopup() {
    document.getElementById('final-remaining').innerText = remaining;
    document.getElementById('share-modal').style.display = 'flex';
}

function playSE(id) {
    const se = document.getElementById(id);
    if (se) { se.currentTime = 0; se.play().catch(e => {}); }
}

function shareOnX() {
    const text = encodeURIComponent(`恵子の問い「オッカムの剃刀」を、のこり${remaining}回で解き明かしたわ。\n#恵子の思考 #ブラウザゲーム`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
}

function goToTitle() { location.href = "index.html"; }

window.onload = () => { updateButtons(scenario[0].q); };

// クリックでBGM開始
window.addEventListener('click', () => {
    const bgm = document.getElementById('bgm-main');
    if (!isBgmPlaying && bgm) {
        bgm.volume = 0.3;
        bgm.play().then(() => { isBgmPlaying = true; }).catch(e => {});
    }
}, { once: true });