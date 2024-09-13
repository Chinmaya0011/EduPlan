// src/components/Future.js
import React from 'react';
import { useSelector } from 'react-redux';
import style from '../styles/Future.module.css';

const Future = () => {
  const futurePlans = useSelector((state) => state.calendar.futurePlans);
  const selectedDate = useSelector((state) => state.calendar.date);

  // Get future plans for the selected date
  const getFuturePlansForDate = () => {
    // Assuming future plans include a date property to filter
    return futurePlans.filter((plan) => plan.date === selectedDate.toDateString());
  };

  return (
    <div className={style.futureContainer}>
      <h3>Future Plans for {selectedDate?.toDateString()}</h3>
      {getFuturePlansForDate().length > 0 ? (
        getFuturePlansForDate().map((plan, index) => (
          <div key={index} className={style.planItem}>
            <p>{plan.plan}</p>
          </div>
        ))
      ) : (
        <p>No future plans for this date.</p>
      )}
    </div>
  );
};

export default Future;
