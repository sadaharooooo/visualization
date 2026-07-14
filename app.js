const stats = [
  { value: "9", label: "현재 DuckDB 테이블", detail: "9개 현재 테이블 · 2026-07-14 확인" },
  { value: "12", label: "챗봇 안전 뷰", detail: "12개 임시 safe view" },
  { value: "9", label: "등록 예약 작업", detail: "8개 정상 · 1개 점검 필요" },
  { value: "7", label: "채널 운영 API", detail: "검색 · 디스플레이 · 앱 광고" },
  { value: "2", label: "상시 봇 종류", detail: "Data Chat · Automation" },
  { value: "3", label: "지식 위키", detail: "Company · Market · Personal" },
];

const developmentUpdates = [
  {
    title: "Company / Market Intelligence Wiki",
    date: "07.06 - 07.14",
    status: "구축 완료",
    tone: "built",
    summary: "회사 마케팅 사실·의사결정과 시장·경쟁사 리서치를 원문 노트와 해석 문서로 분리해 축적합니다.",
  },
  {
    title: "Telegram Wiki Update Bot",
    date: "07.06 - 07.14",
    status: "구축 완료",
    tone: "built",
    summary: "Telegram 입력을 비밀정보 검사 → LLM 미리보기 → 확인 후 위키 기록으로 처리합니다. 현재 미실행·작업 미등록 상태입니다.",
  },
  {
    title: "A/B Test Wiki Events",
    date: "07.07",
    status: "운영 중",
    tone: "running",
    summary: "일별 실험 지표와 종료 결과를 Google Sheets·Telegram에 전달하고 Company Marketing Wiki 이벤트로 남깁니다.",
  },
  {
    title: "Channel Operation Changelog",
    date: "07.08 - 07.14",
    status: "점검 필요",
    tone: "check",
    summary: "7개 광고 관리 API의 캠페인·예산·상태 변경을 스냅샷과 diff로 기록합니다. 09:20 작업의 최근 결과가 비정상입니다.",
  },
  {
    title: "Data Chatbot Wiki Context",
    date: "07.14",
    status: "운영 중",
    tone: "running",
    summary: "수치 답변은 DuckDB safe view를 기준으로 하고, 마케팅 질문에만 허용된 위키 문맥을 작게 결합합니다.",
  },
  {
    title: "Kakao Moment Display",
    date: "07.13",
    status: "구축 완료",
    tone: "built",
    summary: "DISPLAY·TALK_BIZ_BOARD 비용 수집과 safe view 코드가 완성됐습니다. 작업 미등록 · 테이블 미생성 상태입니다.",
  },
  {
    title: "분석 산출물",
    date: "07.06 - 07.14",
    status: "구축 완료",
    tone: "built",
    summary: "추천인 매출 검증 워크북과 주간 채널 이상징후 분석·검증 산출물을 만들었습니다. 일회성 결과물입니다.",
  },
  {
    title: "Earlier Telegram Schedule",
    date: "07.13",
    status: "설계",
    tone: "design",
    summary: "리포트·알림을 한 시간 앞당기고 월요일 주간 보고를 추가하는 설계입니다. 현재 예약 시간에는 적용되지 않았습니다.",
  },
];

const flowStages = [
  "DATA SOURCE",
  "COLLECT / SCHEDULE",
  "DUCKDB / MAPPING",
  "MART / SAFE VIEW",
  "BOT / AGENT",
  "DELIVERY",
];

