// 1. ダミーデータの作成（ここを増やすとスクロールします）
const allRecords = [
    { date: "2025/10/26 14:30", char: "toshiko", name: "急須", count: 12, status: "clear" },
    { date: "2025/10/25 10:00", char: "keiko", name: "猫", count: 10, status: "fail" },
    { date: "2025/10/25 14:30", char: "yoshie", name: "仁丹", count: 6, status: "clear" },
    { date: "2025/10/24 20:15", char: "toshiko", name: "おはぎ", count: 8, status: "clear" },
    { date: "2025/10/24 18:00", char: "yoshie", name: "入れ歯", count: 10, status: "fail" },
    { date: "2025/10/23 12:00", char: "keiko", name: "孫", count: 5, status: "clear" },
    { date: "2025/10/22 09:00", char: "toshiko", name: "眼鏡", count: 10, status: "fail" },
    { date: "2025/10/21 15:45", char: "yoshie", name: "湿布", count: 3, status: "clear" },
];

// 2. 画面表示の更新関数
function renderRecords(filter = 'all') {
    const listElement = document.getElementById('record-list');
    listElement.innerHTML = ""; // 一旦空にする

    const filtered = allRecords.filter(r => {
        if (filter === 'all') return true;
        return r.status === filter;
    });

    filtered.forEach(data => {
        const card = document.createElement('div');
        card.className = 'record-card';
        
        const statusText = data.status === 'clear' ? 'クリア！' : '失敗...';
        const statusClass = data.status === 'clear' ? 'status-clear' : 'status-fail';

        card.innerHTML = `
            <div class="char-icon">
                <img src="img/${data.char}.png" alt="キャラ">
            </div>
            <div class="card-content">
                <div class="card-top">
                    <span class="date">${data.date}</span>
                    <span class="${statusClass}">${statusText}</span>
                </div>
                <div class="target-name">${data.name}</div>
                <div class="stats">質問：${data.count}回</div>
            </div>
        `;
        listElement.appendChild(card);
    });
}

// 3. タブ切り替え関数
function changeTab(type) {
    playSE();
    // ボタンの見た目変更
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (type === 'all') document.getElementById('tab-all').classList.add('active');
    if (type === 'clear') document.getElementById('tab-clear').classList.add('active');
    if (type === 'fail') document.getElementById('tab-fail').classList.add('active');

    // 表示内容の更新
    renderRecords(type);
}

// 4. 音声・初期化
function playSE() {
    const se = document.getElementById('se-select');
    if (se) {
        se.currentTime = 0;
        se.play().catch(e => {});
    }
}

window.onload = () => {
    renderRecords('all');
    // BGMの再生（ユーザーがどこかをクリックした時に開始）
    window.addEventListener('click', () => {
        const bgm = document.getElementById('bgm-record');
        if (bgm && bgm.paused) {
            bgm.volume = 0.3;
            bgm.play().catch(e => {});
        }
    }, { once: true });
};