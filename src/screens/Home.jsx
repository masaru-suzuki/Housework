import React, { useState } from 'react'
import DrawerNav from '../components/DrawerNav'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Grid, Paper } from '@material-ui/core'
import MemberCard from '../components/MemberCard'
import MemberHome from './MemberHome'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    // backgroundColor: '#efefef',
  },
  root_no_data: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  no_data: {
    width: '100%',
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#efefef',
    margin: 'auto',
  },
}))

const Home = ({
  membersInfo,
  houseworkListInfo,
  finishBtnEvent,
  resetFirestoreHousework,
  exchangeCash,
  exhangeItems,
  getMemberId,
  items,
}) => {
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
        exhangeItems={exhangeItems}
        getMemberId={getMemberId}
        items={items}
      />
    )
  } else if (!isMemberScreen && membersInfo.length === 0) {
    return (
      <Container className={classes.root_no_data} maxWidth="sm">
        <DrawerNav membersInfo={membersInfo} />
        <Paper className={classes.no_data}>
          <p>家族データがありません。</p>
          <p>右上のボタンを押して</p>
          <p>データを追加してください。</p>
        </Paper>
      </Container>
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
