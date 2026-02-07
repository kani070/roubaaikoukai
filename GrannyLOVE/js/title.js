// JavaScript Document
	  function playSoundAndNavigate() {
	    const sound = document.getElementById('start-sound');
	    const bgm = document.getElementById('bgm');
		const whiteOverlay = document.getElementById('white-overlay');

	    // 効果音を最初から再生
	    sound.currentTime = 0;
	    sound.play().then(() => {
	        // BGMを停止
	        bgm.pause();

	        // ホワイトアウト効果を開始（オーバーレイの透明度を徐々に1に）
	        whiteOverlay.style.opacity = 1;

	        // ホワイトアウト後、ページ遷移
	        setTimeout(() => {
	          window.location.href = "part1.html";
	        }, 1000); // 1秒後にページ遷移
	    }).catch(function(error) {
	        console.log('効果音の再生に失敗しました:', error);
	    });
	  }

	  // ページ読み込み時にBGMを再生
	  window.addEventListener('load', function() {
	    const bgm = document.getElementById("bgm");
	    bgm.play().catch(function(error) {
	      console.log('自動再生がブロックされました:', error);
	    });
	  });