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
import { RedoRounded } from '@material-ui/icons'

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
  const [exchangePoint, setExchangePoint] = useState()
  const [isError, setIsError] = useState(false)
  const [helperText, setHelperText] = useState('交換するポイント')
  const point = memberInfo.point
  const level = memberInfo.level
  const levelBounus = level / 100 + 1
  const money = Math.floor(exchangePoint * levelBounus)

  const handleOnChange = (event) => {
    const value = event.target.value
    const error = value.slice(-1) === ' '
    if (error) {
      console.log('error')
      return
    } else {
      // 0から始めない
      // setExchangePoint(value.replace(/^0+/, ''))
      setExchangePoint(value.replace(/[^0-9]/g, ''))
    }
  }

  const onSubmitEvent = () => {
    exchangeCash(money)
  }

  const inputError = (event) => {
    const key = event.key
    if (key === '+' || key === '-') return
    const error = isNaN(key) && key !== 'Backspace' && key !== 'Enter' && key !== 'Delete'

    if (error) {
      setIsError(true)
      setHelperText('数字を正しく入力してください')
    } else {
      setIsError(false)
      setHelperText('交換するポイント')
    }
  }

  const overPointError = () => {
    if (point < exchangePoint) {
      setIsError(true)
      setHelperText('持っているポイントを超えています')
    } else {
      setIsError(false)
      setHelperText('交換するポイント')
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
          onKeyDown={inputError}
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
      <p>レベルボーナス × {levelBounus}上乗せ</p>
      <p>{money}円</p>
      <SubmitBtn disabled={isError} text="ポイントを換金する" onSubmitEvent={onSubmitEvent} />
    </>
  )
}

export default Cash
