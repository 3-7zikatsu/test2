# QUIZ BATTLE

GitHub Pages で動作する、Firebase Realtime Database を使った共有PUSHカウンターです。

## Firebase の設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成し、Webアプリを登録します。
2. **Realtime Database** を作成します。リージョンは近い場所を選択してください。
3. プロジェクトの設定画面にあるWebアプリの設定値を、`firebase-config.js` の各 `YOUR_...` に貼り付けます。`databaseURL` はRealtime DatabaseのURLです。
4. Realtime Database の **ルール** に以下を貼り付けて公開します。総数の読み取りと、1ずつ増やす更新だけを許可します。

```json
{
  "rules": {
    "quizBattle": {
      ".read": true,
      "totalPushes": {
        ".write": "newData.isNumber() && newData.val() == (data.exists() ? data.val() + 1 : 1)",
        ".validate": "newData.isNumber() && newData.val() >= 0"
      }
    }
  }
}
```

5. `main` ブランチのリポジトリ設定で **Pages** を有効化し、公開先を `/(root)` にします。公開されたURLを複数の端末で開くと、同じ総PUSH数がリアルタイムに更新されます。

Firebaseの設定オブジェクトはブラウザに配信される前提です。秘密情報は含めず、アクセス制御は必ず上記のRealtime Database Rulesで行ってください。
