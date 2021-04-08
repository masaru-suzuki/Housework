import React, { useState } from 'react'
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

const Exshange = ({ isPage, flag, handleFlag }) => {
  const classes = useStyles()
  // console.log(memberInfo)
  return (
    <Container>
      <p>exchange</p>
      <BottomNav isPage={isPage} flag={flag} handleFlag={handleFlag} />
    </Container>
  )
}

export default Exshange
