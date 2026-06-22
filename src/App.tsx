import "./App.css";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import AddContactPage from "./pages/AddContactPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/addContact" element={<AddContactPage />} />
      Ro
    </Routes>
  );
}

export default App;
