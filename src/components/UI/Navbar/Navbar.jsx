import { Link, NavLink } from "react-router-dom";
import MyButton from "../button/MyButton";
import { AuthContext } from "../../context";
import { useContext } from "react";

const Navbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };
  return (
    <div className="navbar">
      {isAuth && <MyButton onClick={logout}>Выйти</MyButton>}
      <div className="navbar__links">
        <Link to="/about">О сайте</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
};

export default Navbar;
