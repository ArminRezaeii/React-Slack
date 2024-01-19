import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/Chat/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Loading/Login";

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Routes>
                <Route element={<Chat />} path="/" />
              </Routes>
            </AppBody>
          </>
        )}
      </Router>
    </>
  );
}
export default App;
const AppBody = styled.div`
  display: flex;
  height: 100vh;

 
`;
