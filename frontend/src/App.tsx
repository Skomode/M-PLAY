import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import PlayerBar from "./components/PlayerBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerBar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
