import React from 'react'
import { TextField } from '@material-ui/core'

const InputField = ({ className, required, identificationName, label, value, handleChange }) => {
  return (
    <TextField
      className={className}
      fullWidth
      size="small"
      variant="filled"
      name={identificationName}
      required={required}
      label={label}
      value={value}
      onChange={handleChange}
    />
  )
}

export default InputField
