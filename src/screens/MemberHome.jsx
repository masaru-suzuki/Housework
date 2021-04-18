import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import BottomNav from '../components/BottomNav'
import BackBtn from '../uikit/BackBtn'
import ContentsArea from './ContentsArea'
import MemberHomeMemberInfoAria from '../components/MemberHomeMemberInfoAria'

let window_height = '100vh'
document.addEventListener('DOMContentLoaded', () => {
  // ;/iPhone|iPod|iPad|Android/i.test(navigator.userAgent) &&
  if (/iPhone|iPod|iPad|Android/i.test(navigator.userAgent)) {
    // console.log('smart phone')
    // console.log(window.outerHeight)
    window_height = window.outerHeight
  } else {
    window_height = '100vh'
  }
  //   document.documentElement.style.setProperty('--outer-height', `${window.outerHeight}px`)
})

const useStyles = makeStyles({
  container: {
    display: 'grid',
    height: window_height,
    gridTemplateRows: '1fr auto',
    backgroundColor: 'unset',
    width: '100%',
    overflow: 'hidden',
    padding: 0,
  },
  root: {
    display: 'grid',
    height: '100%',
    gridTemplateRows: '60px 180px auto',
    overflow: 'hidden',
  },
  btn_back: {
    margin: '8px 16px',
    width: 30,
    // height: 20,
    fontSize: 16,
  },
  bottom_nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
  },
})
const MemberHome = ({
  memberInfo,
  houseworkListInfo,
  handleBackHome,
  finishBtnEvent,
  exchangeCash,
  resetFirestoreHousework,
}) => {
  const classes = useStyles()
  const [flag, setFlag] = useState({ isExchange: false, isHome: true, isCash: false })
  const [isPage, setIsPage] = useState('isHome')
  const [clickedHousework, setClikedHousework] = useState({}) //housework listでクリックされた家事をセット

  const toggleBudge = (housework) => {
    finishBtnEvent(memberInfo, housework) //houseworkの状態をFirestoreに登録
    setClikedHousework(housework)
  }

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

  useState(() => {}, [])
  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.root}>
        <div>
          <BackBtn className={classes.btn_back} handleBack={handleBackHome} />
          <Divider className={classes.divider} />
        </div>
        <div>
          <MemberHomeMemberInfoAria memberInfo={memberInfo} clickedHousework={clickedHousework} />
          <Divider className={classes.divider} />
        </div>
        <ContentsArea
          memberInfo={memberInfo}
          houseworkListInfo={houseworkListInfo}
          handleBackHome={handleBackHome}
          toggleBudge={toggleBudge}
          handleFlag={handleFlag}
          exchangeCash={exchangeCash}
          isPage={isPage}
          flag={flag}
        />
      </div>
      <BottomNav
        className={classes.bottom_nav}
        isPage={isPage}
        flag={flag}
        handleFlag={handleFlag}
        resetFirestoreHousework={resetFirestoreHousework}
      />
    </Container>
  )
}

export default MemberHome
