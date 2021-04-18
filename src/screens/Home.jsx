import React, { useState } from 'react'
import DrawerNav from '../components/DrawerNav'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid } from '@material-ui/core'
import MemberCard from '../components/MemberCard'
import MemberHome from './MemberHome'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#efefef',
  },
}))

const Home = ({ membersInfo, houseworkListInfo, finishBtnEvent, resetFirestoreHousework, exchangeCash }) => {
  const classes = useStyles()
  const [isMemberScreen, setIsMemberScreen] = useState(false)
  const [memberIndex, setMemberIndex] = useState()

  const handleMemberScreen = (index) => {
    setIsMemberScreen(true)
    setMemberIndex(index)
  }

  const handleBackHome = () => {
    setIsMemberScreen(false)
  }

  const memberInfo = membersInfo[memberIndex]
  if (isMemberScreen) {
    return (
      <MemberHome
        memberInfo={memberInfo}
        houseworkListInfo={houseworkListInfo}
        handleBackHome={handleBackHome}
        finishBtnEvent={finishBtnEvent}
        resetFirestoreHousework={resetFirestoreHousework}
        exchangeCash={exchangeCash}
      />
    )
  } else {
    return (
      <Container className={classes.root} maxWidth="sm">
        <DrawerNav membersInfo={membersInfo} />
        <Grid container spacing={3}>
          {membersInfo.map((memberInfo, index) => {
            return (
              <Grid item xs={12} sm={6} key={memberInfo.id}>
                <MemberCard memberInfo={memberInfo} handleMemberScreen={handleMemberScreen} index={index} />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    )
  }
}

export default Home
