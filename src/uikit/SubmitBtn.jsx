import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24,
  },
}))

//handleBackEditFamily is handel that chage flag in EditFamily.jsx
const SubmitBtn = ({ value, name, birth, id, updateFirestoreOfMemberInfo, handleBackEditFamily }) => {
  const classes = useStyles()
  const onSubmitEvent = () => {
    updateFirestoreOfMemberInfo(id, name, birth)
    handleBackEditFamily()
  }
  return (
    <Button fullWidth variant="contained" color="primary" className={classes.btn} onClick={() => onSubmitEvent()}>
      {value}
    </Button>
  )
}

export default SubmitBtn
