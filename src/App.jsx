import { createContext, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { MainRoutes } from "./pages/MainRoutes";
import { Navbar as UserNavbar } from "./components/User Dashboard/UserNavbar";
import Footer from "./components/Footer/Footer";

export const GlobalContext = createContext();
function App() {
  const [log, setLog] = useState(false);

  const handleLog = (isLoggedIn) => {
    setLog(isLoggedIn);
  };

  return (
    <div className="App">
      {log ? (
        <UserNavbar handleLog={handleLog} />
      ) : (
        <Navbar handleLog={handleLog} />
      )}
      <GlobalContext.Provider value={{ handleLog, log }}>
        <MainRoutes/>
      </GlobalContext.Provider>

      {!log ? <Footer /> : null}
    </div>
  );
}

export default App;
