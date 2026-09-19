# Phase 09 — Headless Commerce & Composable

B2B/B2C headless commerce, Commerce Cloud APIs, and composable storefronts.

## Commerce in Headless 360

Commerce Cloud exposes B2B and B2C commerce via standard product/cart/checkout
resources. **Headless storefronts call those APIs** instead of the server-rendered
Storefront Reference Architecture (SFRA) pages.

> Composable means assemble commerce from APIs — **catalog, cart, pricing,
> promotions as separate services** you compose. No monolithic page stack.

## Key Resources

| Area | API/Resource | Notes |
|---|---|---|
| Catalog / products | GET /products, /categories | Paged, filtered |
| Cart | /*/carts operations | Session-scoped |
| Checkout | /*/checkout | Orchestrates payment |
| Promotions | promotions list | Apply at cart |
| Shopper | shopper resources | AuthNZ for the shopper |

Know the difference:

- **Hosted checkout** — the payment page stays on Commerce Cloud.
- **Headless checkout** — you call payment service provider APIs yourself (more
  control, more PCI scope).

## Cart Lifecycle in the APIs

```text
GET  /products                    -> product list for the storefront
POST /carts                       -> create a session-scoped cart
POST /carts/<id>/items            -> add items (pricebook entries)
GET  /carts/<id>                  -> current totals
POST /carts/<id>/checkout         -> begin checkout orchestration
```

The cart resource maintains a **shopper session** across add/update/checkout.

## Exercise — List & Cart in React

A tiny React client that lists products and adds one to a cart via the Commerce
APIs:

- `GET /products` to seed the list
- `POST` to create a cart
- Add an item with a pricebook entry
- Render cart total from the response

Verify: the cart total reflects the added item; APIs are called from the client
with a Bearer token.

## Repo Artifacts to Open

- `force-app/main/default/classes/CommerceService.cls` — commerce API caller
- `docs/assets/answers.js` — `C9EX1` model answer (storefront snippet)