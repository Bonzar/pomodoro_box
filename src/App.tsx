import { Link, Route, Routes } from "react-router-dom";
import viteLogo from "./assets/vite.svg";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { ReactCounter } from "./Counter/ReactCounter.tsx";
import { ReduxCounter } from "./Counter/ReduxCounter.tsx";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>
        Vite + <Link to="react">React</Link> + <Link to="redux">Redux</Link>
      </h1>
      <div className="card">
        <Routes>
          <Route path="react" element={<ReactCounter />} />
          <Route path="redux" element={<ReduxCounter />} />
        </Routes>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
