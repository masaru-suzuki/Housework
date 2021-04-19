import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, Grid, Paper } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'
import BottomNav from '../components/BottomNav'

const useStyles = makeStyles(() => ({
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
}))

const Exchange = ({ memberInfo, getMemberId, items, isPage, flag, handleFlag }) => {
  const classes = useStyles()
  const { id } = memberInfo
  // console.log(memberInfo)
  useEffect(() => {
    getMemberId(id)
  }, [])
  return (
    <Container>
      <p>exchange</p>
      {items.map((item) => {
        return <p>{item.name}</p>
      })}
      {/* <button onClick={()=> }>exchange</button> */}
    </Container>
  )
}

export default Exchange
