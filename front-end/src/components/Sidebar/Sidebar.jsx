import React from "react";
import CreateEventButton from "../CreateEventButton/CreateEventButton";
import SmallCalendar from "../SmallCalendar/SmallCalendar";
import EventList from "../EventList/EventList";
export default function Sidebar() {
  return (
    <aside className="border p-5">
      <CreateEventButton />
      <SmallCalendar />
      <EventList />
    </aside>
  );
}
