# Bilibili MCP

[![English](https://img.shields.io/badge/English-Click-yellow)](README-en.md)
[![中文文档](https://img.shields.io/badge/中文文档-点击查看-orange)](README.md)
[![日本語](https://img.shields.io/badge/日本語-クリック-青)](README-ja.md)

## 概要
これは Model Context Protocol (MCP) に基づいた Bilibili 動画検索サーバーです。このサーバーはシンプルな API インターフェースを提供し、ユーザーが Bilibili の動画コンテンツを検索できるようにします。LangChain の使用例とテストスクリプトが含まれています。

## 謝辞
- LangChain のサンプルコードは [mcp-langchain-ts-client](https://github.com/isaacwasserman/mcp-langchain-ts-client)を参考にしています

## 特徴
- Bilibili 動画検索
- ページネーションクエリのサポート
- 動画情報の返却（タイトル、作者、再生回数、動画の長さなど）
- MCP プロトコルに基づく標準化されたインターフェース

## システム要件
- Node.js >= 20.12.0

## npm package
[HQHC](https://github.com/HQHC)が公開したnpmパッケージに感謝
```json
{
  "mcpServers": {
    "bilibili-search": {
    "command": "npx",
    "args": ["bilibili-mcp"],
    "description": "Bilibili動画検索用MCPサービス。AIアプリケーションでBilibiliの動画コンテンツを検索できます。"
    }
  }
}
```

## クイックスタート
> LangChain の例を実行する場合は、まず LLM モデルを設定し、.\example.ts ファイルを修正してください。
```javascript
const llm = new ChatOpenAI({
  modelName: "gpt-4o-mini",
  temperature: 0,
  openAIApiKey: "your_api_key", // あなたのモデルの API キーに置き換えてください
  configuration: {
    baseURL: "https://www.api.com/v1", // あなたのモデルの API アドレスに置き換えてください
  },
});
```

bun:

```bash
bun i
bun index.ts
# テストスクリプト
bun test.js
# MCP Inspector
bun run inspector
# LangChain の例を実行
bun build:bun
bun example.ts
```

npm:

```bash
npm i
npm run start
# テストスクリプト
npm run test
# MCP Inspector
npm run inspector
# LangChain の例を実行
npm run build
node dist/example.js
```

## スクリーンショット
![](./imgs/test-01.png)
![](./imgs/test-02.png)

