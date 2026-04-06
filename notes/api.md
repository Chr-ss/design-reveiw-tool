## Import from Public Endpoint

Importing options from a public JSON endpoint via the `Import from URL` UI button
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

- publicly accessible, no authentication
- returns a JSON with `products` array (`DummyJSON` shape)
- some domain values are calculated or have a creative replacement
- no duplicate detection/protection
- The import flow is for demonstration of external data ingestion and transformation.
