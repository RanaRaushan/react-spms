import {
    useLocation,
    useNavigate,
  } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
  


  export default function Authorize() {
    console.log("Authorize | calling Authorize")
    const { state } = useLocation();
    const { setAuthenticateUser } = useAuth();
    const navigate = useNavigate();

    const handleAuthorization = async () => {
        console.log("calling hanlde login")
        await setAuthenticateUser(state)        
    };
    
    console.log("Authorize | state", state);
    if (state) {
        useEffect(() => {
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