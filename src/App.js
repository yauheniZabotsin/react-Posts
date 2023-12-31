import "./style.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./components/context";
import { useEffect, useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setLoading(false);
  }, []);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isAuth, setIsAuth, isLoading }}>
        <HashRouter>
          <Navbar />
          <AppRouter />
        </HashRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
