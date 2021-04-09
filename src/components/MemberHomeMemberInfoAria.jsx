import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, Grid } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'

const useStyles = makeStyles(() => ({
  name: {
    fontWeight: 'bold',
    fontSize: 20,
  },
}))

//TODO ポイントの加算時にコマ送りで表示
//TODO ポイントの加算時に'+100p'が出てきて消えるモーション バッチ？
const MemberHomeMemberInfoAria = ({ memberInfo }) => {
  const classes = useStyles()
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <p className={classes.name}>{memberInfo.name}</p>
          <p>{memberInfo.level}Lv</p>
        </Grid>
        <Grid item xs={6}>
          <p>{memberInfo.point}Point</p>

          <Button>熟練度</Button>
        </Grid>
      </Grid>
      <p>
        連続10日達成!!<span> 換金率+10%up</span>
      </p>
      <StatusBar memberInfo={memberInfo} />
    </Container>
  )
}

export default MemberHomeMemberInfoAria
