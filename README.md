# Bilibili MCP

## 简介
这是一个基于 Model Context Protocol (MCP) 的 B站视频搜索服务器。该服务器提供了简单的 API 接口，允许用户搜索 B站 的视频内容。

## 功能特点
- B站视频搜索
- 支持分页查询
- 返回丰富的视频信息（标题、作者、播放量、时长等）
- 基于 MCP 协议的标准化接口

## 系统要求
- Node.js >= 20.12.0

## 快速开始

bun:

```bash
bun i
bun bilibili-mcp-server.ts
bun bun-test.js
```

npm:

```bash
npm i
npm run start
npm run test
```
