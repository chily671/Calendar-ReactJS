import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    allevents,
  } = useContext(GlobalContext);

  // useEffect(() => {
  //   const events = getDayEvents(filteredEvents, day); // Sử dụng hàm để lấy dayEvents
  //   setDayEvents(events);
  // }, [filteredEvents, day]);

  // useEffect(() => {
  //   const events = filteredEvents.filter(
  //     (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
  //   );
  //   setDayEvents(events);
  // }, [filteredEvents, day]);

  useEffect(() => {
    const events = allevents.filter((evt) =>
      dayjs(evt.day).startOf("day").isSame(day.startOf("day"))
    );
    setDayEvents(events);
  }, [allevents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <hr className="border-t border-gray-200" />
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.type} p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export const getDayEvents = (filteredEvents, day) => {
  return filteredEvents.filter(
    (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
  );
};
