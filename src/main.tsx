import ReactDOM from "react-dom";
import "./main.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
// HashRouter,
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,

  document.getElementById("root")
);
