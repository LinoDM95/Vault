import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Vault_Snippets from "./pages/vault/Vault_Snippets";
import Vault_Data from "./pages/vault/Vault_Data";
import Vault_Media from "./pages/vault/Vault_Media";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Navbar from "./components/navbar";
import Header from "./components/header";
import { AuthProvider, AuthContext } from "./utils/auth_context";
import { SnippetProvider } from "./utils/snippet_context";
import { SearchProvider } from "./utils/searchbar_context";
import PrivateRoute from "./utils/private_route";
import { useContext } from "react";

const navLinks = [
  { name: "Snippet Hub", path: "/Snippet_Hub" },
  { name: "Snippet Table", path: "/Snippet_Table" },
];

/**
 *
 * TODO: DOCU
 */

const AppLayout = () => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname.toLowerCase() === "/register";
  const hideHeader =
    location.pathname === "/" ||
    location.pathname.toLowerCase() === "/register";
  const containerClass = hideNavbar
    ? "fixed w-full h-screen p-4"
    : "ml-80 mr-5 pt-16 h-screen p-4";

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>...</p>;
  }

  return (
    <div className="h-screen flex flex-col">
      {!hideHeader && (
        <div className="w-full h-16 fixed top-0 left-0 z-50 flex items-center px-4 bg-background-main/30 backdrop-blur-md backdrop-saturate-150">
          <Header />
        </div>
      )}
      ^
      <div>
        {!hideNavbar && (
          <div className="flex-1/2 h-full 0p-4 fixed left-0 top-16">
            <Navbar
              username={`Willkommen ${user.username}`}
              navLinks={navLinks}
            />
          </div>
        )}
        <div className={containerClass}>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/Snippet_Table" element={<Vault_Snippets />} />
              <Route path="/Vault_Data" element={<Vault_Data />} />
              <Route path="/Vault_Media" element={<Vault_Media />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <SnippetProvider>
        <SearchProvider>
          <Router>
            <AppLayout />
          </Router>
        </SearchProvider>
      </SnippetProvider>
    </AuthProvider>
  );
};

export default App;
