# Binance Dual-Core Homepage Design

## Goal

Redesign the existing public static homepage with the approved V7 Binance-style visual system and replace the current flow section with one readable operating map centered on DuckDB and the Wikis.

The page must let a visitor answer four questions without reading source code:

1. Where does each input come from?
2. What is stored in DuckDB and what is stored in the Wikis?
3. Which bots and agents read or write each core?
4. Where are results delivered, and what is actually operating?

## Approved Direction

Use the approved V7 `Structured Truth + Context Truth` layout.

- DuckDB and Wiki are equal central operating cores.
- DuckDB is the numeric and execution-state source of truth.
- Wiki is the context, decision, and learning source of truth.
- Numeric conflicts are resolved in favor of DuckDB; Wiki supplies explanation only.
- The flowchart uses real source, table, view, bot, schedule, and delivery names.
- The existing dependency-free GitHub Pages architecture remains.

## Visual System

Apply the supplied `DESIGN-binance.md` direction across the homepage.

- Canvas: `#0b0e11`
- Standard surface: `#1e2329`
- Elevated surface: `#2b3139`
- Primary yellow: `#fcd535`
- Active yellow: `#f0b90b`
- Main text: `#eaecef`
- Muted text: `#929aa5`
- Operating status: `#0ecb81`
- Warning or failed status: `#f6465d`
- Typography: Pretendard
- Flat surfaces, one-pixel borders, no gradients, and radii from 4px to 8px

Yellow communicates structure, selected paths, core relationships, and key mappings. Green and red are reserved for operational status.

## Page Structure

Retain the existing information architecture while restyling it:

1. Hero and current-state summary
2. Development updates since 2026-07-01
3. Dual-core end-to-end operating map
4. Current systems and APIs
5. Bots and scheduled automations
6. Guardrails, tests, and evidence

The flowchart is the primary page section and receives the largest content width.

## Dual-Core Flowchart

### Section 1: Common Input To Two Cores

The first row reads left to right:

`STEP 01 common input -> STEP 02 collection and recording -> CORE A DuckDB + CORE B Wiki -> STEP 04 fusion rules`

#### Step 01: Where Data Comes From

Restore the detailed V5 source explanations and add explicit destination labels.

| Source | Incoming data | Destination |
| --- | --- | --- |
| Redash query 317 | order number, amount, revenue, and `order_key` | DuckDB |
| Airbridge S3 app/web | acquisition channel, app/web events, and `Transaction ID` | DuckDB |
| Airbridge Actuals Cost API | channel, campaign, ad group, creative, search-term cost, purchases, and revenue | DuckDB |
| Google Ads and Apple Search Ads | media cost, impressions, and clicks | DuckDB |
| Seven advertising management APIs | campaign, ad group, creative, keyword, name, state, budget, schedule, and bidding | DuckDB operation history |
| Google Sheets A/B register | experiment period, campaign target, and variant mapping | Agent execution and Wiki learning |
| Telegram human updates | product and marketing updates, analysis questions, channel changes, and Wiki source text | Agent request and Wiki |

Each source row must show both a friendly description and a short destination chip.

#### Step 02: Collection And Recording

- Windows Task Scheduler runs loaders, analysis jobs, and monitoring between 06:00 and 10:00.
- Telegram bot intake receives questions, A/B commands, and Wiki update requests.
- Agents record A/B results and channel-operation changes in structured form.

#### Core A: DuckDB Structured Truth

Show the nine observed base tables grouped by purpose:

- Orders and events: `raw_redash_orders`, `raw_airbridge_events`
- Advertising cost: `raw_airbridge_report_costs`, `raw_google_ads_costs`, `raw_apple_search_ads_costs`
- Operation history: `marketing_operation_snapshots`, `marketing_operation_changes`
- Mart and run state: `mart_airbridge_redash_joined`, `load_runs`

Highlight `Airbridge Transaction ID <-> Redash order_key` as the main mapping. Show the twelve temporary `chat_*` safe views as the analysis access layer, not persisted base tables.

#### Core B: Wiki Context Truth

Give this core the same size and visual weight as DuckDB.

