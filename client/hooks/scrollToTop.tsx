"use client";

import { useEffect } from "react";

const ScrollToTop = ({ dependency }: { dependency: any }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [dependency]);
  return null;
};

export default ScrollToTop;
