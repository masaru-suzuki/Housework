import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
const useStyles = makeStyles(() => ({
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
}))

const BackBtn = ({ handleBack }) => {
  const classes = useStyles()
  return (
    <Button
      variant="text"
      color="inherit"
      size="small"
      className={classes.btn_back}
      onClick={() => handleBack()}
      startIcon={<ArrowBackIosIcon className={classes.btn_icon} />}
    >
      back
    </Button>
  )
}

export default BackBtn
