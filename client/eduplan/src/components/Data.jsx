// src/features/Data.js
import React from 'react';
import { useSelector } from 'react-redux';
import style from "../styles/Data.module.css";

const Data = () => {
  const { activities, futurePlans } = useSelector((state) => state.calendar);

  return (
    <div className={style.dataContainer}>
      <div className={style.activities}>
        <h2>Activities</h2>
        <ul>
          {activities.map((activity, index) => (
            <li key={index} className={style.activityItem}>
              <strong>{activity.title}</strong>: {activity.note}
              {activity.link && (
                <div className={style.activityLink}>
                  <a href={activity.link} target="_blank" rel="noopener noreferrer">Link</a>
                </div>
              )}
              <div className={style.studyTime}>
                {activity.studyTimeStart && activity.studyTimeEnd && (
                  <span>
                    Study Time: {activity.studyTimeStart} - {activity.studyTimeEnd}
                  </span>
                )}
              </div>
              <div className={style.addedOn}>Added on: {activity.addedOn}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={style.futurePlans}>
        <h2>Future Plans</h2>
        <ul>
          {futurePlans.map((plan, index) => (
            <li key={index} className={style.planItem}>
              <strong>{plan.date}:</strong> {plan.plan}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Data;
