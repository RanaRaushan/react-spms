import {
    Outlet,
    Link,
    useLoaderData,
    Form,
    useSearchParams,
    useParams
  } from "react-router-dom";
import {get} from '../utils/APIHelper.js';
import { useState } from "react";


export async function loader({ request }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("slotName");
    const parkingData = await get("/parking", q);
    const filteredParking = !q ? parkingData : parkingData.filter(slot => {
        return slot.slotName.includes(q);
      });
    return { filteredParking };
}

export default function SmartParkingPage() {
    const { filteredParking } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();
    const [slot, setSlot] = useState(filteredParking.find(s => s.slotId == params.slotId));

    // const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    //   "wss://ws-feed.exchange.coinbase.com"
    // );

    return (
      <>
        <div>
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
          <div>
            <Outlet context={slot}/>
          </div>
          <nav>
            {filteredParking?.length ? (
                <ul>
                {filteredParking.map((slot) => (
                    <li key={slot.slotId}>
                    <Link to={`slots/${slot.slotId}`} onClick={(e) => setSlot(slot)} >
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
      </>
    );
  }