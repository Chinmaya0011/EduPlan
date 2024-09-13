import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import style from '../styles/Today.module.css';
import Modal from './Modal';
import TodayNote from './TodayNote';

const Today = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataVisible, setIsDataVisible] = useState(true);
  const today = new Date().toLocaleDateString();
  
  // Filter today's activities
  const todayActivities = useSelector(state =>
    state.calendar.activities.filter(activity =>
      new Date(activity.addedOn).toLocaleDateString() === today
    )
  );

  return (
    <div className={style.container}>
      <button 
        className={style.openModalButton} 
        onClick={() => setIsModalOpen(true)}
        aria-label="Add Today's Note"
      >
        Add Today's Note
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <TodayNote onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}

      <button 
        className={style.toggleButton} 
        onClick={() => setIsDataVisible(prev => !prev)}
        aria-label={isDataVisible ? "Hide Today's Notes" : "Show Today's Notes"}
      >
        {isDataVisible ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isDataVisible && (
        <div className={style.todayData}>
          <h2>Today's Note</h2>
          {todayActivities.length > 0 ? (
            todayActivities.map((activity, index) => (
              <div key={index} className={style.activityItem}>
                <h3>{activity.title}</h3>
                <p><strong>Note:</strong> {activity.note}</p>
                <p><strong>Link:</strong> {activity.link}</p>
                <p><strong>Study Time:</strong> {`${activity.studyTimeStart || 'N/A'} - ${activity.studyTimeEnd || 'N/A'}`}</p>
              </div>
            ))
          ) : (
            <p>No note available for today.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Today;
