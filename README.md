# design-reveiw-tool

...

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- tRPC
- Prisma with SQLite
- Docker / Docker Compose

## Requirements

- Docker Engine + Compose

## Run

1. Build and start the app:
	- `docker compose up --build`
2. Open http://localhost:3000






## Import from Public Endpoint

importing options from a public JSON endpoint via the `Import from URL` button
- Default endpoint: `https://dummyjson.com/products/category/home-decoration`

### Mapping to local model

- `title` -> `name` (truncated to 80 chars)
- `description` -> `description`
- `thumbnail` -> `imageUrl`
- `price` -> `cost` using `Math.round(price)`
- `rating` (0..5) -> `daylightScore` normalized to `0..1` and rounded to 2 decimals
- `dimensions.width * dimensions.depth` -> `area` (rounded to 2 decimals, fallback `0`)
- `weight * 2.3` (fallback: `area * 0.8`) -> `embodiedCarbon` (rounded to 2 decimals)
- `tags[]` -> `tags` as comma-separated string (fallback: `imported`)
- `id` and optional `stock` -> `notes`

### Assumptions

- publicly access, no authentication
- returns a json with `products` array (`DummyJSON` shape)
- some domain values are calculated or have a creative replacement
- no duplicate detection/protection
- The import flow is for demonstration of external data ingestion and transformation.
