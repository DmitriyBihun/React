import { usePlannerForm } from '../model/usePlannerForm'

export default function PlannerForm({ onSubmit, initialValues }) {
  const { values, errors, isSubmitting, handleChange, handleSubmit } =
    usePlannerForm(initialValues, onSubmit)

  return (
    <form onSubmit={handleSubmit} autoComplete="off">

      <div className='inputBox'>
        <label htmlFor="description">
          Dream:
        </label>
        <input
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          placeholder="Enter the dream..."
        />
        {errors.description && (
          <div>{errors.description}</div>
        )}
      </div>
      <div className='inputBox'>
        <label htmlFor="year">
          Year:
        </label>
        <input
          id="year"
          name="year"
          value={values.year}
          onChange={handleChange}
          placeholder="Enter the year..."
        />
        {errors.year && (
          <div>{errors.year}</div>
        )}
      </div>
      <div className='inputBox'>
        <label htmlFor="friend">
          Friend(s):
        </label>
        <input
          id="friend"
          name="friend"
          value={values.friend}
          onChange={handleChange}
          placeholder="Enter a friend..."
        />
        {errors.friend && (
          <div>{errors.friend}</div>
        )}
      </div>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}
