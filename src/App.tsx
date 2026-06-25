import "./App.css";
import { Route, Routes } from "react-router-dom";

import MainPage from "./pages/MainPage";
import AddContactPage from "./pages/AddContactPage";
import EditContact from "./pages/EditContactPage";
import Header from "./components/Header";

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/addContact" element={<AddContactPage />} />
          <Route path="/editContact/:id" element={<EditContact />} />
        </Routes>
      </main>
      <ToastContainer/>
    </>
  );
}

export default App;
