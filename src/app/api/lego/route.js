const DEFAULT_API_BASE_URL = "https://lego-api-production-eb421958ee47.herokuapp.com";

const buildApiUrl = (baseUrl, requestUrl) => {
  const incoming = new URL(requestUrl);
  const apiUrl = new URL("/lego/sets/random", baseUrl);
  apiUrl.searchParams.set("persist", "false");

  const theme = incoming.searchParams.get("theme");
  if (theme) {
    apiUrl.searchParams.set("theme", theme);
  }

  return apiUrl;
};

export async function GET(request) {
  const baseUrl = process.env.LEGO_API_BASE_URL || DEFAULT_API_BASE_URL;
  const apiUrl = buildApiUrl(baseUrl, request.url);

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = `LEGO API error (${response.status})`;
      return Response.json({ error: message }, { status: response.status });
    }

    return Response.json(payload, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: "Unable to reach the LEGO API." },
      { status: 502 }
    );
  }
}
