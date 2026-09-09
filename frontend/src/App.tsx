
import { BrowserRouter, Route, Routes } from "react-router";
import PlayerBar from "./components/PlayerBar";
import Auth from "./views/Auth";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerBar />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
