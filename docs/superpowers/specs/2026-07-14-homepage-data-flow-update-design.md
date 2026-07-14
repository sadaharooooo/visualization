# Homepage Data Flow Update Design

## Goal

Update the existing public static homepage with every material Codex development completed after the 2026-07-01 homepage baseline, then add one end-to-end flowchart that explains how data is collected, stored, transformed, analyzed, and delivered.

## Approved Direction

Use option A, "전체 플로우 우선."

The page order is:

1. Existing hero and current-state summary
2. `NEW SINCE 2026-07-01` development updates
3. One full-width `END-TO-END DATA FLOW` chart
4. Current system, API, bot, automation, guardrail, and test sections
5. Evidence labels without private local paths

The existing Discord-inspired visual language and Pretendard typography remain unchanged.

## Evidence Cutoff

Homepage facts are based on code, Git history, DuckDB schema inspection, running processes, and Windows Task Scheduler observed on 2026-07-14 KST.

The page must label operational facts with `2026-07-14 확인` because this remains a static GitHub Pages site and does not provide live monitoring.

## Development Updates To Add

### Company and Market Intelligence Wikis

- Company Marketing Wiki created for aggregate marketing facts, decisions, reports, A/B learnings, campaign changes, product updates, and metric definitions.
- Market Intelligence Wiki created for market, competitor, regulation, channel, and strategy research.
- Raw source notes and interpreted wiki pages are separated.
- Customer-level raw values, credentials, and tokens are excluded from wiki content.

Status: `구축 완료`.

### Telegram Wiki Update Automation

- Telegram intake supports product updates and generic wiki updates.
- The system creates an LLM preview, requires confirmation, and writes both raw source notes and interpreted pages.
- Secret-pattern checks reject unsafe content before writing.

Status: `구축 완료`. Detail: the wiki bot is not currently running or registered as a Windows task.

### A/B Test Wiki Events

- The daily A/B pipeline can write experiment events and result updates to the Company Marketing Wiki.
- DuckDB metrics and Google Sheets remain the structured experiment sources.

Status: `운영 중`.

### Channel Operation Changelog

- Naver SearchAd, Google Ads, Apple Search Ads, Meta, Moloco, Naver DA, and Kakao connectors normalize campaign, ad group, creative, keyword, budget, status, schedule, and bidding snapshots.
- DuckDB stores `marketing_operation_snapshots` and `marketing_operation_changes`.
- The diff engine detects created, removed, status, budget, name, schedule, and bid-strategy changes.
- Results are written to the Company Marketing Wiki and sent to Telegram.
- Performance metrics such as ROAS and revenue remain outside this pipeline.

Status: `점검 필요`. The 09:20 Windows task is registered, but the 2026-07-14 result was non-zero.

### Data Chatbot Wiki Context

- Marketing, campaign, funnel, coupon, product, strategy, and A/B questions receive a small allowlisted Company Marketing Wiki context slice.
- DuckDB SQL results remain the numeric source of truth; wiki context is interpretation only.
- Safe temporary `chat_*` views remain the only LLM-queryable database layer.

Status: `운영 중`.

### Kakao Moment Display Integration

- Only `DISPLAY` and `TALK_BIZ_BOARD` campaign types are allowed.
- Message-ad campaign types and message metrics are excluded by allowlist.
- Campaign, ad-group, and creative cost, impressions, clicks, and CTR are normalized for `raw_kakao_moment_costs`.
- `chat_kakao_moment_costs` is defined for the data chatbot.
- Kakao display objects also feed the channel-operation snapshot pipeline.

Status: `구축 완료`. Detail: the loader and 08:10 scheduler scripts exist, but the Windows task is not registered and the DuckDB table does not exist yet.

### Analysis Deliverables

- Referral revenue analysis workbook and verification artifacts were produced.
- Weekly channel analysis and anomaly verification artifacts were produced.

Status: `구축 완료`. Detail: these are one-off deliverables, not scheduled services.

### Earlier Telegram Schedule Design

- A design exists to move report and alert schedules one hour earlier and add a Monday weekly report.
- Current registered task times still use the previous schedule.

Status: `설계` and must not be presented as implemented.

## End-To-End Flowchart

The chart is one component with four stage columns and four horizontal lanes. This avoids crossing connectors and remains readable on mobile.

### Stage Columns

1. `SOURCE`: external APIs, files, Google Sheets, and Telegram input
2. `RAW / HISTORY`: DuckDB source tables, run history, and operation snapshots
3. `MART / SAFE`: joined mart, grain-specific temporary safe views, diffs, and experiment calculations
4. `OUTPUT`: Telegram, A/B Sheets, reports, wikis, and monitoring

