const stats = [
  { value: "3", label: "프로젝트 루트", detail: "Chatbot / Report Pack / Wiki" },
  { value: "13", label: "API / 연동", detail: "키 값은 노출하지 않음" },
  { value: "7", label: "예약 자동화", detail: "2026-07-01 성공 코드 0" },
  { value: "2", label: "상시 봇 서비스", detail: "운영봇 + 데이터봇" },
  { value: "75", label: "메인 Python 모듈", detail: "SuperUlimate_Chatbot/src" },
  { value: "22", label: "운영 스크립트", detail: "PowerShell / Shell" },
];

const systems = [
  {
    group: "COORDINATOR",
    title: "SuperUlimate_Chatbot",
    accent: "red",
    summary: "Redash, Airbridge, DuckDB, Telegram, LLM, Google Sheets, 광고비 적재, A/B 테스트를 묶는 메인 로컬 운영 시스템.",
    items: [
      "Redash 주문/매출 rolling load",
      "Airbridge app/web S3 raw load",
      "Airbridge + Redash joined mart",
      "Airbridge Actuals cost mart",
      "Apple Search Ads / Google Ads cost loader",
      "Telegram 데이터 챗봇과 운영 봇",
      "A/B 테스트 등록, 지표, 요약, 최종 결과 자동화",
    ],
    badges: ["운영", "DuckDB", "Telegram", "LLM", "A/B"],
  },
  {
    group: "DATA",
    title: "Airbridge / Redash / DuckDB 데이터 코어",
    accent: "blue",
    summary: "raw 적재와 mart 생성을 분리해 데이터 원본을 보존하고 D-1 운영 분석에 필요한 joined view를 갱신합니다.",
    items: [
      "raw_redash_orders: Redash 317번 주문/매출",
      "raw_airbridge_events: app/web 이벤트 통합",
      "mart_airbridge_redash_joined: Transaction ID와 order_key 기반 결합",
      "chat_* safe view: LLM과 Telegram 응답용 비식별 분석 뷰",
    ],
    badges: ["Redash API", "Airbridge S3", "DuckDB", "safe views"],
  },
  {
    group: "AI CHAT",
    title: "Telegram 데이터 챗봇",
    accent: "pink",
    summary: "허용된 Telegram 방에서 자연어 질문을 안전한 DuckDB SQL로 변환하고, 분석 결과를 한국어 운영 메모로 반환합니다.",
    items: [
      "/data, /data_sql, /data_deep",
      "/airbridge_weekly_review",
      "/weekly_report_sa, /weekly_report_da",
      "/data_schema, /data_memory, /data_model",
      "OpenAI Responses API 기반 SQL 생성, 수리, 최종 답변",
    ],
    badges: ["OpenAI Responses API", "safe SQL", "gpt-5.4", "gpt-5.5"],
  },
  {
    group: "EXPERIMENT",
    title: "A/B 테스트 자동화",
    accent: "violet",
    summary: "Google Sheets의 테스트 등록표를 읽고 DuckDB 지표와 매칭해 일별 지표, 요약, 종료 검토 초안을 생성합니다.",
    items: [
      "01_abtest_register 기반 테스트 등록",
      "03_daily_metrics 일별 variant 지표",
      "04_daily_summary 운영 요약",
      "05_final_result 종료 판단 초안",
      "Telegram 명령: /abtest_register, /abtest_status, /abtest_close, /abtest_mapping_apply",
    ],
    badges: ["Google Sheets API", "Telegram Bot API", "LLM summary"],
  },
  {
    group: "COST",
    title: "광고비 / ROAS 수집 계층",
    accent: "green",
    summary: "Airbridge Actuals와 매체별 cost loader를 통해 cost, impression, click, purchase, revenue, ROAS 기준을 통합합니다.",
    items: [
      "Airbridge Actuals Cost API: channel/campaign/ad group/creative/term grain",
      "Apple Search Ads API: ad group / keyword report",
      "Google Ads API cost loader",
      "legacy adapter: Google Ads, Meta Ads, Naver SearchAd, Moloco, Kakao, Apple Search Ads",
      "Korea Exim 환율 API 옵션",
    ],
    badges: ["ROAS", "CPP", "CPI", "광고비"],
  },
  {
    group: "REPORT",
    title: "Airbridge GPT Daily Report Pack",
    accent: "amber",
    summary: "초기 리포트 자동화 프로젝트로, Airbridge raw 집계와 media cost join 결과를 GPT prompt와 Telegram summary로 만듭니다.",
    items: [
      "D-1 / fast / full lookback report",
      "daily_metrics, report_pack, gpt_prompt, telegram_summary 생성",
      "DuckDB raw-source 모드 지원",
      "media cost cache와 unmatched 파일 생성",
      "send_daily_telegram_report.ps1로 현재 D-1 전송 가능",
    ],
    badges: ["Airbridge", "GPT prompt", "Telegram", "legacy pack"],
  },
  {
    group: "KNOWLEDGE",
    title: "personal-llm-wiki",
    accent: "teal",
    summary: "프로젝트와 운영 지식을 장기적으로 정리하기 위한 로컬 위키입니다. 현재 프로젝트 문서는 seed 상태입니다.",
    items: [
      "superultimate_chatbot.md",
      "airbridge_redash_duckdb.md",
      "ab_test_automation.md",
      "telegram_daily_report.md",
      "data_assets.md",
    ],
    badges: ["문서 seed", "95 markdown files", "지식베이스"],
  },
];

