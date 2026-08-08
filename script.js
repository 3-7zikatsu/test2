import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getDatabase,
  onValue,
  ref,
  runTransaction
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

const btn = document.getElementById("buzzerBtn");
const counterValue = document.getElementById("counterValue");
const statusMessage = document.getElementById("statusMessage");
const isConfigured = !Object.values(firebaseConfig).some((value) => value.includes("YOUR_"));
const counterRef = isConfigured
  ? ref(getDatabase(initializeApp(firebaseConfig)), "quizBattle/totalPushes")
  : null;

let isAnimating = false;
let isConnected = false;

function setCounter(count) {
  counterValue.textContent = Number(count || 0).toLocaleString();
}

function setStatus(message) {
  statusMessage.textContent = message;
}

if (counterRef) {
  onValue(
    counterRef,
    (snapshot) => {
      setCounter(snapshot.val());
      isConnected = true;
      setStatus("全アクセス者の総PUSH数を表示中");
    },
    () => {
      isConnected = false;
      setStatus("カウンターに接続できません。Firebaseの設定を確認してください。");
    }
  );
} else {
  setStatus("Firebaseの設定後に、全アクセス者の総PUSH数を表示します。");
}

btn.addEventListener("click", () => {
  if (isAnimating) return;

  if ("vibrate" in navigator) {
    navigator.vibrate(10);
  }

  isAnimating = true;
  btn.classList.add("pressing");

  setTimeout(async () => {
    btn.classList.remove("pressing");

    if (!counterRef || !isConnected) {
      setStatus("接続中のため、少し待ってからもう一度押してください。");
      return;
    }

    try {
      await runTransaction(counterRef, (currentValue) => Number(currentValue || 0) + 1);
    } catch {
      setStatus("PUSHを保存できませんでした。通信状態を確認してください。");
    }
  }, 100);

  setTimeout(() => {
    isAnimating = false;
  }, 250);
});
