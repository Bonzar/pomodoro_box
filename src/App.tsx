import "the-new-css-reset";
import "./assets/styles/main.global.css";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Main } from "./pages/Main/Main.tsx";
import { Stats } from "./pages/Stats/Stats.tsx";

const MainRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/main");
  }, [navigate]);

  return null;
};

export const App = () => (
  <Routes>
    <Route path="*" element={<MainRedirect />} />
    <Route element={<Layout />}>
      <Route path="/main" element={<Main />} />
      <Route path="/stats" element={<Stats />} />
    </Route>
  </Routes>
);
