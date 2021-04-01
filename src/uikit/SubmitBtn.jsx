import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24,
  },
}))

//handleBackEditFamily is handel that chage flag in EditFamily.jsx
const SubmitBtn = ({
  value,
  flag,
  member,
  name,
  birth,
  id,
  updateFirestoreOfMemberInfo,
  addMemberToFirestore,
  handleBackEditFamily,
}) => {
  const classes = useStyles()
  console.log(flag)
  let onSubmitEvent = ''
  if (flag === 'isAdd') {
    onSubmitEvent = () => {
      addMemberToFirestore(member)
      handleBackEditFamily()
    }
  } else if (flag === 'isEdit') {
    onSubmitEvent = () => {
      updateFirestoreOfMemberInfo(id, name, birth)
      handleBackEditFamily()
    }
  } else {
    console.log('no flag')
  }

  return (
    <Button fullWidth variant="contained" color="primary" className={classes.btn} onClick={() => onSubmitEvent()}>
      {value}
    </Button>
  )
}

export default SubmitBtn
