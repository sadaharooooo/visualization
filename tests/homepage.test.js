const assert = require("assert");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = ["index.html", "styles.css", "app.js", "README.md", "netlify.toml"];

for (const file of files) {
  assert.ok(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
const js = fs.readFileSync(path.join(root, "app.js"), "utf8");
const combined = `${html}\n${css}\n${js}`;

[
  "SuperUltimate AI 운영본부",
  "SuperUlimate_Chatbot_Redash_Rolling_Load",
  "SuperUlimate_Chatbot_Airbridge_Daily_Load",
  "SuperUlimate_Chatbot_Airbridge_Daily_Cost_Load",
  "SuperUlimate_Chatbot_Airbridge_Redash_Daily_Joined_Mart",
  "SuperUlimate_Chatbot_ABTest_Daily_Pipeline",
  "SuperUlimate_Chatbot_Load_Monitor_Delay",
  "SuperUlimate_Chatbot_Load_Monitor_Final",
  "Redash API",
  "Airbridge S3",
  "Airbridge Actuals Cost API",
  "Apple Search Ads API",
  "Google Sheets API",
  "Telegram Bot API",
  "OpenAI Responses API",
  "DuckDB",
  "개인정보 raw 값 비노출",
].forEach((needle) => {
  assert.ok(combined.includes(needle), `Missing required text: ${needle}`);
});

[
  "NEW SINCE 2026-07-01",
  "DUAL-CORE OPERATING MAP",
  "데이터는 어디서 들어오나",
  "Redash query 317",
  "Airbridge S3 · app / web",
  "Airbridge Actuals Cost API",
  "Google Ads · Apple Search Ads",
  "7개 광고 관리 API",
  "Google Sheets · A/B 등록표",
  "Telegram · 사람의 업데이트",
  "DuckDB 데이터 코어",
  "Wiki 지식 코어",
  "Company Marketing Wiki",
  "Market Intelligence Wiki",
  "Personal LLM Wiki",
  "수치 충돌 시 DuckDB 우선",
  "Data Chat Bot",
  "A/B Daily Agent",
  "Channel Operation Agent",
  "Wiki Update Bot",
  "Monitor + Report",
].forEach((needle) => {
  assert.ok(combined.includes(needle), `Missing dual-core content: ${needle}`);
});

[
  'id="developmentUpdates"',
  'id="endToEndFlow"',
  "common-flow",
  "dual-core",
  "agent-grid",
  "wiki-write-grid",
].forEach((needle) => {
  assert.ok(combined.includes(needle), `Missing dual-core structure: ${needle}`);
});

assert.ok(!combined.includes("TELEGRAM_BOT_TOKEN="), "Secrets should not be rendered");
assert.ok(!combined.includes("OPENAI_API_KEY="), "Secrets should not be rendered");
assert.ok(!combined.includes("AWS_SECRET_ACCESS_KEY="), "Secrets should not be rendered");
assert.ok(!combined.includes("C:\\Users\\"), "Local user paths should not be published");
assert.ok(!css.includes("calc(100vw - 36px)"), "Padded page layout should not use scrollbar-inclusive viewport width");
assert.ok(!css.includes("letter-spacing: -"), "Negative letter spacing is disallowed");
assert.ok(
  css.includes('@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");'),
  "Pretendard webfont should be imported"
);

const fontFamilies = css.match(/font-family:[^;]+;/g) || [];
assert.ok(fontFamilies.length > 0, "CSS should declare font families");
fontFamilies.forEach((fontFamily) => {
  assert.ok(fontFamily.includes("Pretendard"), `Font family should prefer Pretendard: ${fontFamily}`);
});
assert.ok(!css.includes("Helvetica"), "Helvetica should not remain in the font stack");
assert.ok(!css.includes("Consolas"), "Consolas should not remain in the font stack");

[
  "--canvas: #0b0e11",
  "--surface: #1e2329",
  "--elevated: #2b3139",
  "--yellow: #fcd535",
  "--active-yellow: #f0b90b",
  "--text: #eaecef",
  "--muted: #929aa5",
  "--up: #0ecb81",
  "--down: #f6465d",
].forEach((needle) => {
  assert.ok(css.includes(needle), `Missing Binance token: ${needle}`);
});

assert.ok(!css.includes("--discord-"), "Discord tokens should be removed");
assert.ok(!css.includes("linear-gradient"), "Gradients should be removed");
assert.ok(!css.includes("border-radius: 40px"), "Oversized radii should be removed");

assert.ok(!combined.includes("publish-band"), "Publish ready section should be removed");
assert.ok(!html.includes("PUBLISH READY"), "Publish ready label should not render");
assert.ok(
  !html.includes("GitHub Pages, Netlify, Vercel"),
  "Publishing platform copy should not render on the homepage"
);

console.log("homepage content checks passed");
