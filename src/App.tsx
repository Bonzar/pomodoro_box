import "the-new-css-reset";
import "./assets/styles/main.global.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Text } from "./components/ui/Text";
import { Indent } from "./components/ui/Indent";
import { Button } from "./components/ui/Button";
import { Layout } from "./components/Layout";
import { useEffect } from "react";

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
      <Route
        path="/main"
        element={
          <>
            <Text as="h1" textSize={24} textWeight={700}>
              Pomodoro timer
            </Text>
            <Indent size={25} />
            <Button btnColor="red">Кнопка</Button>
          </>
        }
      />
      <Route
        path="/stats"
        element={
          <Text as="h1" textSize={24} textWeight={700}>
            Statistic
          </Text>
        }
      />
    </Route>
  </Routes>
);
