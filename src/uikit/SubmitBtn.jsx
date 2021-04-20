import React from 'react'
import { Button } from '@material-ui/core'

const SubmitBtn = ({ text, onSubmitEvent, disabled, className }) => {
  return (
    <Button
      className={className}
      fullWidth
      disabled={disabled}
      variant="contained"
      color="primary"
      onClick={() => onSubmitEvent()}
    >
      {text}
    </Button>
  )
}

export default SubmitBtn
