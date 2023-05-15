import { Link } from "react-router-dom";
import "./styles/index.scss";
import "./styles/reset.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { useTheme } from "app/providers/ThemeProvider";
import { AppRouter } from "./providers/router";

const App = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={classNames("app", {}, [theme])}>
      <button onClick={toggleTheme}>Change theme</button>
      <Link to="/">Main page</Link>
      <Link to="/about">About page</Link>
      <AppRouter />
    </div>
  );
};

export default App;
