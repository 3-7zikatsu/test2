const btn = document.getElementById("buzzerBtn");
const counterValue = document.getElementById("counterValue");

let localCount = 0;
let isAnimating = false;

function setCounter(count) {
  counterValue.textContent = Number(count || 0).toLocaleString();
}

btn.addEventListener("click", () => {
  if (isAnimating) return;

  // ★ スマホのバイブレーションを実行（対応端末のみ）
  if ("vibrate" in navigator) {
    navigator.vibrate(10); // 10ミリ秒だけ振動
  }

  isAnimating = true;

  // ボタンを押し込む（CSSにより100msで完了）
  btn.classList.add("pressing");

  // 100ms後（底まで沈みきったタイミング）で処理を実行
  setTimeout(() => {
    localCount++;
    setCounter(localCount);

    // ボタンを戻す（CSSにより150msかけて元の位置へ）
    btn.classList.remove("pressing");
  }, 100);

  // 250ms後にアニメーションロックを解除
  setTimeout(() => {
    isAnimating = false;
  }, 250);
});