const apiGroups = [
  {
    name: "Data / Warehouse",
    apis: [
      ["Redash API", "주문/매출 query 317 rolling load"],
      ["Airbridge S3", "app/web raw 이벤트 파일 조회와 적재"],
      ["DuckDB", "local_mart.duckdb raw/mart/safe view"],
    ],
  },
  {
    name: "Marketing Cost",
    apis: [
      ["Airbridge Actuals Cost API", "광고비/구매/매출 report grain 적재"],
      ["Apple Search Ads API", "OAuth, ad group, keyword report"],
      ["Google Ads API", "searchStream 기반 cost loader"],
      ["Meta Marketing API", "legacy media adapter"],
      ["Naver SearchAd API", "legacy media adapter"],
      ["Moloco API", "legacy token/report adapter"],
      ["Kakao Ads API", "legacy skeleton adapter"],
    ],
  },
  {
    name: "AI / Messaging / Sheets",
    apis: [
      ["OpenAI Responses API", "data chatbot SQL/answer, A/B summary"],
      ["Telegram Bot API", "운영 봇, 데이터 봇, 알림 전송"],
      ["Google Sheets API", "A/B register, daily metrics, summary, final result"],
      ["Korea Exim API", "USD media cost KRW 환율 옵션"],
    ],
  },
];

const liveBots = [
  {
    title: "Data Chat Bot",
    status: "running",
    command: "python -m src.bot.data_chat_bot",
    launcher: "scripts/run_data_chat_bot.ps1",
    note: "관측 시점에 Python 프로세스 2개가 떠 있어 중복 실행 여부 점검 권장.",
  },
  {
    title: "Automation Telegram Bot",
    status: "running",
    command: "python -m src.bot.telegram_bot",
    launcher: "scripts/run_telegram_bot_forever.ps1",
    note: "A/B 테스트 명령과 /health, /env_check를 제공. Python 프로세스 2개 관측.",
  },
];

