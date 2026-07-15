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
const agentBlock = js.match(/const agents = \[([\s\S]*?)\n\];/)?.[1] || "";

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
  "LINEAGE + OPERATIONS",
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
  ["Redash query 317", "DuckDB"],
  ["Airbridge S3 · app / web", "DuckDB"],
  ["Airbridge Actuals Cost API", "DuckDB"],
  ["Google Ads · Apple Search Ads", "DuckDB"],
  ["7개 광고 관리 API", "DuckDB 운영 이력"],
  ["Google Sheets · A/B 등록표", "Agent 실행 + Wiki 학습"],
  ["Telegram · 사람의 업데이트", "Agent 요청 + Wiki"],
].forEach(([source, destination]) => {
  assert.ok(js.includes(`\"${source}\"`) && js.includes(`\"${destination}\"`), `Missing Step 01 route: ${source} -> ${destination}`);
});

[
  "raw_redash_orders",
  "raw_airbridge_events",
  "raw_airbridge_report_costs",
  "raw_google_ads_costs",
  "raw_apple_search_ads_costs",
  "marketing_operation_snapshots",
  "marketing_operation_changes",
  "mart_airbridge_redash_joined",
  "load_runs",
  "Transaction ID ↔ order_key",
  "12개 임시 chat_* safe view",
].forEach((needle) => {
  assert.ok(js.includes(needle), `Missing DuckDB core detail: ${needle}`);
});

assert.strictEqual((agentBlock.match(/\baction:/g) || []).length, 5, "Every agent should define an action");
assert.strictEqual((agentBlock.match(/\bstatus:/g) || []).length, 5, "Every agent should define a status");
assert.strictEqual((agentBlock.match(/\btone:/g) || []).length, 5, "Every agent should define a status tone");
assert.strictEqual((agentBlock.match(/\bobserved:/g) || []).length, 5, "Every agent status should include its observation date");
assert.ok(agentBlock.includes('status: "운영 중"'), "Operating agents should be explicit");
assert.ok(agentBlock.includes('status: "점검 필요"'), "Channel Operation inspection status should be explicit");
assert.ok(agentBlock.includes('status: "구축 완료 · 미실행"'), "Wiki Update Bot non-running status should be explicit");
assert.ok(js.includes('makeEl("p", "agent-action", `작업: ${agent.action}`)'), "Agent action should render on each card");
assert.ok(js.includes("makeStatus(agent.status, agent.tone)"), "Agent status should render on each card");
assert.ok(js.includes('makeEl("small", "agent-observed", agent.observed)'), "Agent observation date should render on each card");

["운영 중", "구축 완료", "점검 필요", "설계"].forEach((status) => {
  assert.ok(combined.includes(status), `Missing explicit operating status: ${status}`);
});

[
  'id="developmentUpdates"',
  'id="endToEndFlow"',
  "lineage-flow",
  "dual-core",
  "agent-grid",
  "wiki-write-grid",
].forEach((needle) => {
  assert.ok(combined.includes(needle), `Missing dual-core structure: ${needle}`);
});

[
  'href="#flow"',
  'href="#today"',
  'href="#agents"',
  'href="#systems"',
  "lineage-flow",
  "source-lane",
  "truth-lane",
  "agent-rail",
  "operations-band",
  "today-panel",
  "agent-register",
  "Windows Scheduler가 실행하는 핵심 자동화를 시간순으로 보여주고, 점검이 필요한 작업을 빠르게 식별합니다.",
  "각 봇과 에이전트가 DuckDB·Wiki를 읽고 쓰는 범위와 현재 운영 상태를 한눈에 요약합니다.",
  "function renderOperationsBand()",
].forEach((needle) => {
  assert.ok(combined.includes(needle), `Missing B2 lineage structure: ${needle}`);
});
assert.ok(js.includes("agents.forEach((agent) =>"), "Agent register should reuse all five agent records");
assert.ok(!combined.includes("AFTER THE FLOW"), "Generic AFTER THE FLOW content should be removed");

assert.ok(!combined.includes("TELEGRAM_BOT_TOKEN="), "Secrets should not be rendered");
assert.ok(!combined.includes("OPENAI_API_KEY="), "Secrets should not be rendered");
assert.ok(!combined.includes("AWS_SECRET_ACCESS_KEY="), "Secrets should not be rendered");
assert.ok(!combined.includes("C:\\Users\\"), "Local user paths should not be published");
assert.ok(!css.includes("calc(100vw - 36px)"), "Padded page layout should not use scrollbar-inclusive viewport width");
assert.ok(!css.includes("letter-spacing: -"), "Negative letter spacing is disallowed");
assert.ok(
  /(^|\n)h1\s*\{[^}]*max-width:\s*100%[^}]*overflow-wrap:\s*anywhere/.test(css),
  "Hero h1 should contain and wrap within its parent"
);
assert.ok(
  /@media \(max-width: 760px\)\s*\{[\s\S]*?h1\s*\{[^}]*font-size:\s*18px[^}]*\}[\s\S]*?\.hero-statement\s*\{[^}]*font-size:\s*30px/.test(css),
  "Mobile hero should keep the brand compact and the lineage question prominent"
);
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

assert.ok(
  /\.lineage-flow\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:/s.test(css),
  "Desktop lineage should use an explicit grid"
);
assert.ok(
  /\.operations-band\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s.test(css),
  "TODAY and AGENT REGISTER should share a two-column operations band"
);
assert.ok(css.includes(":focus-visible"), "Keyboard focus should remain visible");
assert.ok(css.includes("@media (prefers-reduced-motion: reduce)"), "Reduced-motion users should be respected");
const lineageResponsive = css.match(/@media \(max-width: 1100px\) \{([\s\S]*?)\n\}/)?.[1] || "";
assert.ok(
  lineageResponsive.includes(".lineage-flow") &&
    lineageResponsive.includes(".operations-band") &&
    lineageResponsive.includes("grid-template-columns: 1fr"),
  "Lineage and operations panels should stack at 1100px"
);

assert.ok(!css.includes(".common-flow"), "Superseded common-flow layout should be removed");

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
assert.ok(/\.core-use-chip\s*\{[^}]*border-radius:\s*[4-8]px/.test(css), "Core use chips should use an approved 4px-8px radius");

assert.ok(!combined.includes("publish-band"), "Publish ready section should be removed");
assert.ok(!html.includes("PUBLISH READY"), "Publish ready label should not render");
assert.ok(
  !html.includes("GitHub Pages, Netlify, Vercel"),
  "Publishing platform copy should not render on the homepage"
);

console.log("homepage content checks passed");
