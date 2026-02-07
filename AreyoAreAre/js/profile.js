const charData = {
    toshiko: {
        // <ruby>タグを使ってフルネームを定義
        fullName: '<ruby>祖母井<rt>うばがい</rt></ruby> <ruby>寿子<rt>としこ</rt></ruby>',
        age: 88,
        personality: "おしゃべり、陽気",
        description: `いつもニコニコしていて、物腰が柔らかい。<br>お茶とお菓子が大好き。`,
        imgSrc: "img/toshiko.png"
    },
    yoshie: {
        fullName: '<ruby>小間<rt>おま</rt></ruby> <ruby>芳恵<rt>よしえ</rt></ruby>',
        age: 85,
        personality: "短気、せっかち",
        description: `外出時は杖を持っているけど、振り回す用。<br>実は情に厚い。`,
        imgSrc: "img/yoshie.png"
    },
    keiko: {
        fullName: '<ruby>清水<rt>しみず</rt></ruby> <ruby>恵子<rt>けいこ</rt></ruby>',
        age: 79,
        personality: "理屈っぽい、しっかり者",
        description: `3人の中では一番年下。元クイズ番組常連の雑学女王。<br>趣味はクロスワード。`,
        imgSrc: "img/keiko.png"
    }
};

function playSE() {
    const se = document.getElementById('se-select');
    if (se) { se.currentTime = 0; se.play().catch(e => {}); }
}

function updateDetail(charKey) {
    const data = charData[charKey];
    if (!data) return;

    const imgElement = document.getElementById('detail-img');
    imgElement.src = data.imgSrc;
    
    // innerHTMLを使ってルビタグを反映させる
    document.getElementById('detail-name').innerHTML = data.fullName;
    document.getElementById('detail-age').textContent = data.age;
    document.getElementById('detail-personality').textContent = data.personality;
    document.getElementById('detail-text').innerHTML = data.description;
}

// 初期設定とクリックイベント
window.onload = () => {
    updateDetail('toshiko'); // 初期表示

    document.querySelectorAll('.char-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            playSE();
            document.querySelectorAll('.char-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            updateDetail(this.getAttribute('data-char'));
        });
    });

    window.addEventListener('click', () => {
        const bgm = document.getElementById('bgm-profile');
        if (bgm && bgm.paused) { bgm.volume = 0.3; bgm.play().catch(e => {}); }
    }, { once: true });
};