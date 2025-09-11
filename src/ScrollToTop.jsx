import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop({ smooth = true }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If the URL has a hash (#section), try to scroll to that element
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
        return;
      }
    }
    // Otherwise, go to the top
    window.scrollTo({ top: 0, left: 0, behavior: smooth ? "smooth" : "auto" });
  }, [pathname, hash, smooth]);

  return null;
}
