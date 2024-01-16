import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";

function App() {
  return (
    <>
      <Router>
        <Header />
        <AppBody>
          <Sidebar />
          <Routes>
            <Route element={<Chat/>} path="/"  />
          </Routes>
        </AppBody>
      </Router>
    </>
  );
}
export default App;
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
