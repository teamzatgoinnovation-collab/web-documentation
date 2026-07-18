"use client";

import { useEffect } from "react";

/**
 * Redoc for the combined OpenAPI 3.1 spec.
 */
export default function RedocPage() {
  useEffect(() => {
    const containerId = "zatgo-redoc-root";
    let cancelled = false;

    void (async () => {
      await new Promise<void>((resolve, reject) => {
        if ((window as unknown as { Redoc?: unknown }).Redoc) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Redoc"));
        document.body.appendChild(script);
      });
      if (cancelled) return;
      const Redoc = (
        window as unknown as {
          Redoc: { init: (url: string, opts: object, el: HTMLElement | null) => void };
        }
      ).Redoc;
      Redoc.init("/openapi/openapi.yaml", {}, document.getElementById(containerId));
    })().catch((err) => {
      const el = document.getElementById(containerId);
      if (el) el.textContent = err instanceof Error ? err.message : "Redoc failed to load";
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Redoc</h1>
        <p className="text-sm text-[var(--color-muted-foreground)]">
          Readable reference for <code className="rounded bg-[var(--color-muted)] px-1">/openapi/openapi.yaml</code>.
        </p>
      </div>
      <div id="zatgo-redoc-root" className="min-h-[70vh] overflow-auto rounded-[var(--radius-lg)] bg-white" />
    </div>
  );
}
