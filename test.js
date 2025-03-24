import { spawn } from "child_process";

// 启动服务器进程
const serverProcess = spawn("node", ["--loader", "ts-node/esm", "bilibili-mcp-server.ts"], {
  stdio: ["pipe", "pipe", "inherit"],
});

// 准备简单的JSON-RPC请求
const request = {
  jsonrpc: "2.0",
  id: 1,
  method: "tools/list",
  params: {
    version: "1.0",
  },
};

// 监听服务器输出
serverProcess.stdout.on("data", (data) => {
  const output = data.toString().trim();
  console.log("服务器响应:", data.toString());
  const jsonMatch = output.match(/\{.*\}/);
  if (!jsonMatch) return;

  try {
    const response = JSON.parse(output);
    if (response.id === 1 && response.result && response.result.tools) {
      console.log("发送搜索请求...");

      // 修改搜索请求格式
      const searchRequest = {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: {
          version: "0.1.0",
          name: "bilibili-search",
          arguments: {
            keyword: "美食家老八",
            limit: 10,
          },
        },
      };

      serverProcess.stdin.write(JSON.stringify(searchRequest) + "\n");
      return;
    }

    // 如果是搜索响应，关闭服务器
    if (response.id === 2) {
      console.log("测试完成，关闭服务器...");
      serverProcess.kill();
      process.exit(0);
    }
  } catch (e) {
    console.error("解析响应失败:", e);
  }

  // 如果不需要继续测试，关闭服务器
  serverProcess.kill();
  process.exit(0);
});

// 发送请求前打印请求内容
console.log("发送 MCP 请求:", JSON.stringify(request, null, 2));
serverProcess.stdin.write(JSON.stringify(request) + "\n");

// 设置超时
setTimeout(() => {
  console.error("测试超时");
  serverProcess.kill();
  process.exit(1);
}, 10000); // 增加超时时间
