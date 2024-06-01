// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import RoutesPrincipal from "./Routes/RoutesPrincipal";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="AppContainer">
      <BrowserRouter>
        <RoutesPrincipal />
      </BrowserRouter>
    </div>
  );
}

export default App;

{
  /* <Route path="/admin">
  {localStorage.getItem('auth_token') ? <Redirect to='/' /> : <Login />}
</Route> */
}
