"use client";

import { useEffect, useState } from "react";

function formatUtc(date: Date) {
  return date.toISOString().slice(11, 19);
}

export function UtcClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(formatUtc(new Date()));
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  return <time suppressHydrationWarning>UTC {time}</time>;
}
