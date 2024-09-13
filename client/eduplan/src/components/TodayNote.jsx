import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addActivity } from '../features/calendarSlice'; // Import the correct action
import style from '../styles/TodayNote.module.css';

const TodayNote = ({ onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = React.useState(false); // State to manage form submission status

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Set submitting state to true
    try {
      const currentDateTime = new Date().toLocaleString(); // Capture current date and time
      const noteWithDate = {
        ...data,
        addedOn: currentDateTime, // Add current date and time to the data
      };

      // Dispatch the action with the note data
      await dispatch(addActivity(noteWithDate));

      // Clear form fields and close modal
      reset();
      onClose();
    } catch (error) {
      console.error('Failed to add note:', error); // Handle error
      // Optionally, you could display an error message to the user here
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <div className={style.container}>
      <h2>Today's Note</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Input */}
        <label htmlFor="title" className="sr-only">Title</label>
        <input
          id="title"
          type="text"
          className={style.input}
          {...register('title', { required: 'Title is required' })}
          placeholder="Title"
          aria-label="Note Title"
        />
        {errors.title && <p className={style.error}>{errors.title.message}</p>}

        {/* Note Textarea */}
        <label htmlFor="note" className="sr-only">Note</label>
        <textarea
          id="note"
          className={style.textarea}
          {...register('note', { required: 'Note is required' })}
          placeholder="Note"
          aria-label="Note"
        />
        {errors.note && <p className={style.error}>{errors.note.message}</p>}

        {/* Link Input */}
        <label htmlFor="link" className="sr-only">Link</label>
        <input
          id="link"
          type="text"
          className={style.input}
          {...register('link')}
          placeholder="Link"
          aria-label="Link"
        />

        {/* Time Selection Inputs */}
        <label htmlFor="studyTimeStart" className="sr-only">Start Time</label>
        <input
          id="studyTimeStart"
          type="time"
          className={style.input}
          {...register('studyTimeStart')}
          aria-label="Start Time"
        />

        <label htmlFor="studyTimeEnd" className="sr-only">End Time</label>
        <input
          id="studyTimeEnd"
          type="time"
          className={style.input}
          {...register('studyTimeEnd')}
          aria-label="End Time"
        />

        <button type="submit" className={style.button} disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </form>
    </div>
  );
};

export default TodayNote;
