"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

const buildApiPath = ({ themeKey }) => {
  const params = new URLSearchParams();
  if (themeKey && themeKey !== "all") {
    params.set("theme", themeKey);
  }

  const query = params.toString();
  return query ? `/api/lego?${query}` : "/api/lego";
};

export default function Home() {
  const [legoSet, setLegoSet] = useState(null);
  const [history, setHistory] = useState([]);
  const [themeKey, setThemeKey] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const themeOptions = useMemo(
    () => [
      { key: "all", label: "All" },
      { key: "city", label: "City" },
      { key: "minecraft", label: "Minecraft" },
      { key: "creator", label: "Creator" },
    ],
    []
  );

  const hintText =
    themeKey === "all"
      ? "Theme: All sets."
      : `Theme: ${themeOptions.find((option) => option.key === themeKey)?.label || "Custom"}.`;

  const fetchSet = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(buildApiPath({ themeKey }), { cache: "no-store" });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = payload?.error || `Request failed (${response.status})`;
        throw new Error(message);
      }

      setLegoSet(payload);
      const entry = {
        id: payload?.external_id || "N/A",
        name: payload?.name || "Unknown",
        theme: payload?.theme || "N/A",
      };
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.id !== entry.id);
        return [entry, ...filtered].slice(0, 3);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const imageUrl = legoSet?.image_url || legoSet?.raw?.set_img_url || null;
  const setName = legoSet?.name || "Unknown";
  const setId = legoSet?.external_id || "N/A";
  const theme = legoSet?.theme || "N/A";
  const numParts = legoSet?.num_parts ?? "N/A";
  const isRateLimited = error.includes("429");

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <header className={styles.header}>
          <p className={styles.kicker}>BrickPull</p>
          <h1>One button. One random LEGO set.</h1>
          <p className={styles.subtitle}>
            One-button random LEGO set pulls from the Rails LEGO API.
          </p>
        </header>

        <section className={styles.controls}>
          <div className={styles.controlsRow}>
            <button
              className={styles.cta}
              type="button"
              onClick={fetchSet}
              disabled={loading}
            >
              {loading ? "Fetching..." : "Fetch a LEGO set"}
            </button>
            <label className={styles.selectWrap}>
              <span className={styles.selectLabel}>Theme</span>
              <select
                className={styles.select}
                value={themeKey}
                onChange={(event) => setThemeKey(event.target.value)}
              >
                {themeOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className={styles.hint}>{hintText}</p>
        </section>

        <section className={styles.results}>
          {error ? (
            <div className={styles.errorCard}>
              <p className={styles.errorTitle}>Couldn't reach the API.</p>
              <p className={styles.error}>{error}</p>
              {isRateLimited ? (
                <p className={styles.errorHint}>
                  Rate limit hit. Wait a minute and try again.
                </p>
              ) : null}
              <p className={styles.errorHint}>Use the button above to retry.</p>
            </div>
          ) : null}

          {loading && !legoSet ? (
            <div className={styles.skeletonCard} aria-hidden="true">
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonRow}>
                <div className={styles.skeletonBlock} />
                <div className={styles.skeletonBlock} />
                <div className={styles.skeletonBlock} />
              </div>
              <div className={styles.skeletonImage} />
            </div>
          ) : null}

          {legoSet ? (
            <div className={styles.legoCard}>
              <div className={styles.legoHeader}>
                <div>
                  <p className={styles.label}>Set name</p>
                  <h2 className={styles.name}>{setName}</h2>
                </div>
                <div className={styles.badge}>{setId}</div>
              </div>

              <div className={styles.detailGrid}>
                <div>
                  <p className={styles.label}>Theme</p>
                  <p className={styles.value}>{theme}</p>
                </div>
                <div>
                  <p className={styles.label}>Pieces</p>
                  <p className={styles.value}>{numParts}</p>
                </div>
                <div>
                  <p className={styles.label}>External ID</p>
                  <p className={styles.value}>{setId}</p>
                </div>
              </div>

              <div className={styles.imageWrap}>
                {imageUrl ? (
                  <img src={imageUrl} alt={setName} loading="lazy" />
                ) : (
                  <p className={styles.muted}>No image available.</p>
                )}
              </div>
            </div>
          ) : null}

          {!legoSet && !loading && !error ? (
            <p className={styles.empty}>Tap the button to see your first set.</p>
          ) : null}

          <div className={styles.history}>
            <p className={styles.historyLabel}>Recent pulls</p>
            <div className={styles.historyRow}>
              {history.length
                ? history.map((entry) => (
                    <div key={`${entry.id}-${entry.name}`} className={styles.historyChip}>
                      <span className={styles.historyId}>{entry.id}</span>
                      <span className={styles.historyName}>{entry.name}</span>
                      <span className={styles.historyTheme}>{entry.theme}</span>
                    </div>
                  ))
                : "No history yet."}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
