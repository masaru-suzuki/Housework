import React from 'react'
import { Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const BackBtn = ({ className, handleBack }) => {
  return (
    <Button
      className={className}
      variant="text"
      color="inherit"
      size="small"
      onClick={() => handleBack()}
      startIcon={<ArrowBackIosIcon />}
    >
      back
    </Button>
  )
}

export default BackBtn
