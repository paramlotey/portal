"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsInitialLoad(false);
          setFadeOut(false);
        }, 800);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad && pathname !== prevPathname) {
      setIsLoading(true);
      setFadeOut(false);

      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setIsLoading(false);
          setFadeOut(false);
        }, 800);
      }, 1500);

      setPrevPathname(pathname);
      return () => clearTimeout(timer);
    }
  }, [pathname, isInitialLoad, prevPathname]);

  // Prevent body scroll and hide scrollbar when loader is active
  useEffect(() => {
    if (isLoading || isInitialLoad) {
      // Store original styles
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;
      
      // Get scrollbar width
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Apply styles to prevent layout shift
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isLoading, isInitialLoad]);

  if (!isLoading && !isInitialLoad) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Left Half */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 transition-transform duration-700 ease-in-out ${
          fadeOut ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <video
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover object-right"
        >
          <source src="/images/1.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Right Half */}
      <div
        className={`absolute inset-y-0 right-0 w-1/2 transition-transform duration-700 ease-in-out ${
          fadeOut ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <video
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-full object-cover object-left"
        >
          <source src="/images/2.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}