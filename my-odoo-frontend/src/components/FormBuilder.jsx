import React, { useState } from 'react'

/**
 * Renders a form based on a schema:
 *   schema = {
 *     id: 'my_form',
 *     fields: [
 *       {
 *         name: 'name',
 *         label: 'Name',
 *         widget: 'text',        // text | number | select | date
 *         required: true,
 *         placeholder: 'Your name',
 *       },
 *       { ... }
 *     ]
 *   }
 *
 * Calls onSubmit(values) when submitted.
 */
export default function FormBuilder({ schema, onSubmit }) {
  // initialize state with defaults or empty strings
  const initial = schema.fields.reduce((acc, f) => {
    acc[f.name] = f.default ?? ''
    return acc
  }, {})
  const [values, setValues] = useState(initial)

  const handleChange = (name) => (e) => {
    const { type, checked, value } = e.target
    setValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(values)
  }

  return (
    <form id={schema.id} onSubmit={handleSubmit}>
      {schema.fields.map(field => (
        <div key={field.name} style={{ marginBottom: '1rem' }}>
          <label>
            {field.label}{field.required && ' *'}<br/>
            {field.widget === 'text' && (
              <input
                type="text"
                name={field.name}
                value={values[field.name]}
                onChange={handleChange(field.name)}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
            {field.widget === 'number' && (
              <input
                type="number"
                name={field.name}
                value={values[field.name]}
                onChange={handleChange(field.name)}
                required={field.required}
              />
            )}
            {field.widget === 'select' && (
              <select
                name={field.name}
                value={values[field.name]}
                onChange={handleChange(field.name)}
                required={field.required}
              >
                <option value="" disabled>
                  {field.placeholder || 'Select...'}
                </option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            {field.widget === 'date' && (
              <input
                type="date"
                name={field.name}
                value={values[field.name]}
                onChange={handleChange(field.name)}
                required={field.required}
              />
            )}
          </label>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  )
}
