# documentation

**Status:** Runnable scaffold (ERPNext password login)  
**Kind:** Next.js  
**Backend:** `OpenAPI + static`  
**Package:** `@zatgo/documentation`  
**Stack:** [FRONTEND_STACK](../../Docs/Foundation/FRONTEND_STACK.md)

## Auth

Sign in with ERPNext / Frappe **site URL + email/password**. Login runs on the Next.js server (`/api/erpnext/*`) via `@zatgo/erpnext` and stores an encrypted httpOnly cookie.

Set `ERPNEXT_SESSION_SECRET` in production (required). For local dev, copy `.env.example` to `.env.local` and either set a secret or `ALLOW_INSECURE_DEV_SECRETS=1`. Use **Continue offline** to browse without a site.

## Run

```bash
pnpm install
pnpm --filter @zatgo/documentation dev
# → http://localhost:3007
```

## OpenAPI

After regenerating specs:

```bash
python3 scripts/generate_openapi.py
pnpm --filter @zatgo/documentation dev
# → http://localhost:3007/swagger
# → http://localhost:3007/redoc
```

Static fallbacks: `SharedSDK/docs/swagger.html`, `SharedSDK/docs/redoc.html`.
