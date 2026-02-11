// --- 設定・状態管理 ---
let isBgmPlaying = false;
let currentTurn = 0;
let remaining = 20;
let typingTimer = null;

// ポップアップを表示する
function showSharePopup() {
    document.getElementById('final-remaining').innerText = remaining;
    const modal = document.getElementById('share-modal');
    modal.style.display = 'flex';
}

// タイトルへ戻る
function goToTitle() {
    location.href = "index.html"; 
}

// 𝕏(Twitter)共有用
function shareOnX() {
    const text = encodeURIComponent(`寿子さんの思い出「急須」を、のこり${remaining}回で見つけ出したわ！\n#寿子の思い出 #あれよあれあれ`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// --- エンディング演出（成功・失敗の分岐） ---
function runEndingSequence(isCorrect) {
    const textElement = document.getElementById('toshiko-text');
    
    if (isCorrect) {
        // 【成功ルート】
        playSE('se-correct');
        typeWriter("それよそれそれ！急須だったわ！ありがとうねぇ。助かったわよ。", 'toshiko-text');
        // 2秒待ってからポップアップを表示
        setTimeout(showSharePopup, 2000);
    } else {
        // 【失敗・ゲームオーバールート】
        typeWriter("あら……もうこんな時間？ 結局、思い出せなかったわ……。", 'toshiko-text');
        
        setTimeout(() => {
            // 孫のツッコミ（CSSでplayer-textの色が変わる想定）
            textElement.className = "player-text"; 
            typeWriter("おばあちゃん、しっかりしてよ！ もう20回も聞いたのに！", 'toshiko-text');
            
            setTimeout(() => {
                textElement.className = ""; // 元に戻す
                typeWriter("ごめんねぇ。また明日、付き合ってくれるかしら……？", 'toshiko-text');
                
                // 4秒後にタイトルへ戻る
                setTimeout(() => {
                    location.href = "index.html"; 
                }, 4000);
            }, 4000);
        }, 4000);
    }
}

// --- 回答フェーズ（わかった！ボタン） ---
function startAnswerPhase() {
    playSE('se-select');
    typeWriter("なんだったか分かったかしら？", 'toshiko-text');
    updateButtons(answers);
    
    const btns = document.querySelectorAll('.q-btn');
    btns.forEach((btn, i) => {
        btn.onclick = () => {
            if (answers[i] === "急須") {
                runEndingSequence(true); // 正解！
            } else {
                playSE('se-cancel');
                // 不正解の場合は回数を大幅に減らすペナルティ
                remaining -= 5;
                if (remaining < 0) remaining = 0;
                document.getElementById('remaining-count').innerText = remaining;

                if (remaining <= 0) {
                    typeWriter("うーん、それは違う気がするわねぇ……", 'toshiko-text');
                    setTimeout(() => { runEndingSequence(false); }, 1500);
                } else {
                    typeWriter("うーん、それは違う気がするわねぇ……（のこり回数が減ったわ）", 'toshiko-text');
                }
            }
        };
    });
}

const scenario = [
    { q: ["食べ物？", "生き物？", "形のある物？", "思い出？"], a: ["食べ物じゃないわねぇ", "生き物ではないわよ", "ええ、ちゃんと形はあるわねぇ", "思い出というより物ねぇ"] },
    { q: ["家で使う？", "外で使う？", "身につける？", "紙製？"], a: ["そうそう、おうちの中で使うものよ", "外ではあまり見ないわねぇ", "身につけるものじゃないわよ", "紙ではないわねぇ"] },
    { q: ["台所にある？", "居間にある？", "押し入れ？", "持ち歩く？"], a: ["台所にあるわね。毎日じゃないけど", "居間にも持っていくわねぇ", "押し入れには入れないわ", "外には持っていかないわね"] },
    { q: ["電気使う？", "火を使う？", "保存用？", "飲み物関連？"], a: ["電気は使わないわ", "火も直接は使わないわね", "保存用じゃないわ", "ええ、お茶に関係してるわ"] },
    { q: ["直接飲む？", "お茶を入れる？", "茶葉？", "コップ？"], a: ["直接は飲まないわよ", "そうそう、お茶を入れるためのものよ。ほら、あれ", "葉っぱじゃないわよ", "コップではないわねぇ"] },
    { q: ["陶器？", "ガラス？", "金属？", "木製？"], a: ["たいていは陶器ねぇ。割ったこともあるわ…", "ガラス製もたまにあるけどねぇ", "金属ではないわね", "木ではないわよ、熱いもの入れるし"] },
    { q: ["取っ手？", "蓋？", "注ぎ口？", "全部ある？"], a: ["取っ手はあるわね", "蓋もついてるわよ", "注ぎ口もあるわ", "そうよそうよ、全部あるわ。ほら、傾けると注げるでしょう？"] },
    { q: ["大きいもの？", "片手サイズ？", "重たい？", "四角い？"], a: ["そんなに大きくないわよ", "ええ、片手で持てるわね", "中身が入ってなければ軽いわよ", "丸っこい形をしてるわねぇ"] },
    { q: ["色は赤？", "色は緑？", "地味な色？", "柄がある？"], a: ["赤ではないわねぇ", "緑色の茶葉は入れるけどねぇ", "茶色とか、落ち着いた色が多いわね", "この家のは、ちょっとしたお花柄があったかしら"] },
    { q: ["朝使う？", "昼使う？", "夜使う？", "お客さん用？"], a: ["朝ごはんの時も使うわね", "お昼にお煎餅と一緒にねぇ", "夜は寝る前に少しだけ", "そうね、お客さんが来たら必ず出すわね"] },
    { q: ["中身は熱い？", "中身は冷たい？", "氷入れる？", "甘いもの？"], a: ["ええ、熱いお湯を注ぐわよ", "冷たいのはあまり入れないわねぇ", "氷は入れないわよ、割れちゃうもの", "お砂糖は入れないわねぇ"] },
    { q: ["中に網がある？", "中に棒がある？", "中に石がある？", "空っぽ？"], a: ["そうそう、茶葉をこす網が入ってるわ", "棒なんて入ってたかしら…？", "石なんて入れたら大変よ", "使う前は空っぽねぇ"] },
    { q: ["洗剤で洗う？", "水洗い？", "食洗機？", "拭くだけ？"], a: ["ええ、洗剤で綺麗にするわよ", "水だけじゃ茶渋がついちゃうからねぇ", "食洗機は怖くて入れられないわ", "ちゃんと洗ってから拭くわよ"] },
    { q: ["お湯を入れる？", "水を入れる？", "お酒を入れる？", "油を入れる？"], a: ["そうそう、沸騰したお湯を注ぐのよ", "お水じゃお茶が出ないわねぇ", "お酒は別の徳利ねぇ", "油を入れたらギトギトになっちゃうわ"] },
    { q: ["毎日使う？", "たまに使う？", "お正月だけ？", "最近使った？"], a: ["昔は毎日使ってたわねぇ", "最近はペットボトルがあるから、たまにかしら", "お正月はもっと良いやつを出すわよ", "昨日、あなたと飲もうと思ったんだけどねぇ……"] },
    { q: ["名前は三文字？", "名前は二文字？", "カタカナ？", "漢字？"], a: ["ええと……ひらがなだと……四文字ね！", "漢字で書くとそうねぇ", "カタカナじゃないわよ、古くからあるもの", "漢字だと二文字ねぇ"] },
    { q: ["ペアで使う？", "湯呑みと一緒に？", "お皿と一緒に？", "お箸と一緒に？"], a: ["ペア……ではないわねぇ", "そう！湯呑みにお茶を注ぐのよ！", "お皿は、お茶請けの羊羹を乗せるのに使うわね", "お箸は使わないわねぇ"] },
    { q: ["カチカチ？", "フカフカ？", "ツルツル？", "ザラザラ？"], a: ["叩くと高い音がするわよ", "柔らかくないわ、陶器だもの", "表面はツルツルしてるわねぇ", "底の方は少しザラザラしてるかしら"] },
    { q: ["お茶っ葉？", "ティーバッグ？", "粉末？", "コーヒー？"], a: ["そうよ、お茶っ葉をたっぷり入れるの", "最近はティーバッグを中に入れることもあるわね", "粉末ならこれはいらないわねぇ", "コーヒーは、ほら、あのポタポタ落とすやつね"] },
    { q: ["もうわかった？", "まだ思い出せない？", "答えを教えて？", "最初から聞く？"], a: ["ほら、もう目の前にある気がするわよ", "ゆっくりでいいわよ、私もゆっくり思い出すから", "答えはあなたの口から聞きたいわねぇ", "何度でも付き合うわよ、優しい子ねぇ"] }
];

const answers = ["マグカップ", "急須", "やかん", "水筒"];

// --- 質問ボタンを押した時の処理 ---
function makeChoice(idx) {
    if (remaining <= 0) return;
    
    playSE('se-select');
    
    // セリフの決定
    if (currentTurn < scenario.length) {
        // 通常の質問進行
        const message = scenario[currentTurn].a[idx];
        typeWriter(message, 'toshiko-text');
        currentTurn++;
    } else {
        // 問題データがなくなった後のループ台詞
        const fallbacks = [
            "うーん、なんだったかしらねぇ……",
            "あともう少しで思い出せそうなんだけど……",
            "ええと、それはどうだったかしら……",
            "ごめんねぇ、ど忘れしちゃって……"
        ];
        typeWriter(fallbacks[idx % 4], 'toshiko-text');
    }
    
    // 残り回数を減らす
    remaining--;
    document.getElementById('remaining-count').innerText = remaining;
    
    // 0回になったら強制終了
    if (remaining <= 0) {
        setTimeout(() => {
            runEndingSequence(false);
        }, 1500);
        return;
    }
    
    // ボタンの文字更新（1.2秒後）
    setTimeout(() => {
        if (currentTurn < scenario.length) {
            updateButtons(scenario[currentTurn].q);
        } else {
            // 問題がない場合はボタンを無効化っぽくする
            updateButtons(["……", "……", "……", "……"]);
        }
    }, 1200);
}

// --- 共通関数 ---

function playSE(id) {
    const se = document.getElementById(id);
    if (se) {
        se.currentTime = 0;
        se.play().catch(e => {});
    }
}

window.addEventListener('click', () => {
    const bgm = document.getElementById('bgm-main');
    if (!isBgmPlaying && bgm) {
        bgm.volume = 0.3;
        bgm.play().then(() => {
            isBgmPlaying = true;
        }).catch(e => {});
    }
}, { once: true });

function typeWriter(text, elementId) {
    const element = document.getElementById(elementId);
    const textSe = document.getElementById('se-text');
    let i = 0;
    
    if (typingTimer) {
        clearInterval(typingTimer);
        if (textSe) { textSe.pause(); textSe.currentTime = 0; }
    }
    
    element.innerHTML = ""; 

    typingTimer = setInterval(() => {
        if (i >= text.length) {
            clearInterval(typingTimer);
            if (textSe) { textSe.pause(); textSe.currentTime = 0; }
            return;
        }

        const char = text.charAt(i);
        element.innerHTML += char === "\n" ? "<br>" : char;
        
        if (textSe) {
            textSe.currentTime = 0;
            textSe.play().catch(e => {});
        }

        i++;
    }, 70); 
}

function updateButtons(list) {
    const btnSpans = document.querySelectorAll('.q-btn span');
    list.forEach((text, i) => {
        if (btnSpans[i]) btnSpans[i].innerText = text;
    });
}

window.onload = () => {
    updateButtons(scenario[0].q);
};