const flowLanes = [
  {
    title: "주문 · 이벤트",
    status: "운영 중",
    tone: "running",
    cells: [
      ["Redash query 317", "Airbridge S3 app/web"],
      ["06:00 Redash Rolling Loader", "06:10 Airbridge Daily Loader", "06:45 Joined Mart"],
      ["raw_redash_orders", "raw_airbridge_events", "Transaction ID ↔ order_key"],
      ["mart_airbridge_redash_joined", "chat_orders · chat_airbridge_events", "chat_joined"],
      ["Data Chat Bot", "A/B Daily Agent"],
      ["Telegram 분석 답변", "Google Sheets A/B 지표", "Company Marketing Wiki 이벤트"],
    ],
  },
  {
    title: "광고 성과",
    status: "운영 중",
    tone: "running",
    cells: [
      ["Airbridge Actuals", "Google Ads", "Apple Search Ads", "Kakao Moment Display"],
      ["06:20 Daily Cost Loader", "Google · Apple cost loaders", "Kakao 08:10 script · 작업 미등록"],
      ["raw_airbridge_report_costs", "raw_google_ads_costs", "raw_apple_search_ads_costs", "raw_kakao_moment_costs · 테이블 미생성"],
      ["channel · campaign · ad group", "creative · term safe views", "12개 임시 safe view"],
      ["Data Chat Bot", "Daily Report Bot", "A/B Daily Agent"],
      ["ROAS · CPP · CPI 답변", "Telegram 데일리 리포트", "Google Sheets"],
    ],
  },
  {
    title: "A/B 실험",
    status: "운영 중",
    tone: "running",
    cells: [
      ["Google Sheets 실험 등록표", "Telegram A/B 명령", "joined mart · cost tables"],
      ["Automation Telegram Bot", "08:30 A/B Daily Pipeline"],
      ["mart_airbridge_redash_joined 조회", "캠페인 · ad group · variant mapping resolver"],
      ["03_daily_metrics", "04_daily_summary", "05_final_result", "LLM 요약 · 종료 판단"],
      ["A/B Daily Agent", "Automation Telegram Bot"],
      ["Google Sheets 갱신", "Telegram 결과", "Company Marketing Wiki 이벤트"],
    ],
  },
  {
    title: "채널 운영 변경",
    status: "점검 필요",
    tone: "check",
    cells: [
      ["Naver SearchAd · Google Ads", "Apple · Meta · Moloco", "Naver DA · Kakao"],
      ["09:20 Channel Operation Connectors", "2026-07-14 최근 결과 비정상"],
      ["marketing_operation_snapshots", "캠페인 · 광고그룹 · 소재 · 키워드 정규화"],
      ["created · removed · status", "budget · name · schedule · bid diff", "marketing_operation_changes"],
      ["Channel Operation Agent"],
      ["Telegram 변경 알림", "Company Marketing Wiki changelog"],
    ],
  },
  {
    title: "지식 · 위키 컨텍스트",
    status: "구축 완료",
    tone: "built",
    cells: [
      ["Telegram /update · /wiki_update", "제품 · 마케팅 업데이트"],
      ["Wiki Update Bot", "비밀정보 검사 → 미리보기 → 확인", "현재 미실행 · 작업 미등록"],
      ["DuckDB 직접 적재 없음", "raw source note 보존", "수치 진실은 DuckDB 유지"],
      ["Company Marketing Wiki", "Market Intelligence Wiki", "허용된 위키 컨텍스트"],
      ["Wiki Update Bot", "Data Chat Bot"],
      ["위키 원문 · 해석 문서", "문맥이 보강된 Telegram 답변"],
    ],
  },
  {
    title: "모니터링 · 데일리 리포트",
    status: "운영 중",
    tone: "running",
    cells: [
      ["Windows Task Scheduler", "load 상태 · 테이블 freshness", "Airbridge raw · media cost"],
      ["예약 loader 실행", "09:00 Delay Check", "10:00 Final Check", "09:00 Daily Report"],
      ["load_runs", "9개 현재 테이블 상태", "raw source · cost cache"],
      ["freshness · load status", "daily_metrics · report_pack", "gpt_prompt · telegram_summary"],
      ["Load Monitor Agent", "Daily Report Bot"],
      ["Telegram 지연 · 누락 경고", "Telegram 데일리 리포트"],
    ],
  },
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
      "광고 채널 운영 변경 감지와 위키 기록",
      "Company / Market Intelligence Wiki 자동 업데이트",
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
      "Kakao Moment DISPLAY / TALK_BIZ_BOARD cost loader 코드",
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
    group: "CHANNEL OPS",
    title: "광고 채널 운영 변경 감지",
    accent: "pink",
    summary: "7개 광고 관리 API의 운영 객체를 공통 스키마로 정규화하고 이전 스냅샷과 비교해 실제 변경만 기록합니다.",
    items: [
      "marketing_operation_snapshots: 시점별 운영 상태",
      "marketing_operation_changes: 생성·삭제·상태·예산·이름·일정·입찰 변경",
      "09:20 Windows 작업 등록",
      "최근 실행 결과 비정상으로 점검 필요",
      "Telegram changelog와 Company Marketing Wiki 기록",
    ],
    badges: ["7 management APIs", "snapshot", "diff", "점검 필요"],
  },
  {
    group: "KNOWLEDGE",
    title: "Company / Market / Personal Wikis",
    accent: "teal",
    summary: "운영 사실, 의사결정, 실험 학습, 시장 리서치와 프로젝트 지식을 원문과 해석 문서로 나눠 장기 축적합니다.",
    items: [
      "Company Marketing Wiki: 마케팅 사실·결정·A/B·채널 변경",
      "Market Intelligence Wiki: 시장·경쟁사·규제·전략 리서치",
      "Personal LLM Wiki: 프로젝트와 데이터 자산 문서",
      "Wiki Update Bot: 비밀정보 검사, 미리보기, 확인 후 기록",
      "Data Chat Bot: 허용된 위키 문맥만 보조 해석에 사용",
    ],
    badges: ["raw source notes", "interpreted pages", "allowlist", "지식베이스"],
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
    name: "Marketing Performance",
    apis: [
      ["Airbridge Actuals Cost API", "광고비/구매/매출 report grain 적재"],
      ["Apple Search Ads API", "OAuth, ad group, keyword report"],
      ["Google Ads API", "searchStream 기반 cost loader"],
      ["Meta Marketing API", "legacy media adapter"],
      ["Naver SearchAd API", "legacy media adapter"],
      ["Moloco API", "legacy token/report adapter"],
      ["Kakao Moment API", "DISPLAY / TALK_BIZ_BOARD 비용 수집 코드"],
    ],
  },
  {
    name: "Channel Operations",
    apis: [
      ["Naver SearchAd API", "검색광고 운영 객체 스냅샷"],
      ["Google Ads API", "캠페인·광고그룹·소재·키워드 운영 상태"],
      ["Apple Search Ads API", "캠페인·광고그룹·키워드 운영 상태"],
      ["Meta Marketing API", "캠페인·광고세트·소재 운영 상태"],
      ["Moloco API", "앱 광고 운영 객체"],
      ["Naver DA API", "디스플레이 광고 운영 객체"],
      ["Kakao Moment API", "디스플레이 캠페인 운영 객체"],
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
    status: "운영 중",
    tone: "running",
    command: "python -m src.bot.data_chat_bot",
    launcher: "scripts/run_data_chat_bot.ps1",
    note: "2026-07-14 확인 · 시작프로그램 등록 · Python 프로세스 2개 관측으로 중복 실행 여부 점검 권장.",
  },
  {
    title: "Automation Telegram Bot",
    status: "운영 중",
    tone: "running",
    command: "python -m src.bot.telegram_bot",
    launcher: "scripts/run_telegram_bot_forever.ps1",
    note: "2026-07-14 확인 · A/B 명령과 /health, /env_check 제공 · Python 프로세스 2개 관측.",
  },
];

