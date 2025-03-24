import axios from "axios";
import { CookieJar } from "tough-cookie";
// import * as fs from "fs";
// import * as path from "path";

const HOME_URL = "https://www.bilibili.com";
const BW_HEADERS = {
  Accept: "*/*",
  Connection: "keep-alive",
  "Accept-Encoding": "gzip, deflate, br",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
  Referer: HOME_URL,
};

export async function searchBilibili(
  keyword: string,
  page: number = 1,
  limit: number = 20,
  order: string = "totalrank"
) {
  // 创建 cookie jar
  const jar = new CookieJar();
  const client = axios.create();

  // 第一步：访问 bilibili.com 获取 cookies
  // console.log会返回到客户端,所以屏蔽
  // console.log("正在获取 Bilibili cookies...");
  try {
    const biliResponse = await client.get(HOME_URL, {
      headers: BW_HEADERS,
    });
    if (biliResponse.status === 200) {
      if (biliResponse.headers["set-cookie"]) {
        const setCookies = biliResponse.headers["set-cookie"];
        for (const cookieStr of setCookies) {
          await jar.setCookieSync(cookieStr, HOME_URL);
        }
      }
    }
  } catch (error) {
    console.error("访问B站失败:", error);
  }

  // 第二步：使用获取的 cookies 访问搜索 API
  // console.log(`正在搜索关键词: ${keyword}`);
  const encodeStr = encodeURIComponent(keyword);
  // 使用正确的搜索 API URL，添加更多必要参数
  const searchUrl = `https://api.bilibili.com/x/web-interface/search/all/v2?keyword=${encodeStr}&page=${page}&order=${order}`;

  // 获取将要发送的 cookies
  const cookiesForRequest = await jar.getCookieString(HOME_URL);
  // console.log("搜索使用的 cookies:", cookiesForRequest);

  // 手动将 cookies 添加到请求头
  const response = await client.get(searchUrl, {
    headers: {
      ...BW_HEADERS,
      Cookie: cookiesForRequest, // 手动设置 Cookie 头
      Referer: `https://search.bilibili.com/all?keyword=${encodeStr}`, // 必须设置正确的 Referer
    },
  });

  // 打印返回的数据
  // console.log("接口 Code:", response?.data?.code);
  return (
    response.data.data.result.find((item: any) => item.result_type === "video")
      ?.data || []
  );
}

// 测试
// // 执行搜索
// const res = await searchBilibili("一栗小莎子").catch((err) => {
//   console.log("程序执行出错:", err?.response?.data || err);
// });

// // 将结果保存到文件
// const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
// const filename = `bilibili_search_${timestamp}.json`;
// fs.writeFileSync(
//   path.join(__dirname, filename),
//   JSON.stringify(res, null, 2),
//   "utf8"
// );
// console.log(`搜索结果已保存到文件: ${filename}`);
