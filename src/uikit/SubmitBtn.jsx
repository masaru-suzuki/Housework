import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
const useStyles = makeStyles(() => ({
  btn: {
    marginBottom: 24, //FIXME: 共通コンポーネントにmarginとかpaddingとかを入れると、めっちゃ使いづらくなるからやめたほうがいい
  },
}))

const SubmitBtn = ({ text, onSubmitEvent }) => {
  const classes = useStyles()
  return (
    <Button fullWidth variant="contained" color="primary" className={classes.btn} onClick={() => onSubmitEvent()}>
      {text}
    </Button>
  )
}

export default SubmitBtn
