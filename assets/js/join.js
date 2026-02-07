/**
 * 老婆愛好会 - JOIN ページ制御スクリプト
 */

document.addEventListener('DOMContentLoaded', () => {
    const joinForm = document.getElementById('joinForm');
    const videoOverlay = document.getElementById('video-overlay');
    const joinVideo = document.getElementById('joinVideo');

    // フォーム送信時のイベント
    if (joinForm) {
        joinForm.addEventListener('submit', (e) => {
            // 1. 通常の送信（ページ遷移）をキャンセル
            e.preventDefault();

            // 2. 動画オーバーレイを表示
            videoOverlay.style.display = 'flex'; // CSSで中央寄せにするためflex推奨
            
            // 3. 動画を再生
            joinVideo.play().catch(error => {
                console.error("動画の再生に失敗しました。ブラウザの制限を確認してください:", error);
                // 失敗した場合は直接完了画面へ（保険）
                showCompletion();
            });
        });
    }

    // 動画が終了した時のイベント
    if (joinVideo) {
        joinVideo.addEventListener('ended', () => {
            showCompletion();
        });
    }

    /**
     * 完了メッセージを表示する関数
     */
    function showCompletion() {
        // フェードアウトなどの演出を加えることも可能
        videoOverlay.innerHTML = `
            <div class="completion-message">
                <h2>入会手続きが完了しました</h2>
                <p>老婆たちの知恵が、あなたと共にありますように。</p>
                <a href="index.html" class="btn-back">TOPへ戻る</a>
            </div>
        `;
    }
});// JavaScript Document