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

assert.ok(!combined.includes("TELEGRAM_BOT_TOKEN="), "Secrets should not be rendered");
assert.ok(!combined.includes("OPENAI_API_KEY="), "Secrets should not be rendered");
assert.ok(!combined.includes("AWS_SECRET_ACCESS_KEY="), "Secrets should not be rendered");
assert.ok(!css.includes("letter-spacing: -"), "Negative letter spacing is disallowed");
assert.ok(
  css.includes('font-family: Helvetica, "Helvetica Neue", "Segoe UI", "Malgun Gothic", "Apple SD Gothic Neo", Arial, sans-serif;'),
  "Body font should prefer Helvetica"
);

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