const automations = [
  {
    time: "06:00",
    task: "SuperUlimate_Chatbot_Redash_Rolling_Load",
    job: "Redash rolling D-16 ~ D-1 load",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
  },
  {
    time: "06:10",
    task: "SuperUlimate_Chatbot_Airbridge_Daily_Load",
    job: "Airbridge D-1 app/web raw load",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
  },
  {
    time: "06:20",
    task: "SuperUlimate_Chatbot_Airbridge_Daily_Cost_Load",
    job: "Airbridge Actuals cost load 후 Apple Search Ads API cost load",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
  },
  {
    time: "06:45",
    task: "SuperUlimate_Chatbot_Airbridge_Redash_Daily_Joined_Mart",
    job: "D-1 Airbridge + Redash joined mart build",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
  },
  {
    time: "08:30",
    task: "SuperUlimate_Chatbot_ABTest_Daily_Pipeline",
    job: "A/B test daily metrics, summary, final result, Telegram send",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
  },
  {
    time: "09:00",
    task: "Airbridge Daily Telegram Report",
    job: "legacy report pack D-1 Telegram send",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
  },
  {
    time: "09:00",
    task: "SuperUlimate_Chatbot_Load_Monitor_Delay",
    job: "daily load delay alert monitor",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
  },
  {
    time: "09:20",
    task: "SuperUlimate_Chatbot_Channel_Operation_Changelog",
    job: "paid-media operation snapshot, diff, Wiki and Telegram changelog",
    status: "점검 필요",
    tone: "check",
    observed: "2026-07-14 LastTaskResult 3221225786",
  },
  {
    time: "10:00",
    task: "SuperUlimate_Chatbot_Load_Monitor_Final",
    job: "daily load final missing/failure alert monitor",
    status: "운영 중",
    tone: "running",
    observed: "2026-07-14 LastTaskResult 0",
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
  "Wiki Update Bot은 secret pattern 검사를 통과한 입력만 미리보기·확인 후 기록",
  "Data Chat Bot은 raw table 직접 SQL을 차단하고 12개 임시 chat_* view만 허용",
];

const tests = [
  "tests/test_data_chatbot_skills.py: weekly_report_sa 프롬프트 규칙 검증",
  "tests/test_data_chat_handlers.py: weekly preset 모델 override 검증",
  "tests/test_data_chatbot_model_override.py: 데이터 챗봇 모델 선택 검증",
  "tests/test_apple_search_ads_cost_loader.py: Apple Search Ads row 매핑과 KRW 환산 검증",
  "Windows Task Scheduler: 2026-07-14 기준 9개 등록 작업과 최근 결과 확인",
  "logs/abtest_daily_pipeline_task.log: A/B daily pipeline 실행 기록",
  "채널 운영 connector·normalizer·diff 테스트",
  "Kakao Moment DISPLAY / TALK_BIZ_BOARD allowlist와 row mapping 테스트",
  "tests/homepage.test.js: 이 홈페이지 필수 콘텐츠와 secret 비노출 검증",
];

const evidence = [
  ["Main data pipeline", "SuperUlimate_Chatbot / README.md"],
  ["Scheduler scripts", "SuperUlimate_Chatbot / scripts"],
  ["Data chatbot service", "SuperUlimate_Chatbot / src / services / data_chatbot.py"],
  ["A/B daily pipeline", "SuperUlimate_Chatbot / src / jobs / run_abtest_daily_pipeline.py"],
  ["Channel operation pipeline", "SuperUlimate_Chatbot / src / jobs / run_channel_operation_changelog.py"],
  ["Wiki update service", "SuperUlimate_Chatbot / src / services / wiki_update.py"],
  ["Legacy report pack", "airbridge_automation / README.md"],
  ["Knowledge bases", "company-marketing-wiki / market-intelligence-wiki / personal-llm-wiki"],
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

function makeStatus(text, tone) {
  return makeEl("span", `status-pill status-${tone}`, text);
}

function renderDevelopmentUpdates() {
  const target = document.querySelector("#developmentUpdates");
  developmentUpdates.forEach((update) => {
    const card = makeEl("article", `update-card update-${update.tone}`);
    const meta = makeEl("div", "update-meta");
    meta.append(makeEl("time", "", update.date));
    meta.append(makeStatus(update.status, update.tone));
    card.append(meta);
    card.append(makeEl("h3", "", update.title));
    card.append(makeEl("p", "", update.summary));
    target.append(card);
  });
}

function renderFlow() {
  const target = document.querySelector("#endToEndFlow");
  flowLanes.forEach((flow) => {
    const lane = makeEl("article", `flow-lane lane-${flow.tone}`);
    const head = makeEl("div", "flow-lane-head");
    head.append(makeEl("h3", "", flow.title));
    head.append(makeStatus(flow.status, flow.tone));
    lane.append(head);

    const cells = makeEl("div", "flow-cells");
    flow.cells.forEach((items, index) => {
      const cell = makeEl("section", `flow-cell flow-stage-${index + 1}`);
      cell.append(makeEl("span", "flow-stage-label", flowStages[index]));

      const list = makeEl("ul", "flow-item-list");
      items.forEach((item) => {
        const warning = item.includes("미등록") || item.includes("미생성") || item.includes("비정상");
        list.append(makeEl("li", warning ? "flow-warning" : "", item));
      });
      cell.append(list);
      cells.append(cell);
    });
    lane.append(cells);
    target.append(lane);
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
    title.append(makeStatus(bot.status, bot.tone));
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
    meta.append(makeEl("span", "", automation.observed));
    meta.append(makeStatus(automation.status, automation.tone));
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
renderDevelopmentUpdates();
renderFlow();
renderSystems();
renderApis();
renderLiveBots();
renderAutomations();
renderCompactList("#guardrails", guardrails);
renderCompactList("#tests", tests);
renderEvidence();
