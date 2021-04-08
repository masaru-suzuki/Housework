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
import Cash from './Cash'
import Exchange from './Exchange'
import { boolean } from 'yup'

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
const MemberHome = ({ memberInfo, houseworkListInfo, handleBackHome, finishHousework, addPoint, removePoint }) => {
  const classes = useStyles()
  const [flag, setFlag] = useState({ isExchange: false, isHome: true, isCash: false })
  const [isPage, setIsPage] = useState('isHome')
  const [doneHousework, setDoneHousework] = useState([])

  //Bottom Nav
  const handleFlag = (text) => {
    console.log({ text })
    for (let key in flag) {
      if (flag[key]) {
        setFlag((prevState) => ({ ...prevState, [key]: false, [text]: true }))
        setIsPage(text)
      }
    }
  }

  //finish btn action

  const finishBtnEvent = (hosuework, currentIndex) => {
    currentIndex ? addPoint(memberInfo, hosuework) : removePoint(memberInfo, hosuework)
    // finishHousework(memberInfo)
  }

  useState(() => {}, [])
  if (isPage === 'isHome') {
    return (
      <Container maxWidth="md" className={classes.container}>
        <ContentsArea
          memberInfo={memberInfo}
          houseworkListInfo={houseworkListInfo}
          handleBackHome={handleBackHome}
          finishBtnEvent={finishBtnEvent}
          addPoint={addPoint}
          removePoint={removePoint}
        />
        <BottomNav isPage={isPage} flag={flag} handleFlag={handleFlag} />
      </Container>
    )
  } else if (isPage === 'isExchange') {
    return <Exchange isPage={isPage} flag={flag} handleFlag={handleFlag} />
  } else if (isPage === 'isCash') {
    return <Cash isPage={isPage} flag={flag} handleFlag={handleFlag} />
  } else {
    return 'nothing page'
  }
}

export default MemberHome
