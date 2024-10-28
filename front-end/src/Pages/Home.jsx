import React from "react";
import CalendarHeader from "../components/CalendarHeader/CalendarHeader";
import Sidebar from "../components/Sidebar/Sidebar";
import Month from "../components/Month";
import EventModal from "../components/EventModal/EventModal";
import { getMonth } from "../util";
import GlobalContext from "../context/GlobalContext";
import { useContext, useEffect, useState } from "react";

const Home = () => {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <div>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader className="mb-3" />
        <div className="flex flex-1 ">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </div>
  );
};

export default Home;
