import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export const AppToaster = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const lightModePreference = window.matchMedia(
      "(prefers-color-scheme: light)"
    );
    const darkModePreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    if (darkModePreference.matches) {
      setTheme("dark");
    }

    const handleLightThemeActive = (e: MediaQueryListEvent) => {
      e.matches && setTheme("light");
    };
    const handleDarkThemeActive = (e: MediaQueryListEvent) => {
      e.matches && setTheme("dark");
    };

    darkModePreference.addEventListener("change", handleDarkThemeActive);
    lightModePreference.addEventListener("change", handleLightThemeActive);

    return () => {
      darkModePreference.removeEventListener("change", handleDarkThemeActive);
      lightModePreference.removeEventListener("change", handleLightThemeActive);
    };
  }, []);

  return <Toaster richColors closeButton={true} theme={theme} />;
};
