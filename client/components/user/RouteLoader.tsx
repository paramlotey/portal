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

  if (!isLoading && !isInitialLoad) return null;

  return (
    <div>
      {/* Left Half */}
      <div
        className={`fixed inset-y-0 left-0 w-1/2 z-50  transition-transform duration-700 ease-in-out ${
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
        className={`fixed inset-y-0 right-0 w-1/2 z-50 transition-transform duration-700 ease-in-out ${
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