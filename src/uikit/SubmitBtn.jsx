import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24,
  },
}))

const SubmitBtn = ({value, name, birth, member, updateFirestoreOfMemberInfo, handleIsEdit}) => {
  const classes = useStyles()
  const onSubmitEvent = () => {
    updateFirestoreOfMemberInfo(member.memberId, name, birth)
    handleIsEdit()
  }
  return (
    <Button fullWidth variant="contained" color="primary" className={classes.btn} onClick={() => onSubmitEvent()}>
      {value}
    </Button>
  )
}

export default SubmitBtn
