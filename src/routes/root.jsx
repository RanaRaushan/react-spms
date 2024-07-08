import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    useSearchParams
  } from "react-router-dom";
import {get} from '../utils/APIHelper.js';
import { useAuth } from "../hooks/useAuth.jsx";




export default function Root() {
    const { token } = useAuth();
    return (
      <>
        <div>
          <div className="header">
            <h1>Welcome to Smart Parking</h1>
            <span className="author">Author@Rana</span>
          </div>
          <div>
              <span>Try smart Booking at&nbsp;
                <Link to={`/parking`}>
                    Parking
                </Link>
              </span>
              
                {!token && 
                  <span>&nbsp;Or Login to &nbsp;
                  <Link to={`/login`}>
                      Smart Parking
                  </Link>
                </span>
                }
          </div>
          
        </div>
        {/* <div id="detail">
            <Outlet />
        </div> */}
      </>
    );
  }