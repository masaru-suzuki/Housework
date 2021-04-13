import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import BottomNav from '../components/BottomNav'
import BackBtn from '../uikit/BackBtn'
import ContentsArea from './ContentsArea'
import MemberHomeMemberInfoAria from '../components/MemberHomeMemberInfoAria'

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
  root: {
    display: 'grid',
    height: '90vh',
    gridTemplateRows: '40px 10px 180px 10px auto',
    overflow: 'hidden',
  },
  btn_back: {
    margin: '8px 16px',
    width: 30,
    // height: 20,
    fontSize: 16,
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
        <BackBtn className={classes.btn_back} handleBack={handleBackHome} />
        <Divider className={classes.divider} />
        <MemberHomeMemberInfoAria memberInfo={memberInfo} clickedHousework={clickedHousework} />
        <Divider className={classes.divider} />
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
        isPage={isPage}
        flag={flag}
        handleFlag={handleFlag}
        resetFirestoreHousework={resetFirestoreHousework}
      />
    </Container>
  )
}

export default MemberHome
