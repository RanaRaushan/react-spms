import {
    Link,
    useOutletContext, useParams
  } from "react-router-dom";
import "./parkingSlot.css"
import { IoClose } from "react-icons/io5";


export default function ParkingSLotPage() {
    const slot = useOutletContext();
    // const params = useParams();
    console.log("slot", slot)
    return (
      <>
        {
        slot && (
                <div className="popup-container" id="booking-popup">
                <div className="popup-card">
                <Link to={`/parking`}><div className="close-popup-icon">x</div></Link>
                <div className="popup-header"><h3>Book a Slot</h3></div>
                <div className="card">
                    <label>Slot Name:</label>
                    {/* <input type="text" id="slot-name" disabled /> */}
                    <input
                        id="slot-name"
                        aria-label="Parking slot"
                        placeholder="Slot Name"
                        type="input"
                        name="slotName"
                        disabled="true"
                        defaultValue={slot.slotName}
                    />
                    <label>Vehicle Number:</label>
                    <input type="text" id="vehicle-number" />
                    <label>User Email:</label>
                    <input type="text" id="user-email" />
                    <button id="book-btn" className="book-btn">Book Now</button>
                </div>
                </div>
            </div>
            )
        }
      </>
    );
  }