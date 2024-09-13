// src/components/FuturePlan.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setFuturePlans } from '../features/calendarSlice'; // Adjust according to your slice
import style from '../styles/FuturePlan.module.css';
import Modal from './Modal';
import Future from './Future'; // Import the Future component

const FuturePlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedDate = useSelector((state) => state.calendar.date);
  
  // Initialize React Hook Form
  const { register, handleSubmit, reset } = useForm();

  const handleAddPlan = (data) => {
    if (data.plan.trim()) {
      dispatch(setFuturePlans({ date: selectedDate.toDateString(), plan: data.plan }));
      reset(); // Clear form fields after submission
      setIsModalOpen(false); // Close the modal
    }
  };

  return (
    <div className={style.container}>
      <button className={style.openModalButton} onClick={() => setIsModalOpen(true)}>
        Add Future Plan
      </button>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>Future Study Plan</h2>
          <form onSubmit={handleSubmit(handleAddPlan)}>
            <textarea
              className={style.textarea}
              {...register('plan', { required: 'Plan is required' })}
              placeholder="Add your future study plans here..."
            />
            <button className={style.button} type="submit">
              Add Plan
            </button>
          </form>
        </Modal>
      )}
      <Future /> {/* Display future plans */}
    </div>
  );
};

export default FuturePlan;
