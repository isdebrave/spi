import axios from "axios";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
