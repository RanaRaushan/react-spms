import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    useNavigate,
    useLocation,
    useSearchParams
  } from "react-router-dom";
import {get} from '../utils/APIHelper.js';


export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("slotName");
    const parkingData = await get("/parking", q);
    const filteredParking = !q ? parkingData : parkingData.filter(slot => {
        return slot.slotName.includes(q);
      });
    console.log("parkingData", filteredParking, q);
    return { filteredParking };
}

export default function Root() {
    const { filteredParking} = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    return (
      <>
        <div id="sidebar">
          <h1>Smart Parking System</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search Parking slots"
                placeholder="Search"
                type="search"
                name="searchParams"
                defaultValue={searchParams.get('q')}
                onChange={(e) => setSearchParams(param => {
                        param.set("slotName", e.target.value);
                        return searchParams;
                      })}
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </Form>
          </div>
          <nav>
            {filteredParking?.length ? (
                <ul>
                {filteredParking.map((slot) => (
                    <li key={slot.slotId}>
                    <Link to={`slots/${slot.slotId}`}>
                        {slot.slotName ? (
                        <>
                            {slot.slotName}
                        </>
                        ) : (
                        <i>No Name</i>
                        )}
                    </Link>
                    </li>
                ))}
                </ul>
            ) : (
                <p>
                <i>No Slots</i>
                </p>
            )}
          </nav>
        </div>
        <div id="detail">
            <Outlet />
        </div>
      </>
    );
  }