import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { App } from "./App.tsx";
import { Toaster } from "sonner";

const { persistor, store } = createStore();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="pomodoro_box">
          <Toaster />
          <App />
        </BrowserRouter>
      </PersistGate>
    </ReduxProvider>
  </StrictMode>
);
