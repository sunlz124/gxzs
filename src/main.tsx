import ReactDOM from "react-dom";
import "./main.css";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
// HashRouter,
ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,

  document.getElementById("root")
);
