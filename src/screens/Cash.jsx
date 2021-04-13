import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, Grid, Paper } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'
import BottomNav from '../components/BottomNav'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import clsx from 'clsx'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FormHelperText from '@material-ui/core/FormHelperText'

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
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  input_subtext: {
    color: '#616161',
  },
}))

const Cash = ({ memberInfo, exchangeCash }) => {
  const classes = useStyles()
  const [exchangePoint, setExchangePoint] = useState('')
  const [isError, setIsError] = useState(false)
  const [helperText, setHelperText] = useState('交換するポイント')
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

  const inputError = (event) => {
    const key = event.key
    const error = isNaN(key) && key !== 'Backspace' && key !== 'Enter' && key !== 'Delete'

    if (error) {
      setIsError(true)
      setHelperText('数字を入力してください')
    } else {
      setIsError(false)
      setHelperText('交換するポイント')
    }
  }

  const overPointError = () => {
    if (point < exchangePoint) {
      setIsError(true)
      setHelperText('持っているポイントを超えています')
    }
  }
  useEffect(() => {
    overPointError()
  }, [exchangePoint])

  return (
    <>
      {/* <p>現在のポイントは{point}POINT</p> */}
      <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
        <OutlinedInput
          id="outlined-adornment-weight"
          type="number"
          value={exchangePoint}
          error={isError}
          onChange={handleOnChange}
          onKeyDown={(e) => {
            inputError(e)
          }}
          autoFocus
          endAdornment={
            <InputAdornment className={classes.input_subtext} position="end">
              / {point} point
            </InputAdornment>
          }
          aria-describedby="outlined-weight-helper-text"
        />
        <FormHelperText error={isError} variant="outlined" id="outlined-weight-helper-text">
          {helperText}
        </FormHelperText>
      </FormControl>
      <ArrowDownwardIcon />
      <p>交換後のポイントは{money}</p>
      <p>レベルボーナス × {levelBounus}上乗せ</p>
      <SubmitBtn text="ポイントを換金する" onSubmitEvent={onSubmitEvent} />
    </>
  )
}

export default Cash
