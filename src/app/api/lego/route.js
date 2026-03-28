const DEFAULT_API_BASE_URL = "https://lego-api-production.herokuapp.com";

const buildApiUrl = (baseUrl) => {
  const apiUrl = new URL("/lego/sets/random", baseUrl);
  apiUrl.searchParams.set("persist", "false");
  return apiUrl;
};

export async function GET() {
  const baseUrl = process.env.LEGO_API_BASE_URL || DEFAULT_API_BASE_URL;
  const apiUrl = buildApiUrl(baseUrl);

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