- Company Marketing Wiki: marketing facts, metric definitions, decisions, reports, A/B learnings, channel changes, and product updates
- Market Intelligence Wiki: market, competitor, regulation, channel, and strategy research
- Personal LLM Wiki: project structure, data assets, automation operations, and seed documents
- Raw source notes remain separate from interpreted pages.
- Customer-level raw values, credentials, and tokens are excluded.

#### Step 04: Fusion Rules

- Numeric questions use DuckDB SQL results.
- Reason and background questions use allowlisted Wiki context.
- OpenAI Responses API combines the two sources while preserving their roles.
- Wiki context never overrides DuckDB numbers.

### Section 2: Bot And Agent Activity

Use five cards connected to the shared dual-core rail. Every card contains core usage chips, input, action, output, and status.

| Agent | Core relationship | Main result |
| --- | --- | --- |
| Data Chat Bot | DuckDB read + Wiki read | Telegram answers combining numbers and context |
| A/B Daily Agent | DuckDB read + Wiki write | daily metrics, Sheets updates, Telegram results, Wiki learning |
| Channel Operation Agent | DuckDB write + Wiki write | snapshots, changes, Wiki changelog, Telegram alert |
| Wiki Update Bot | Wiki write | raw source note and interpreted Company/Market pages |
| Monitor + Report | DuckDB read + optional Wiki read | load alerts and daily Telegram report |

Do not describe code-only capability as operating. Preserve these verified statuses:

- Data Chat and registered daily pipelines: operating
- Channel Operation 09:20 task: needs inspection after the 2026-07-14 non-zero result
- Kakao Moment: code complete, task unregistered, table absent
- Wiki Update Bot: code complete, not running or scheduled

### Section 3: Wiki Writing Paths

Show three explicit write paths below the agent row:

- A/B Daily Agent -> Company Wiki experiment events and learnings
- Channel Operation Agent -> Company Wiki channel changelog
- Wiki Update Bot -> raw source note plus interpreted Company/Market pages after secret check, preview, and confirmation

## Implementation Boundaries

Keep the existing files and responsibilities:

- `index.html`: semantic section containers and headings
- `app.js`: content records and flowchart data rendered into HTML
- `styles.css`: Binance visual system and responsive layout
- `tests/homepage.test.js`: content, structure, safety, and styling assertions

Do not add a framework, chart library, Mermaid runtime, build step, or package dependency. Use semantic HTML, existing JavaScript rendering, and CSS grid.

## Responsive Behavior

- Wide desktop: show the complete left-to-right common flow and five agent cards.
- Tablet: wrap the common flow into ordered rows without changing step order.
- Mobile: stack Step 01, Step 02, the two cores, fusion rules, and agent cards vertically.
- Long table and task names wrap inside their containers.
- The published page must have no clipped text, incoherent overlap, or page-level horizontal overflow.

## Safety And Accuracy

- Never render secrets, credentials, tokens, account IDs, customer-level raw values, or environment variable values.
- Never publish local absolute paths such as `C:\Users\...`.
- Label static operational observations with `2026-07-14 확인`.
- Do not claim the Kakao table or Wiki bot schedule exists.
- Do not use color as the only status indicator.

## Testing And Verification

Update tests first, confirm they fail against the current Discord design, then implement the minimum changes needed to pass.

Automated checks must verify:

- Binance color tokens and Pretendard are present, while Discord gradients and oversized radii are absent.
- DuckDB and Wiki appear as equal named cores.
- All seven Step 01 sources and their destinations are present.
- All nine DuckDB tables, the key mapping, and twelve safe views are present.
- All three Wikis, fusion rules, five agent cards, and three Wiki write paths are present.
- Operating, code-complete, needs-inspection, and design-only statuses remain explicit.
- No secret assignment or local path appears in public content.

Browser verification covers desktop and mobile layouts, text wrapping, connector order, no overlap, no horizontal overflow, and no console errors.

## Acceptance Criteria

- A visitor can trace each common input to DuckDB, Wiki, or an agent.
- DuckDB and Wiki are visibly equal but have clearly different responsibilities.
- Every bot or agent shows which core it reads or writes and what it delivers.
- The site matches the approved Binance visual direction and V7 layout.
- Operational claims remain faithful to the 2026-07-14 evidence cutoff.
- The site remains a dependency-free static GitHub Pages deployment.
