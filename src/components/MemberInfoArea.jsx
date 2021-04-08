import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, Grid, Paper } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'

const useStyles = makeStyles(() => ({
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
}))

const MemberInfoArea = ({ memberInfo }) => {
  const classes = useStyles()
  console.log(memberInfo)
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <p className={classes.name}>{memberInfo.name}</p>
          <p>{memberInfo.level}Lv</p>
          <p>
            連続10日<span>換金率+10%up</span>
          </p>
        </Grid>
        <Grid item xs={6}>
          <p>{memberInfo.point}Point</p>

          <Button>熟練度</Button>
        </Grid>
      </Grid>
      <StatusBar memberInfo={memberInfo} />
    </Container>
  )
}

export default MemberInfoArea
