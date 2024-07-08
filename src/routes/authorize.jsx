import {
    useBeforeUnload,
    useLoaderData,
    useLocation,
    useNavigate,
    // existing code
    useNavigation,
    useRouteLoaderData,
  } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
  
  // existing code
  
  export async function action({ request }) {
    const loginFormData = await request.formData();
    const loginData = Object.fromEntries(loginFormData);
    console.log("authorize action | response", loginData)
    return {};
    
  }


  export default function Authorize() {
    console.log("Authorize | calling Authorize")
    const navigation = useNavigation();
    const { state } = useLocation();
    const {token, setAuthenticateUser } = useAuth();
    const navigate = useNavigate();

    const handleAuthorization = async () => {
        console.log("calling hanlde login")
        await setAuthenticateUser(state)        
    };
    // let tokenAavilable = state.body
    console.log("Authorize | state", state);
    if (state) {
        useEffect(() => {
        // if (state) {
            // console.log("calling hanlde login")
            // await setAuthenticateUser(state) ;
            // console.log("Data set localstorage, redirect...")
            // return navigate("/", {replace: true})
        // }
        handleAuthorization()
        navigate("/", {replace: true})
      }, []);
    }
    return (
      <>
        {state ? 
        <div>
            <h2>Loading...</h2>
            <p>Please wait...</p>
        </div>
            : <></>
        }
      </>
    );
  }