import React, { useContext, useEffect, useState, useRef } from "react";
import GlobalContext from "../../context/GlobalContext";
import {
  FiClock,
  FiUser,
  FiFileText,
  FiInfo,
  FiCalendar,
  FiMapPin,
} from "react-icons/fi";
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getDayEvents } from "../Day";
import dayjs from "dayjs";

const EventList = () => {
  const { daySelected, setSelectedEvent, allevents } =
    useContext(GlobalContext);

  const dayEvents = getDayEvents(allevents, daySelected);
  const EventCard = ({ event }) => {
    const formattedDate = dayjs(event.start_time).format("hh:mm A ");
    const formmattedStartDate = dayjs(event.start_time).format("hh:mm A ");
    const formmattedEndDate = dayjs(event.end_time).format("hh:mm A ");

    const formmattedStartTime_with_date = dayjs(event.start_time).format(
      "hh:mm A, dddd, MMMM D"
    );
    const formmattedEndTime_with_date = dayjs(event.end_time).format(
      "hh:mm A, dddd, MMMM D"
    );
    const checkStart_date = dayjs(event.start_time).format(
      "dddd, MMMM D, YYYY"
    );
    const checkEnd_date = dayjs(event.end_time).format("dddd, MMMM D, YYYY");
    return (
      <div
        className={`bg-white bg-${event.type} rounded-xl shadow-md p-2 just mb-4 hover:shadow-lg transition-shadow duration-300 border border-gray-100`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-1 rounded-full mx-2">
              <FiCalendar className="h-6 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 text-center">
                {event.type === "Event"
                  ? "Event: " + event.title
                  : "Appointment: " + event.title}
              </h3>
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <FiClock className="h-4 w-4 text-blue-600" />
                {checkStart_date === checkEnd_date ? (
                  <span className="text-sm font-medium text-blue-600">
                    {formmattedStartDate === formmattedEndDate
                      ? formmattedStartDate
                      : formmattedStartDate + " - " + formmattedEndDate}
                  </span>
                ) : (
                  <div className="flex-row">
                    <span className="text-sm font-medium text-blue-600">
                      {formmattedStartTime_with_date}
                    </span>
                    <br />
                    <span className="text-sm font-medium text-blue-600">
                      - {formmattedEndTime_with_date}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 gap-y-3">
          {event.type === "Appointment" ? (
            <div className="flex items-center space-x-2">
              <FiUser className="h-5 w-5 text-gray-400" />
              <span className="text-sm text-gray-600">Mr. Jonh</span>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center space-x-2">
            <FiMapPin className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Tp.Ho Chi Minh</span>
          </div>
        </div>
      </div>
    );
  };

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  const eventData = {
    title: "Tech Conference 2024",
    date: "March 15, 2024",
    time: "9:00 AM - 5:00 PM",
    location: "Silicon Valley Convention Center",
    description:
      "Join us for an immersive tech conference featuring industry leaders, innovative workshops, and networking opportunities. Discover the latest trends in AI, blockchain, and digital transformation.",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      "https://images.unsplash.com/photo-1511578314322-379afb476865",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
    ],
    speakers: [
      { name: "John Smith", role: "AI Expert" },
      { name: "Sarah Johnson", role: "Blockchain Specialist" },
      { name: "Michael Chen", role: "Digital Transformation Leader" },
    ],
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenEvent = () => {
    try {
      setIsOpen(true);
      setError(null);
    } catch (err) {
      setError("Failed to load event details. Please try again later.");
    }
  };

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % eventData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + eventData.images.length) % eventData.images.length
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">
        Events for {daySelected.format("dddd, MMMM D, YYYY")}
      </h2>
      {dayEvents.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => handleOpenEvent()}
            className={`bg-${evt.label}-200 p-2 mb-2 text-gray-600 text-sm rounded cursor-pointer hover:bg-opacity-75`}
          >
            <EventCard event={evt} />
          </div>
        ))
      )}
      <div className=" bg-gray-100 p-4 flex items-center justify-center">
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
            role="dialog"
            aria-modal="true"
            aria-labelledby="event-title"
          >
            <div
              ref={modalRef}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-transform duration-300 scale-100"
            >
              {error ? (
                <div className="p-6 text-center text-red-600">{error}</div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10"
                    aria-label="Close event details"
                  >
                    <FaTimes className="w-6 h-6" />
                  </button>

                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={eventData.images[currentImageIndex]}
                      alt="Event"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 space-x-2">
                      <button
                        onClick={prevImage}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                        aria-label="Previous image"
                      >
                        ←
                      </button>
                      <button
                        onClick={nextImage}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                        aria-label="Next image"
                      >
                        →
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2
                      id="event-title"
                      className="text-3xl font-bold text-gray-800 mb-4"
                    >
                      {eventData.title}
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <FaCalendarAlt className="mr-2" />
                        <span>{eventData.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaClock className="mr-2" />
                        <span>{eventData.time}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{eventData.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                      {eventData.description}
                    </p>

                    <div className="border-t pt-6">
                      <h3 className="text-xl font-semibold mb-4">Speakers</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {eventData.speakers.map((speaker, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            <h4 className="font-medium text-gray-800">
                              {speaker.name}
                            </h4>
                            <p className="text-gray-600">{speaker.role}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;
