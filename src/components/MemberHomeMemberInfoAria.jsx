import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Grid } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'
import anime from 'animejs'

const useStyles = makeStyles(() => ({
  container: {
    padding: '16px 16px 24px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
  },
  grid_box: {
    // padding: '0 8px',
  },
  level: {
    marginBottom: 0,
  },
  right_box: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
  },
  point: {
    marginBottom: 12,
    marginTop: 12,
  },
  earned_point: {
    position: 'absolute',
    top: 0,
    right: 40,
  },
  btn: {
    height: 24,
    marginBottom: 0,
  },
}))

const MemberHomeMemberInfoAria = ({ memberInfo, clickedHousework }) => {
  const classes = useStyles()
  const ref = useRef(null)
  const { id, earnedPoint, isDone } = clickedHousework
  const { name, point, level, runningDay } = memberInfo
  const plusEarnedPoint = earnedPoint ? `+ ${earnedPoint}` : '' //初回のレンダリングでundefinedを表示させない

  useEffect(() => {
    // console.log({ clickedHousework })
    // console.log({ isDone })
    //isDoneはクリック時点のものだから、反転させる必要がある
    if (!isDone) {
      anime({
        targets: ref.current,
        translateY: [0, -10],
        opacity: [1, 0],
        duration: 400,
        easing: 'easeInOutExpo',
      })
    }
  }, [id, isDone])

  return (
    <Container className={classes.container}>
      <Grid className={classes.grid_box} container spacing={1}>
        <Grid item xs={7}>
          <p className={classes.name}>{name}</p>
          <p className={classes.level}>{level}Lv</p>
        </Grid>
        <Grid className={classes.right_box} item xs={5}>
          <p className={classes.point}>{point}Point</p>
          <span ref={ref} className={classes.earned_point}>
            {plusEarnedPoint}
          </span>
          {/* <Button className={classes.btn} variant="contained" color="primary" size="small">
            熟練度
          </Button> */}
        </Grid>
      </Grid>
      <p>
        家事連続{runningDay}日目<span> 換金率+{runningDay}%up</span>
      </p>
      <StatusBar memberInfo={memberInfo} />
    </Container>
  )
}

export default MemberHomeMemberInfoAria
