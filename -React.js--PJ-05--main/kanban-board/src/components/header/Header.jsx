import UserLogin from "../userLogin/UserLogin";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="title-header">Kanban Board</h1>
      <UserLogin />
    </header>
  );
};

export default Header;
