import "./App.css";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Users from "./pages/Users";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Notfound from "./pages/notfound";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import LogInRedirect from "./Authentication/LogInRedirect";

function App() {
  return (
    <Router>
      <Topbar />
      <Switch>
        <LogInRedirect path="/" exact Component={Login} />
        <ProtectedRoute exact path="/order" Component={Order} />
        <ProtectedRoute exact path="/product" Component={Product} />
        <ProtectedRoute exact path="/users" Component={Users} />
        <ProtectedRoute exact path="/*" Component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App;
