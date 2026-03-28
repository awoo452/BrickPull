# BrickPull (Next.js)

A tiny Next.js app that pulls a random LEGO set from the Rebrickable API.

## Local Dev

1. From this folder, install dependencies if needed:

```bash
npm install
```

2. Set the Rebrickable API key (required):

```bash
export REBRICKABLE_API_KEY="your_key_here"
```

3. (Optional) Point to a custom Rebrickable base URL:

```bash
export REBRICKABLE_API_BASE_URL="https://rebrickable.com/api/v3/lego"
```

4. Run the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## API Proxy

The UI calls `GET /api/lego`, which proxies to:

```
${REBRICKABLE_API_BASE_URL}/sets/
```

The server picks a random set and returns a normalized payload.

## UI Features

- One-button random set pulls.
- Loading skeletons.
- Clean error state when the API is unreachable.

## Deploy (AWS Amplify)

- Create a new Amplify Hosting app from this repo.
- Set the app root to `aws-amplify/BrickPull`.
- Amplify should auto-detect Next.js.
- Add the environment variable `REBRICKABLE_API_KEY`.
- Optionally add `REBRICKABLE_API_BASE_URL` if you want a non-default host.

If you want me to verify the latest Amplify UI steps, tell me and I will confirm against current docs.
