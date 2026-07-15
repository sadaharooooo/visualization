# Lineage + Operations Homepage Design

## Decision

Apply the approved `B2 · Lineage + Operations` direction to the existing static homepage. Keep Pretendard, the Binance-inspired dark palette, and every verified development record. Add no framework, package, build step, or image dependency.

## Page Order

1. Compact branded header with section navigation and evidence cutoff.
2. Flow-first operating map: sources, dual truth cores, fusion rules, and compact agent rail.
3. Detailed agent cards with core access, input, action, output, status, and observation date.
4. Three explicit Wiki write paths.
5. Two-column operations band replacing generic `AFTER THE FLOW` content:
   - `TODAY`: selected Windows Scheduler jobs in time order, with status.
   - `AGENT REGISTER`: all five agents, core read/write scope, and current status.
6. Existing development updates, system map, API catalog, live bots, full automation timeline, guardrails, tests, and evidence.

## Required Copy

- TODAY role: `Windows Scheduler가 실행하는 핵심 자동화를 시간순으로 보여주고, 점검이 필요한 작업을 빠르게 식별합니다.`
- AGENT REGISTER role: `각 봇과 에이전트가 DuckDB·Wiki를 읽고 쓰는 범위와 현재 운영 상태를 한눈에 요약합니다.`

## Responsive Behavior

- Wide desktop: three-column lineage map and five-column agent details.
- Tablet: lineage lanes stack in source → truth cores → agent order; operations band stacks if needed.
- Mobile: every flow lane, agent detail, TODAY item, and register item becomes one column with no page-level horizontal overflow.

## Accessibility And Accuracy

- Preserve semantic heading order, visible focus states, text status labels, and `prefers-reduced-motion` handling.
- Do not use color as the only status indicator.
- Keep all operational observations tied to the `2026-07-14 확인` cutoff.
- Do not publish secrets, local paths, credentials, or customer-level raw values.

## Acceptance Criteria

- A visitor can trace source → DuckDB/Wiki → agent in the first operating section.
- TODAY and AGENT REGISTER each explain their role before listing items.
- The five agent records remain complete and operational claims remain accurate.
- Existing detailed sections and automated content checks remain available.
- Desktop, 1280px tablet, and 390px mobile screenshots have no overlap or horizontal clipping.
