"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Split the chat into its own chunk and keep it off the critical path.
const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

/**
 * Mounts the chat widget only after the page has loaded AND the main thread
 * is idle, so its JS never competes with hydration on slow mobile CPUs. The
 * launcher fades in a beat later; nothing above the fold depends on it.
 */
export default function DeferredChat() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      if ("requestIdleCallback" in window) {
        idleId = requestIdleCallback(() => setReady(true), { timeout: 2500 });
      } else {
        timerId = setTimeout(() => setReady(true), 1200);
      }
    };

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }

    return () => {
      window.removeEventListener("load", start);
      if (idleId !== undefined && "cancelIdleCallback" in window) cancelIdleCallback(idleId);
      clearTimeout(timerId);
    };
  }, []);

  return ready ? <ChatWidget /> : null;
}
