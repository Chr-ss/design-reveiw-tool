# design-review-tool: "StudioLens"

Small demo project to compare and review designs.

## Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- tRPC
- Prisma with SQLite
- Storybook
- Docker / Docker Compose




## Run
### Requirements
- Docker Engine + Compose

### Build and run
1. Run `docker compose up --build`
2. Open http://localhost:3000



## Implementation Notes and Decisions

- How to run the project locally:
	[Run](#run)

- Stack chosen and why:
	[Stack](#stack), [Plan](notes/plan.md)

- Data model approach:
	[Plan: Data](notes/plan.md#data), [Trade-off: Data](notes/trade-off.md#data)

- Key decisions made:
	[Plan](notes/plan.md)

- Trade-offs or shortcuts:
	[Trade-off](notes/trade-off.md)

- What I would improve with more time:
	- Better comparison UX
	- Scalable data browsing and filtering
	- Import, edit, and ranking workflows
	- Expand documented trade-offs
	- Tests and production-grade persistence


## Explanation of your thinking

**How you understood the problem:**
I saw this as an overview/decision-support tool to demo my skills.

**What you chose to prioritize:**
I focused on a functional prototype with scalable frontend and accepted trade-offs in UI/UX polish and infrastructure complexity to finish in reasonable time with easy local deployment.

**How you balanced product thinking, code quality, and time:**
I focused on functionality with reusable components that could scale, and used AI tools to help me move faster when possible.

**How you handled importing and mapping external data:**
I used a single public DummyJSON endpoint and mapped the most fitting data to my model.
