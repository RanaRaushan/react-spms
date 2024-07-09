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
import SmartParkingPage, { loader as parkingLoader} from "./routes/smartParking";
import Authorize from "./routes/authorize";
import ParkingSLotPage from "./routes/parkingSlot";



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
                <Root />
            }
          errorElement={<ErrorPage />}
        />,
          <Route
            id="login"
            path="login"
            element={<LoginPage />}
            action={loginAction}
            errorElement={<ErrorPage />}
          />,
          <Route
            path="auth/callback"
            element={<Authorize />}
            errorElement={<ErrorPage />}
          />,          
        <Route
          path="/signup"
          element={<SingupPage />}
          action={singupAction}
          errorElement={<ErrorPage />}
        />,
        <Route
          path="/parking"
          element={
              // <RequireAuth>
                <SmartParkingPage />
              // </RequireAuth>
            }
          loader={parkingLoader}
          errorElement={<ErrorPage />}
          children={
              <Route
                path="slots/:slotId"
                element={
                  <RequireAuth>
                    <ParkingSLotPage />
                  </RequireAuth>
                }
                // action={singupAction}
                errorElement={<ErrorPage />}
              />
          }
        />,
      </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);