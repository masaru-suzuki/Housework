import React from 'react'
import { Button } from '@material-ui/core'

const SubmitBtn = ({ text, onSubmitEvent, disabled }) => {
  return (
    <Button fullWidth disabled={disabled} variant="contained" color="primary" onClick={() => onSubmitEvent()}>
      {text}
    </Button>
  )
}

export default SubmitBtn