const automations = [
  {
    time: "06:00",
    task: "SuperUlimate_Chatbot_Redash_Rolling_Load",
    job: "Redash rolling D-16 ~ D-1 load",
    last: "2026-07-01 06:00:01",
    next: "2026-07-02 06:00:00",
    result: "0",
  },
  {
    time: "06:10",
    task: "SuperUlimate_Chatbot_Airbridge_Daily_Load",
    job: "Airbridge D-1 app/web raw load",
    last: "2026-07-01 06:10:01",
    next: "2026-07-02 06:10:00",
    result: "0",
  },
  {
    time: "06:20",
    task: "SuperUlimate_Chatbot_Airbridge_Daily_Cost_Load",
    job: "Airbridge Actuals cost load 후 Apple Search Ads API cost load",
    last: "2026-07-01 06:20:01",
    next: "2026-07-02 06:20:00",
    result: "0",
  },
  {
    time: "06:45",
    task: "SuperUlimate_Chatbot_Airbridge_Redash_Daily_Joined_Mart",
    job: "D-1 Airbridge + Redash joined mart build",
    last: "2026-07-01 06:45:01",
    next: "2026-07-02 06:45:00",
    result: "0",
  },
  {
    time: "08:30",
    task: "SuperUlimate_Chatbot_ABTest_Daily_Pipeline",
    job: "A/B test daily metrics, summary, final result, Telegram send",
    last: "2026-07-01 08:30:01",
    next: "2026-07-02 08:30:00",
    result: "0",
  },
  {
    time: "09:00",
    task: "SuperUlimate_Chatbot_Load_Monitor_Delay",
    job: "daily load delay alert monitor",
    last: "2026-07-01 09:00:01",
    next: "2026-07-02 09:00:00",
    result: "0",
  },
  {
    time: "10:00",
    task: "SuperUlimate_Chatbot_Load_Monitor_Final",
    job: "daily load final missing/failure alert monitor",
    last: "2026-07-01 10:00:01",
    next: "2026-07-02 10:00:00",
    result: "0",
  },
];

const guardrails = [
  "개인정보 raw 값 비노출: LLM/Telegram 응답은 chat_* safe view를 우선 사용",
  "SQL validator: CREATE, DROP, INSERT, DELETE, COPY, raw file scan 차단",
  "환경변수 점검은 set/missing만 표시하고 token/key 값은 출력하지 않음",
  "Telegram은 허용 chat/user ID 기반으로 접근 제한",
  "S3와 cost API 실제 호출은 confirm 옵션으로 비용 발생 작업을 명시",
  ".env, DuckDB, raw CSV, logs, service account 파일은 Git 제외 대상",
  "Airbridge cost는 grain별 safe view로 분리해 중복 집계 위험 감소",
];

const tests = [
  "tests/test_data_chatbot_skills.py: weekly_report_sa 프롬프트 규칙 검증",
  "tests/test_data_chat_handlers.py: weekly preset 모델 override 검증",
  "tests/test_data_chatbot_model_override.py: 데이터 챗봇 모델 선택 검증",
  "tests/test_apple_search_ads_cost_loader.py: Apple Search Ads row 매핑과 KRW 환산 검증",
  "Windows Task Scheduler: 2026-07-01 기준 7개 예약 작업 LastTaskResult 0",
  "logs/abtest_daily_pipeline_task.log: A/B daily pipeline 실행 기록",
  "tests/homepage.test.js: 이 홈페이지 필수 콘텐츠와 secret 비노출 검증",
];

const evidence = [
  ["Main README", "C:\\Users\\dmsdl\\Desktop\\CODEX\\SuperUlimate_Chatbot\\README.md"],
  ["Environment example", "C:\\Users\\dmsdl\\Desktop\\CODEX\\SuperUlimate_Chatbot\\.env.example"],
  ["Scheduler scripts", "C:\\Users\\dmsdl\\Desktop\\CODEX\\SuperUlimate_Chatbot\\scripts"],
  ["Data chatbot service", "C:\\Users\\dmsdl\\Desktop\\CODEX\\SuperUlimate_Chatbot\\src\\services\\data_chatbot.py"],
  ["A/B jobs", "C:\\Users\\dmsdl\\Desktop\\CODEX\\SuperUlimate_Chatbot\\src\\jobs\\run_abtest_daily_pipeline.py"],
  ["Legacy report pack", "C:\\Users\\dmsdl\\Desktop\\CODEX\\airbridge_automation\\airbridge_automation\\README.md"],
  ["Media adapters", "C:\\Users\\dmsdl\\Desktop\\CODEX\\airbridge_automation\\airbridge_automation\\media_adapters"],
  ["Personal wiki", "C:\\Users\\dmsdl\\Desktop\\CODEX\\personal-llm-wiki"],
];

