import {
    useLocation,
    useNavigate,
  } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { SpinnerCircularSplit } from "spinners-react";
  


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
           <SpinnerCircularSplit size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
        </div>
            : <></>
        }
      </>
    );
  }