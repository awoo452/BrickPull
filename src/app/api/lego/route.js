const DEFAULT_API_BASE_URL = "https://rebrickable.com/api/v3/lego";
const DEFAULT_PAGE_SIZE = 100;

const buildHeaders = () => {
  const apiKey = process.env.REBRICKABLE_API_KEY;
  if (!apiKey) {
    return null;
  }

  return {
    Accept: "application/json",
    Authorization: `key ${apiKey}`,
  };
};

const fetchJson = async (url, headers) => {
  const response = await fetch(url, { headers, cache: "no-store" });
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
};

const pickRandom = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }
  return items[Math.floor(Math.random() * items.length)];
};

export async function GET(request) {
  const baseUrl = process.env.REBRICKABLE_API_BASE_URL || DEFAULT_API_BASE_URL;
  const headers = buildHeaders();

  if (!headers) {
    return Response.json(
      { error: "Missing REBRICKABLE_API_KEY." },
      { status: 500 }
    );
  }

  try {
    const countUrl = new URL("/sets/", baseUrl);
    countUrl.searchParams.set("page", "1");
    countUrl.searchParams.set("page_size", "1");

    const countResult = await fetchJson(countUrl, headers);
    if (!countResult.response.ok) {
      return Response.json(
        { error: `Rebrickable error (${countResult.response.status})` },
        { status: countResult.response.status }
      );
    }

    const totalCount = Number(countResult.payload?.count || 0);
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / DEFAULT_PAGE_SIZE) : 1;
    const page = Math.floor(Math.random() * Math.min(totalPages, 1000)) + 1;

    const listUrl = new URL("/sets/", baseUrl);
    listUrl.searchParams.set("page", String(page));
    listUrl.searchParams.set("page_size", String(DEFAULT_PAGE_SIZE));

    const listResult = await fetchJson(listUrl, headers);
    if (!listResult.response.ok) {
      return Response.json(
        { error: `Rebrickable error (${listResult.response.status})` },
        { status: listResult.response.status }
      );
    }

    const selected = pickRandom(listResult.payload?.results);
    if (!selected || !selected.set_num) {
      return Response.json({ error: "No LEGO sets returned." }, { status: 502 });
    }

    const detailUrl = new URL(`/sets/${selected.set_num}/`, baseUrl);
    const detailResult = await fetchJson(detailUrl, headers);
    if (!detailResult.response.ok) {
      return Response.json(
        { error: `Rebrickable error (${detailResult.response.status})` },
        { status: detailResult.response.status }
      );
    }

    const raw = detailResult.payload || selected;
    const normalized = {
      name: raw?.name || selected?.name || null,
      external_id: raw?.set_num || selected?.set_num || null,
      theme: raw?.theme_name || raw?.theme || raw?.theme_id || null,
      num_parts: raw?.num_parts || selected?.num_parts || null,
      image_url: raw?.set_img_url || raw?.image_url || raw?.image || null,
    };

    return Response.json(
      {
        ...normalized,
        raw,
        metadata: {
          page,
          page_size: DEFAULT_PAGE_SIZE,
          total_count: totalCount,
          upstream_status: detailResult.response.status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { error: "Unable to reach Rebrickable." },
      { status: 502 }
    );
  }
}
