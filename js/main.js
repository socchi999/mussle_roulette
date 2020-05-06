(function() {
	'use strict';

	let btnYes = document.getElementById('btn-yes');
	let btnNo = document.getElementById('btn-no');
	let mussle = document.getElementById('mussle');
	let pectRight = document.getElementById('p-right');
	let pectLeft = document.getElementById('p-left');
	let btnWatchResult = document.getElementById('btn-watch-result');
	let reset = document.getElementById('reset');
	let resultSentence = document.getElementById('result-sentence');
	let resultMessage = document.getElementById('result-message');

	// flashMussle()にて使用するフラグ
	let pectFlag = true;
	let timer = setInterval(flashMussle, 300);

	function decideMussle() {
		let RLArray = ['やーる！', 'やーらない！'];
		let random = Math.floor(Math.random() * RLArray.length);
		resultMessage.textContent = RLArray[random];

		// ランダムで決めた左右と、腹筋ボタンの色合いを一致させる。'みーぎ'に決まったら、右胸筋が黄色に光る。
		if (RLArray[random] === 'やーる！') {
			pectRight.style.backgroundColor = '#FFFF00';
			pectLeft.style.backgroundColor = '#FFCCCC';
		} else {
			pectLeft.style.backgroundColor = '#FFFF00';
			pectRight.style.backgroundColor = '#FFCCCC';			
		}
		resultMessage.classList.remove('hidden');
		reset.classList.remove('hidden');
	}

	function openResultContents () {
		resultSentence.classList.remove('hidden');
		mussle.classList.remove('hidden');
		btnWatchResult.classList.remove('hidden');
	}

	function flashMussle() {
		if (pectFlag) { 
			pectRight.style.backgroundColor = '#FFFF00';
			pectLeft.style.backgroundColor = '#FFCCCC';
			pectFlag = false;
		} else {
			pectLeft.style.backgroundColor = '#FFFF00';
			pectRight.style.backgroundColor = '#FFCCCC';
			pectFlag = true;
		}
	}

	function changeYNBtnStatus(YNBtnFlag) {
		if (YNBtnFlag) {
			btnYes.removeAttribute('disabled');
			btnYes.style.backgroundColor = '#3897fd';
			btnNo.removeAttribute('disabled');
			btnNo.style.backgroundColor = '#3897fd';
		} else {
			btnYes.setAttribute('disabled', true);
			btnYes.style.backgroundColor = '#808080';
			btnNo.setAttribute('disabled', true);
			btnNo.style.backgroundColor = '#808080';
		}
	}

	function changeResultBtnstatus(resultBtnFlag) {
		if (resultBtnFlag) {
			btnWatchResult.setAttribute('disabled', true);
			btnWatchResult.style.backgroundColor = '#CC99FF';
		} else {
			btnWatchResult.removeAttribute('disabled');
			btnWatchResult.style.backgroundColor = '#808080';
		}
	}

	btnYes.addEventListener('click', function() {
		openResultContents();
		changeYNBtnStatus(false);
	});

	btnNo.addEventListener('click', function() {
		openResultContents();
		changeYNBtnStatus(false);
	});

	btnWatchResult.addEventListener('click', function() {
		clearInterval(timer);
		decideMussle();
		changeResultBtnstatus(false);
	});

	reset.addEventListener('click', function() {
		// 結果に使用するボタン・文字等を非表示にする
		this.classList.add('hidden');
		resultSentence.classList.add('hidden');
		mussle.classList.add('hidden');
		btnWatchResult.classList.add('hidden');
		resultMessage.classList.add('hidden');
		resultMessage.textContent = '';

		// 非活性だったボタンを活性化させる
		changeYNBtnStatus(true);
		changeResultBtnstatus(true);

		// 胸筋の点滅を再スタート
		timer = setInterval(flashMussle, 300);
	});
})();
