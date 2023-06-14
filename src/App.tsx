import "the-new-css-reset";
import "./assets/styles/main.global.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Main } from "./pages/Main";
import { Stats } from "./pages/Stats";
import { Settings } from "./pages/Settings";
import { Page } from "./components/ui/Page";

const MainRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, [navigate]);

  return null;
};

export const App = () => (
  <Routes>
    <Route path="*" element={<MainRedirect />} />
    <Route path="/" element={<Layout />}>
      <Route element={<Page />}>
        <Route index element={<Main />} />
      </Route>
      <Route element={<Page />}>
        <Route path="/stats" element={<Stats />} />
      </Route>
      <Route element={<Page />}>
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Route>
  </Routes>
);
