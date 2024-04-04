import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:8080/";

console.log("axios default url: " + axios.defaults.baseURL);

export async function apiGetFiles() {
    try {
        console.log("index.js 准备 getfiles");
        const response = await axios.get("/get-files");
        let data = response.data;
        data = data.filter(item => item.name.endsWith("-xubing.md"));
        // TODO.zyc 记得删
        return data.slice(0,3);
    } catch (error) {
        console.error("Failed to apiGetFiles", error);
        return "# ERROR";
      }
}

export async function apiLoadMarkdown(url) {
  
  try {
    const response = await axios.get(url, { headers: { 'Accept': 'application/vnd.github.v3.raw' } });
    return response.data;
  } catch (error) {
    console.error("Failed to apiLoadMarkdown", error);
    return "# ERROR";
  }
}
