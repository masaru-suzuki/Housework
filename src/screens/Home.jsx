import React from 'react'
import DrawerNav from '../components/DrawerNav'
import {makeStyles} from '@material-ui/core/styles'
import {Container, Grid} from '@material-ui/core'
import MemberCard from '../components/MemberCard'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#efefef',
  },
}))

const Home = ({membersInfo}) => {
  // console.log({membersInfo})
  const classes = useStyles()
  return (
    <Container className={classes.root} maxWidth="sm">
      <DrawerNav membersInfo={membersInfo} />
      {/* <button onClick={() => handleHome()}>back</button> */}
      <p>Home</p>
      <Grid container spacing={3}>
        {membersInfo.map((memberInfo) => {
          // console.log(memberInfo)
          return (
            <Grid item xs={12} sm={6} key={memberInfo.memberId}>
              <MemberCard memberInfo={memberInfo} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

export default Home
