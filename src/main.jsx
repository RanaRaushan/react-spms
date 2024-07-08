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
import Root from "./routes/root";
import LoginPage, {action as loginAction} from "./routes/login";
import SingupPage, { action as singupAction,} from "./routes/signup";
import { AuthProvider } from "./hooks/useAuth";
import { RequireAuth } from "./components/RequireAuth";
import LogoutPage from "./routes/logout";
import SmartParkingPage, { loader as parkingLoader} from "./routes/SmartParkingPage";
import Authorize, {action as authorizeAction} from "./routes/authorize";



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
              // <RequireAuth>
                <Root />
              // </RequireAuth>
            }
          errorElement={<ErrorPage />}
        />,
        {/* <Route
          id="auth"
          path="/auth"
          // element={
          //     // <RequireAuth>
          //       <LoginPage />
          //     // </RequireAuth>
          // }
          // loader={rootLoader}
          // action={loginAction}
          errorElement={<ErrorPage />}
        > */}
          <Route
            id="login"
            path="login"
            element={<LoginPage />}
            // loader={rootLoader}
            action={loginAction}
            errorElement={<ErrorPage />}
          />,
          <Route
            path="callback"
            element={<Authorize />}
            // loader={rootLoader}
            // action={singupAction}
            action={authorizeAction}
            errorElement={<ErrorPage />}
          />,
        {/* </Route> */}
          
        <Route
          path="/signup"
          element={<SingupPage />}
          // loader={rootLoader}
          action={singupAction}
          errorElement={<ErrorPage />}
        />,
        <Route
          path="/parking"
          element={
              <RequireAuth>
                <SmartParkingPage />
              </RequireAuth>
            }
          loader={parkingLoader}
          // action={singupAction}
          errorElement={<ErrorPage />}
        />,
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <RouterProvider router={router} />
  </React.StrictMode>
);