# 夜活ニュースシェアアプリの Chrome 拡張機能

## 使用技術

- React
- TypeScript

webpack などの設定ファイルは ↓ を参考にしました。
https://github.com/sivertschou/react-typescript-chrome-extension-boilerplate

## 構築手順

ChromeWebStore より公式ダウンロードが可能になるまでは、自分で build する必要があります。

1. このリポジトリをクローン
2. npm i コマンドで依存パッケージをインストール
3. npm run build コマンドで本番環境用にビルド
4. chrome://extensions/ ← のパッケージ化されていない拡張機能を読み込むをクリック
5. ビルド時に作成された dist フォルダを読み込む
