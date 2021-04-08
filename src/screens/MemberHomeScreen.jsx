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
import HouseworkListArea from '../components/HouseworkListArea'
import ContentsArea from '../components/ContentsArea'

const styles = () => {
  btnSelected: {
    color: '#000'
  }
}
const useStyles = makeStyles({
  container: {
    display: 'grid',
    height: '100vh',
    gridTemplateRows: '1fr auto',
    backgroundColor: 'unset',
    width: '100%',
    overflow: 'hidden',
    padding: 0,
  },

  btn_back: {
    margin: '8px 16px',
    width: 30,
    fontSize: 16,
  },
})
//TODO selected => color #fff
const MemberHomeScreen = ({ memberInfo, houseworkListInfo, handleBackHome }) => {
  const [value, setValue] = useState(0)
  const classes = useStyles()
  const [flag, setFlag] = useState({ isExchange: false, isHome: true, isUsePont: false })

  const handleFlag = (text) => {
    console.log({ text })
    for (let key in flag) {
      if (flag[key]) setFlag((prevState) => ({ ...prevState, [key]: false }))
    }
    setFlag((prevState) => ({ ...prevState, [text]: true }))
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <ContentsArea memberInfo={memberInfo} houseworkListInfo={houseworkListInfo} handleBackHome={handleBackHome} />
      <BottomNav flag={flag} handleFlag={handleFlag} />
    </Container>
  )
}

export default MemberHomeScreen
