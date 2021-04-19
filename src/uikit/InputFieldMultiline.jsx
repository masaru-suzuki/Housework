import React from 'react'
import { TextField } from '@material-ui/core'

const InputFieldMultiline = ({ className, required, identificationName, label, value, rows, handleChange }) => {
  return (
    <TextField
      className={className}
      fullWidth
      size="small"
      variant="filled"
      name={identificationName}
      required={required}
      multiline
      rows={rows}
      label={label}
      value={value}
      onChange={handleChange}
    />
  )
}

export default InputFieldMultiline
