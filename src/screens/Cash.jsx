import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, Grid, Paper } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'
import BottomNav from '../components/BottomNav'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import TextField from '@material-ui/core/TextField'
import SubmitBtn from '../uikit/SubmitBtn'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}))

const Cash = ({ memberInfo, exchangeCash }) => {
  const classes = useStyles()
  const [exchangePoint, setExchangePoint] = useState(0)
  const point = memberInfo.point
  const level = memberInfo.level
  const levelBounus = level / 100 + 1
  const money = exchangePoint * levelBounus
  const handleOnChange = (event) => {
    setExchangePoint(event.target.value)
  }
  const onSubmitEvent = () => {
    exchangeCash(exchangePoint)
  }
  return (
    <>
      <p>現在のポイントは{point}POINT</p>
      <TextField id="outlined-basic" autoFocus label="交換するポイント" onChange={handleOnChange} variant="outlined" />
      <ArrowDownwardIcon />
      <p>交換後のポイントは{money}</p>
      <p>レベルボーナス × {levelBounus}上乗せ</p>
      <SubmitBtn text="ポイントを換金する" onSubmitEvent={onSubmitEvent} />
    </>
  )
}

export default Cash
