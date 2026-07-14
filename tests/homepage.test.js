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
  "END-TO-END DATA FLOW",
  "DATA SOURCE",
  "COLLECT / SCHEDULE",
  "DUCKDB / MAPPING",
  "MART / SAFE VIEW",
  "BOT / AGENT",
  "DELIVERY",
  "주문 · 이벤트",
  "광고 성과",
  "A/B 실험",
  "채널 운영 변경",
  "지식 · 위키 컨텍스트",
  "모니터링 · 데일리 리포트",
  "Transaction ID ↔ order_key",
  "raw_redash_orders",
  "raw_airbridge_events",
  "mart_airbridge_redash_joined",
  "marketing_operation_snapshots",
  "marketing_operation_changes",
  "Data Chat Bot",
  "Automation Telegram Bot",
  "A/B Daily Agent",
  "Channel Operation Agent",
  "Wiki Update Bot",
  "Load Monitor Agent",
  "Daily Report Bot",
  "9개 현재 테이블",
  "12개 임시 safe view",
  "Company Marketing Wiki",
  "Market Intelligence Wiki",
  "Kakao Moment Display",
  "2026-07-14 확인",
  "운영 중",
  "구축 완료",
  "점검 필요",
  "설계",
].forEach((needle) => {
  assert.ok(combined.includes(needle), `Missing flow/update content: ${needle}`);
});

[
  'id="developmentUpdates"',
  'id="endToEndFlow"',
  'class="flow-stage-heads"',
].forEach((needle) => {
  assert.ok(html.includes(needle), `Missing semantic flow structure: ${needle}`);
});

assert.ok(
  css.includes("grid-template-columns: repeat(6, minmax(0, 1fr))"),
  "Desktop flow should use six stable stage columns"
);

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
  "--discord-blurple: #5865f2",
  "--discord-canvas: #0a0d3a",
  "--discord-green: #35ed7e",
  "--discord-magenta: #ec48bd",
  "linear-gradient(135deg",
  "border-radius: 40px",
].forEach((needle) => {
  assert.ok(combined.includes(needle), `Missing Discord design requirement: ${needle}`);
});

assert.ok(!combined.includes("publish-band"), "Publish ready section should be removed");
assert.ok(!html.includes("PUBLISH READY"), "Publish ready label should not render");
assert.ok(
  !html.includes("GitHub Pages, Netlify, Vercel"),
  "Publishing platform copy should not render on the homepage"
);

console.log("homepage content checks passed");
