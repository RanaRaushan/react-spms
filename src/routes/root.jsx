import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    useSearchParams
  } from "react-router-dom";
import {get} from '../utils/APIHelper.js';
import { useAuth } from "../hooks/useAuth.jsx";


export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("slotName");
    const parkingData = await get("/parking", q);
    const filteredParking = !q ? parkingData : parkingData.filter(slot => {
        return slot.slotName.includes(q);
      });
    return { filteredParking };
}

export default function Root() {
    const { filteredParking} = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
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