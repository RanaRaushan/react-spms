import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Root, { loader as rootLoader} from "./routes/root";
import LoginPage from "./routes/login";
import SingupPage, { action as singupAction,} from "./routes/signup";
import { AuthProvider } from "./hooks/useAuth";
import { RequireAuth } from "./components/RequireAuth";
import LogoutPage from "./routes/logout";



const AuthProviderLayout = () => (
  <AuthProvider>
    <LogoutPage />
    <Outlet />
    
  </AuthProvider>
);

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route
      element={<AuthProviderLayout /> } 
      errorElement={<ErrorPage />}>
        <Route
          path="/"
          element={
              <RequireAuth>
                <Root />
              </RequireAuth>
            }
          // children= {
          //   <Route
          //     path="/"
          //     element={ <LogoutPage />}
          //   />
          // }
          loader={rootLoader}
          // action={rootAction}
          errorElement={<ErrorPage />}
        />,
        <Route
          path="/login"
          element={
              <RequireAuth>
                <LoginPage />
              </RequireAuth>
          }
          // loader={rootLoader}
          // action={loginAction}
          errorElement={<ErrorPage />}
        />,
        <Route
          path="/signup"
          element={<SingupPage />}
          // loader={rootLoader}
          action={singupAction}
          errorElement={<ErrorPage />}
        />,
        {/* <Route
          path="/logout"
          element={
              <RequireAuth>
                <LogoutPage />
              </RequireAuth>
            }
          // loader={rootLoader}
          // action={singupAction}
          errorElement={<ErrorPage />}
        />, */}
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);