function makeEl(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function renderStats() {
  const target = document.querySelector("#stats");
  stats.forEach((item) => {
    const stat = makeEl("article", "stat-card");
    stat.append(makeEl("strong", "", item.value));
    stat.append(makeEl("span", "", item.label));
    stat.append(makeEl("small", "", item.detail));
    target.append(stat);
  });
}

function renderSystems() {
  const target = document.querySelector("#systems");
  systems.forEach((system) => {
    const card = makeEl("article", `system-card accent-${system.accent}`);
    const head = makeEl("div", "card-head");
    head.append(makeEl("span", "group-label", system.group));
    head.append(makeEl("h3", "", system.title));
    card.append(head);
    card.append(makeEl("p", "system-summary", system.summary));

    const list = makeEl("ul", "feature-list");
    system.items.forEach((item) => list.append(makeEl("li", "", item)));
    card.append(list);

    const badges = makeEl("div", "badge-row");
    system.badges.forEach((badge) => badges.append(makeEl("span", "badge", badge)));
    card.append(badges);
    target.append(card);
  });
}

function renderApis() {
  const target = document.querySelector("#apis");
  apiGroups.forEach((group) => {
    const box = makeEl("article", "api-group");
    box.append(makeEl("h3", "", group.name));
    group.apis.forEach(([name, description]) => {
      const row = makeEl("div", "api-row");
      row.append(makeEl("strong", "", name));
      row.append(makeEl("span", "", description));
      box.append(row);
    });
    target.append(box);
  });
}

function renderLiveBots() {
  const target = document.querySelector("#liveBots");
  liveBots.forEach((bot) => {
    const item = makeEl("article", "bot-card");
    const title = makeEl("div", "bot-title");
    title.append(makeEl("strong", "", bot.title));
    title.append(makeEl("span", "status-pill", bot.status));
    item.append(title);
    item.append(makeEl("code", "", bot.command));
    item.append(makeEl("p", "", bot.launcher));
    item.append(makeEl("small", "", bot.note));
    target.append(item);
  });
}

function renderAutomations() {
  const target = document.querySelector("#automationTimeline");
  automations.forEach((automation) => {
    const item = makeEl("article", "timeline-item");
    item.append(makeEl("div", "timeline-time", automation.time));

    const body = makeEl("div", "timeline-body");
    body.append(makeEl("h3", "", automation.task));
    body.append(makeEl("p", "", automation.job));

    const meta = makeEl("div", "timeline-meta");
    meta.append(makeEl("span", "", `last ${automation.last}`));
    meta.append(makeEl("span", "", `next ${automation.next}`));
    meta.append(makeEl("strong", "", `result ${automation.result}`));
    body.append(meta);
    item.append(body);
    target.append(item);
  });
}

function renderCompactList(selector, items) {
  const target = document.querySelector(selector);
  items.forEach((item) => {
    const row = makeEl("article", "compact-item");
    row.append(makeEl("span", "check-mark", "OK"));
    row.append(makeEl("p", "", item));
    target.append(row);
  });
}

function renderEvidence() {
  const target = document.querySelector("#evidence");
  evidence.forEach(([name, path]) => {
    const row = makeEl("article", "evidence-item");
    row.append(makeEl("strong", "", name));
    row.append(makeEl("code", "", path));
    target.append(row);
  });
}

renderStats();
renderSystems();
renderApis();
renderLiveBots();
renderAutomations();
renderCompactList("#guardrails", guardrails);
renderCompactList("#tests", tests);
renderEvidence();
