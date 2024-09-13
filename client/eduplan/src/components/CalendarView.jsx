import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import { setDate } from '../features/calendarSlice';
import style from '../styles/CalendarView.module.css';
import Today from './Today';
import PreviousDate from './PreviousDate';
import FuturePlan from './FuturePlan';
import Modal from './Modal'; // Import the Modal component

const CalendarView = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const date = useSelector((state) => state.calendar.date);
  const activities = useSelector((state) => state.calendar.activities);
  const futurePlans = useSelector((state) => state.calendar.futurePlans); // Access future plans

  // Get today's date for comparison
  const today = new Date();

  // Determine the view based on the selected date
  const getView = () => {
    if (selectedDate && selectedDate.toDateString() === today.toDateString()) {
      return 'today';
    } else if (selectedDate && selectedDate < today) {
      return 'previous';
    } else if (selectedDate) {
      return 'future';
    } else {
      return 'none';
    }
  };

  const view = getView();

  useEffect(() => {
    if (selectedDate) {
      dispatch(setDate(selectedDate));
      setIsModalOpen(true); // Open the modal when date changes
    }
  }, [selectedDate, dispatch]);

  useEffect(() => {
    if (date) {
      setSelectedDate(new Date(date));
    }
  }, [date]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null); // Clear the selected date when closing the modal
  };

  // Function to determine the background color based on the date
  const getDateClassName = (date) => {
    const dateStr = date.toDateString();
    const hasActivity = activities.some(activity =>
      new Date(activity.addedOn).toDateString() === dateStr
    );
    const hasFuturePlan = futurePlans.some(plan =>
      new Date(plan.date).toDateString() === dateStr
    );

    if (hasFuturePlan) {
      return style.withData; // Apply the green color for dates with future plans
    } else if (hasActivity) {
      return style.withData; // Apply the green color for dates with activities
    } else if (date.toDateString() === today.toDateString()) {
      return style.today;
    } else if (date < today) {
      return style.previous;
    } else {
      return style.future;
    }
  };

  return (
    <div className={style.calendarContainer}>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate} // Use selectedDate to ensure the calendar reflects the state
        tileClassName={({ date }) => getDateClassName(date)}
        className={style.calendar}
      />
 
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className={style.modalContent}>
            <h2>Details for {selectedDate?.toDateString() || 'N/A'}</h2>
            {/* Conditionally render components based on the selected date */}
            {view === 'today' && <Today />}
            {view === 'previous' && <PreviousDate />}
            {view === 'future' && (
              <FuturePlan plans={futurePlans.filter(plan => new Date(plan.date).toDateString() === selectedDate?.toDateString())} />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CalendarView;
