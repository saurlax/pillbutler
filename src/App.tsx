// @ts-nocheck
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./screens/Home";
import Me from "./screens/Me";
import Settings from "./screens/Settings";
import About from "./screens/About";
import EditPill from "./screens/EditPill";
import SubLayout from "./components/SubLayout";
import Login from "./screens/Login";
import AddAlarm from "./screens/AddAlarm";
import AddBox from "./screens/AddBox";
import Manage from "./screens/Manage";
import Statistics from "./screens/Statistics";
import AddPill from "./screens/AddPill";
import Discover from "./screens/Discover";
import E404 from "./screens/E404";
import AddPillByScan from "./screens/AddPillByScan";
import Post from "./screens/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="me" element={<Me />} />
          <Route path="addpill" element={<AddPill />} />
          <Route path="discover" element={<Discover />} />
          <Route path="manage/:id" element={<Manage />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
        <Route path="/" element={<SubLayout />}>
          <Route path="about" element={<About />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="addpillbyscan" element={<AddPillByScan />} />
          <Route path="editpill/:id/:index" element={<EditPill />} />
          <Route path="addalarm/:id/:index" element={<AddAlarm />} />
          <Route path="settings/:id" element={<Settings />} />
          <Route path="login" element={<Login />} />
          <Route path="manage/new" element={<AddBox />} />
        </Route>
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
