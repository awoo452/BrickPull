# BrickPull (Next.js)

A tiny Next.js app that pulls a random LEGO set from your Rails LEGO API.

## Local Dev

1. From this folder, install dependencies if needed:

```bash
npm install
```

2. (Optional) Point to a custom LEGO API base URL:

```bash
export LEGO_API_BASE_URL="https://lego-api-production-eb421958ee47.herokuapp.com"
```

3. Run the dev server:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## API Proxy

The UI calls `GET /api/lego`, which proxies to:

```
${LEGO_API_BASE_URL}/lego/sets/random?persist=false
```

The Rails API handles the Rebrickable call and returns the set payload.

## UI Features

- One-button random set pulls.
- Loading skeletons.
- Clean error state when the API is unreachable.

## Deploy (AWS Amplify)

- Create a new Amplify Hosting app from this repo.
- Set the app root to `aws-amplify/BrickPull`.
- Amplify should auto-detect Next.js.
- Add the environment variable `LEGO_API_BASE_URL` if you want a non-default host.

If you want me to verify the latest Amplify UI steps, tell me and I will confirm against current docs.
