import React, { useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, Grid } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'
import anime from 'animejs'

const useStyles = makeStyles(() => ({
  container: {
    padding: '0 16px',
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
    top: 10,
    right: 10,
    transition: '1s',
    opacity: 1,
  },
  // earned_point_isActive: {
  //   position: 'absolute',
  //   top: 10,
  //   right: 10,
  //   transition: '.5s',
  //   opacity: 0,
  // },
  btn: {
    height: 24,
    marginBottom: 0,
  },
}))
//TODO level calcuration
//TODO ポイントの加算時にコマ送りで表示
//TODO ポイントの加算時に'+100p'が出てきて消えるモーション バッチ？
const MemberHomeMemberInfoAria = ({ memberInfo }) => {
  const classes = useStyles()
  //pointを他の変数に代入して増やしていく
  // const [prevPoint, setPrevPoint] = useState(0)
  const [earnedPoint, setEarnedPoint] = useState(100) //仮に100pointとしておく
  const [isActive, setIsActive] = useState(false)
  //isActiveを監視して、isActiveになったらアニメーションをスタート
  const ref = useRef(null)
  console.log(ref.current)
  if (isActive) {
    anime({
      targets: ref.current,
      translateY: [-20, -20, -20, 0],
      opacity: [1, 1, 0, 0],
      easing: 'spring(1, 60, 0)',
    })
    setIsActive(false)
  }
  return (
    <Container className={classes.container}>
      <button
        onClick={() => {
          setIsActive(!isActive)
          console.log(isActive)
        }}
      >
        toggle
      </button>
      <Grid className={classes.grid_box} container spacing={1}>
        <Grid item xs={7}>
          <p className={classes.name}>{memberInfo.name}</p>
          <p className={classes.level}>{memberInfo.level}Lv</p>
        </Grid>
        <Grid className={classes.right_box} item xs={5}>
          <p className={classes.point}>{memberInfo.point}Point</p>
          <span ref={ref} className={classes.earned_point}>
            {earnedPoint}
          </span>
          <Button className={classes.btn} variant="contained" color="primary" size="small">
            熟練度
          </Button>
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
