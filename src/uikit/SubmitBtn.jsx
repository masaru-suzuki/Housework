import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24,
  },
}))

const SubmitBtn = ({value, member, updateFirestoreMock}) => {
  console.log(member)
  const classes = useStyles()
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      className={classes.btn}
      onClick={() => updateFirestoreMock('aaa')}
    >
      {value}
    </Button>
  )
}

export default SubmitBtn
