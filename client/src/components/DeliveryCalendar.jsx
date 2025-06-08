import React from "react";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

const DeliveryCalendar = () => {
  const { token } = useAuth();
  const [date, setDate] = useState(new Date());
  const [deliver, setDeliver] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/delivery", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("This is the Res: ",res);
        setDeliver(res.data);
      } catch (err) {
        console.error("Error Fetching deliveries: ", err);
      }
    };
    fetchDeliveries();
  }, [token]);

  const handleChange = (date) => {
    setDate(date);
    const selectedDateDel = date.toISOString().split('T')[0];
    const filtered = deliver.filter(d => 
        d.date.startsWith(selectedDateDel)
    );
    setSelectedDate(filtered);
  };

  const tileClassName = ({date, view}) =>{
    if(view === 'month'){
        const dateStr = date.toISOString().split('T')[0];
        return deliver.find(d => d.date.startsWith(dateStr)) ? 'highlight' : null;
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Calendar</h2>
      <Calendar
        onChange={handleChange}
        value={date}
        tileClassName={tileClassName}
        showFixedNumberOfWeeks={false} // optional, reduces extra weeks
        showNeighboringMonth={false}  // hides days from prev/next month
      />

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Deliveries on {date.toDateString()}:</h3>
          {selectedDate.length === 0 ? (
            <p>No Deliveries</p>
          ) : (
            <ul className="mt-2 list-disc ml-6">
              {selectedDate.map((d, i) => (
                <li key={i}>
                  <strong>{d.productName}</strong> — {d.quantity}L —{" "}
                  <em>{d.status}</em>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default DeliveryCalendar;
