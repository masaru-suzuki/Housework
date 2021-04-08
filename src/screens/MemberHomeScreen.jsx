import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import { withStyles } from '@material-ui/core'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import Container from '@material-ui/core/Container'

import MoneyIcon from '@material-ui/icons/Money'
import { makeStyles } from '@material-ui/core/styles'
import BackBtn from '../uikit/BackBtn'
import BottomNav from '../components/BottomNav'
import MemberInfoArea from '../components/MemberInfoArea'
import HouseworkListArea from './EditHouseworkList'

const styles = () => {
  btnSelected: {
    color: '#000'
  }
}
const useStyles = makeStyles({
  root: {
    backgroundColor: 'unset',
  },
  selected: {
    color: '#ccc',
  },
  bottom_nav: {
    backgroundColor: '#525edc',
    position: 'fixed',
    bottom: 0,
    padding: 'unset',
  },
  nav_action: {
    maxWidth: 'unset',
  },
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
})
//TODO selected => color #fff
const MemberHomeScreen = ({ memberInfo, houseworkListInfo, handleBackHome }) => {
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const history = useHistory()

  return (
    <div>
      <Container maxWidth="md">
        <BackBtn className={classes.btn_back} handleBack={handleBackHome} />
        <MemberInfoArea memberInfo={memberInfo} />
        <HouseworkListArea />
      </Container>
      <Container className={classes.bottom_nav}>
        <BottomNav />
      </Container>
    </div>
  )
}

export default MemberHomeScreen
