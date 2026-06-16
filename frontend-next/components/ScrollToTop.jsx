"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Resets the window scroll position to the top on every route change.
// Hash-anchor scrolls (e.g. /#about) are handled separately by the destination
// page itself (Landing.jsx) so we skip those here.
export const ScrollToTop = () => {
    const pathname = usePathname();
    const hash = typeof window !== "undefined" ? window.location.hash : "";

    useEffect(() => {
        if (hash) return;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }, [pathname, hash]);

    return null;
};

export default ScrollToTop;