import React from 'react'
import { Button } from '@material-ui/core'

const SubmitBtn = ({ text, onSubmitEvent }) => {
  return (
    <Button fullWidth variant="contained" color="primary" onClick={() => onSubmitEvent()}>
      {text}
    </Button>
  )
}

export default SubmitBtn
