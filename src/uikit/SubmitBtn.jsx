import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24,
  },
}))

const SubmitBtn = ({value, name, member, updateFirestoreMock, editMemberIndex}) => {
  console.log(member)
  const classes = useStyles()
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      className={classes.btn}
      onClick={() => updateFirestoreMock(member, editMemberIndex, name)}
    >
      {value}
    </Button>
  )
}

export default SubmitBtn
