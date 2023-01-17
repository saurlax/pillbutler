import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Me from "./pages/Me";
import Settings from "./pages/Settings";
import About from "./pages/About";
import EditPill from "./pages/EditPill";
import SubLayout from "./components/SubLayout";
import Login from "./pages/Login";
import AddAlarm from "./pages/AddAlarm";
import AddBox from "./pages/AddBox";
import Manage from "./pages/Manage";
import Shop from "./pages/Shop";
import Statistics from "./pages/Statistics";
import FindBox from "./pages/FindBox";
import Add from "./pages/Add";
import Discover from "./pages/Discover";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="me" element={<Me />} />
          <Route path="add" element={<Add />} />
          <Route path="shop" element={<Shop />} />
          <Route path="findbox" element={<FindBox />} />
          <Route path="discover" element={<Discover />} />
          <Route path="manage/:id" element={<Manage />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
        <Route path="/" element={<SubLayout />}>
          <Route path="about" element={<About />} />
          <Route path="editpill/:id/:index" element={<EditPill />} />
          <Route path="addalarm/:id/:index" element={<AddAlarm />} />
          <Route path="settings/:id" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="manage/new" element={<AddBox />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;