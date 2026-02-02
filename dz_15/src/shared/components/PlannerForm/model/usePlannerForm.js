import { useState } from 'react'

export function usePlannerForm(
  initialValues = { description: '', year: '', friend: '' },
  onSubmit,
) {
  const [values, setValues] = useState(() => ({ ...initialValues }))
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = (vals) => {
    const errs = {}
    if (!vals.description.trim()) errs.description = 'Enter the dream'
    if (!vals.year) errs.year = 'Enter the year'
    if (!vals.friend.trim()) errs.friend = 'Enter a friend'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      try {
        await onSubmit(values)
        setValues({ ...initialValues })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  }
}
