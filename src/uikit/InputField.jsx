import React from 'react'
import {TextField} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  text_field: {
    marginBottom: 16,
  },
}))

const InputField = ({required, label, value}) => {
  const classes = useStyles()
  return (
    <TextField
      className={classes.text_field}
      fullWidth
      size="small"
      variant="filled"
      required={required}
      label={label}
      value={value}
    />
  )
}

export default InputField
