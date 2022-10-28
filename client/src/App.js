import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "./views/Auth";
import AuthContextProvider from "./context/Authcontext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./component/routing/ProtectedRoute";
import About from "./views/About";
import LayoutDashboard from "./component/layout/LayoutDashboard";
import PostContextProvider from "./context/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Navigate to="/login" />}></Route>
            <Route
              exact
              path="/login"
              element={<Auth authRouter="/login" />}
            ></Route>
            <Route
              exact
              path="/register"
              element={<Auth authRouter="/register" />}
            ></Route>
            <Route exact path="/home" element={<LayoutDashboard />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