### Lane 1: Orders and Events

`Redash query 317 + Airbridge S3 app/web` → `raw_redash_orders + raw_airbridge_events + load_runs` → `mart_airbridge_redash_joined + chat_orders + chat_airbridge_events + chat_joined` → `Data Chatbot + attributed analysis + load monitoring`.

### Lane 2: Paid Media Performance

`Airbridge Actuals + Apple Search Ads + Google Ads + Kakao Moment` → `raw_airbridge_report_costs + raw_apple_search_ads_costs + raw_google_ads_costs + raw_kakao_moment_costs` → grain-specific cost safe views → `ROAS/CPP/CPI reports + Telegram + chatbot`.

`raw_kakao_moment_costs` must be visually marked `구축 완료` with `작업 미등록 · 테이블 미생성`, not operating.

### Lane 3: Channel Operations

`Paid-media management APIs` → `marketing_operation_snapshots` → `operation diff + marketing_operation_changes` → `Telegram changelog + Company Marketing Wiki`.

The output is marked `점검 필요` using the 2026-07-14 observation.

### Lane 4: Experiments and Knowledge

`Google Sheets register + Telegram wiki intake + DuckDB marts` → `A/B daily metrics + raw wiki notes` → `LLM summary/final result + allowlisted wiki context` → `Google Sheets + Telegram + Company Marketing Wiki + Data Chatbot interpretation`.

## Current Database Summary

The observed DuckDB file contains nine base tables:

- `load_runs`
- `marketing_operation_changes`
- `marketing_operation_snapshots`
- `mart_airbridge_redash_joined`
- `raw_airbridge_events`
- `raw_airbridge_report_costs`
- `raw_apple_search_ads_costs`
- `raw_google_ads_costs`
- `raw_redash_orders`

The page may display the count `9` with `2026-07-14 확인`. It must not claim that `raw_kakao_moment_costs` already exists.

The data chatbot defines twelve temporary safe views. The page may display the count `12` as a code capability, not as persisted DuckDB tables.

## Operational Status Rules

Use four explicit text statuses so color is never the only signal:

- `운영 중`: registered or running and last observed result is successful
- `구축 완료`: code and tests exist, but the process is not currently scheduled or running
- `점검 필요`: registered or running with a failed latest observation
- `설계`: approved design exists, but implementation is not complete

Do not use a generic `running` badge for code-only features.

## Static Site Architecture

Keep the existing dependency-free architecture:

- `index.html` owns section order and semantic containers.
- `app.js` owns update records, flowchart lane data, current systems, APIs, bots, schedules, guardrails, tests, and evidence labels.
- `styles.css` owns responsive grid and connector presentation.
- `tests/homepage.test.js` verifies required content, statuses, security exclusions, and flowchart structure.

No Mermaid runtime, chart library, framework, build step, or new dependency is added. The flowchart uses semantic HTML and CSS grid.

## Responsive Behavior

- Desktop: four stage columns per lane with directional connectors.
- Tablet: two columns per row while preserving stage order.
- Mobile: each lane becomes a vertical `SOURCE → RAW → MART/SAFE → OUTPUT` sequence.
- Nodes must use stable grid sizing and wrap long table or job names.
- The chart must not require horizontal scrolling.

## Safety And Accuracy

- Never render API keys, tokens, credentials, account IDs, customer-level values, or environment variable values.
- Remove local absolute paths such as `C:\Users\...` from public evidence cards.
- Use repository-relative evidence labels only.
- Label static observations with their date.
- Do not present planned schedule times, Kakao table creation, or wiki-bot operation as completed.

## Testing

`tests/homepage.test.js` will add checks for:

- The `NEW SINCE 2026-07-01` section and every material update above
- Four flowchart stages and four lanes
- Required DuckDB table names and twelve safe-view capability count
- Status labels `운영 중`, `구축 완료`, `점검 필요`, and `설계`
- Kakao marked as not yet registered instead of operating
- No `C:\Users\` local path in published content
- No API key or token assignment text
- Existing Pretendard and Discord design requirements

Browser verification will cover desktop and mobile widths, text wrapping, connector order, no overlap, no horizontal overflow, and no console errors.

## Acceptance Criteria

- A visitor can identify what changed after 2026-07-01 before reading the legacy system cards.
- A visitor can trace every major data path from source to public-facing output in one flowchart.
- Operating, code-complete, failed, and design-only work are visibly distinct.
- Current DB and scheduler claims match the 2026-07-14 observation.
- The site remains a dependency-free static GitHub Pages deployment.
