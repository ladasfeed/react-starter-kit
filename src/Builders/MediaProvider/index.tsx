import React, { ReactNode, useContext, useEffect, useState } from "react";

export function MediaProviderFactory<T extends string>({
  mediaResolver,
  debounce = 600,
}: {
  mediaResolver: (w: number) => T;
  debounce?: number;
}) {
  const MediaContext = React.createContext<{
    width: number;
    media: T | null;
  }>({
    width: window.innerWidth,
    media: null,
  });

  const useMediaContext = () => useContext(MediaContext);

  let timeoutId = 0;
  function MediaProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState<{
      width: number;
      media: T | null;
    }>({
      width: window.innerWidth,
      media: mediaResolver(window.innerWidth),
    });

    useEffect(() => {
      window.addEventListener("resize", () => {
        clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
          setValue({
            width: window.innerWidth,
            media: mediaResolver(window.innerWidth),
          });
        }, debounce);
      });
    }, []);

    return (
      <MediaContext.Provider value={value}>{children}</MediaContext.Provider>
    );
  }

  return {
    useMediaContext,
    MediaProvider,
  };
}
