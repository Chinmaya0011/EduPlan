import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import style from '../styles/PreviousDate.module.css';
import Modal from './Modal';

const PreviousDate = () => {
  // Access the activities from the Redux store
  const activities = useSelector((state) => state.calendar.activities);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize React Hook Form
  const { register } = useForm();

  const handleOpenModal = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
    setIsModalOpen(false);
  };

  // Get today's date
  const today = new Date().toLocaleDateString();

  // Filter out today's activities
  const pastActivities = activities.filter(activity =>
    new Date(activity.addedOn).toLocaleDateString() !== today
  );

  return (
    <div className={style.container}>
      <h2>Previous Activities</h2>
      <ul className={style.list}>
        {pastActivities.length > 0 ? (
          pastActivities.map((activity, index) => (
            <li
              key={index}
              className={style.item}
              onClick={() => handleOpenModal(activity)}
            >
              <p><strong>Date:</strong> {new Date(activity.addedOn).toLocaleDateString()}</p>
              <p><strong>Title:</strong> {activity.title}</p>
            </li>
          ))
        ) : (
          <p>No past activities found.</p>
        )}
      </ul>
      {isModalOpen && selectedActivity && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <h2>Activity Details</h2>
          <form>
            <p><strong>Date:</strong> {new Date(selectedActivity.addedOn).toLocaleString() || 'N/A'}</p>
            <p><strong>Title:</strong> {selectedActivity.title || 'N/A'}</p>
            <p><strong>Note:</strong> {selectedActivity.note || 'N/A'}</p>
            <p><strong>Link:</strong> {selectedActivity.link || 'N/A'}</p>
            <p><strong>Study Time:</strong> {`${selectedActivity.studyTimeStart || 'N/A'} - ${selectedActivity.studyTimeEnd || 'N/A'}`}</p>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default PreviousDate;
