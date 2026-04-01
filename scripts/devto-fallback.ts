import * as https from "https";

export async function postToDevto(title: string, body: string, tags: string[], canonicalUrl?: string): Promise<string> {
  const token = process.env.DEVTO_API_KEY;
  if (!token) throw new Error("DEVTO_API_KEY not set");

  const postData = JSON.stringify({
    article: { title, published: false, body_markdown: body, tags: tags.slice(0, 4), ...(canonicalUrl ? { canonical_url: canonicalUrl } : {}) },
  });

  return new Promise((resolve, reject) => {
    const req = https.request("https://dev.to/api/articles", {
      method: "POST",
      headers: { "api-key": token, "Content-Type": "application/json", "Content-Length": Buffer.byteLength(postData) },
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        if (res.statusCode === 201) { const r = JSON.parse(data); console.log(`Dev.to (draft): ${r.url}`); resolve(r.url); }
        else { console.error(`Dev.to failed (${res.statusCode}): ${data}`); reject(new Error(`HTTP ${res.statusCode}`)); }
      });
    });
    req.on("error", reject);
    req.write(postData);
    req.end();
  });
}
