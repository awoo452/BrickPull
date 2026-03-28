"use client";

import { useState } from "react";
import styles from "./page.module.css";

const buildApiPath = () => "/api/lego";

export default function Home() {
  const [legoSet, setLegoSet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSet = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(buildApiPath(), { cache: "no-store" });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = payload?.error || `Request failed (${response.status})`;
        throw new Error(message);
      }

      setLegoSet(payload);
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

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <header className={styles.header}>
          <p className={styles.kicker}>BrickPull</p>
          <h1>One button. One random LEGO set.</h1>
          <p className={styles.subtitle}>
            One-button random LEGO set pulls from Rebrickable. Server-side proxy
            keeps your API key safe.
          </p>
        </header>

        <section className={styles.controls}>
          <button
            className={styles.cta}
            type="button"
            onClick={fetchSet}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch a LEGO set"}
          </button>
          <p className={styles.hint}>Random set per request.</p>
        </section>

        <section className={styles.results}>
          {error ? (
            <div className={styles.errorCard}>
              <p className={styles.errorTitle}>Couldn't reach the API.</p>
              <p className={styles.error}>{error}</p>
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
        </section>
      </main>
    </div>
  );
}
