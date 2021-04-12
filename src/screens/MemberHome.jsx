import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import BottomNav from '../components/BottomNav'
import BackBtn from '../uikit/BackBtn'
import ContentsArea from './ContentsArea'

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
    height: '100%',
    gridTemplateRows: '40px 10px 150px 10px 1fr',
    overflow: 'hidden',
  },
  btn_back: {
    margin: '8px 16px',
    width: 30,
    fontSize: 16,
  },
})
const MemberHome = ({ memberInfo, houseworkListInfo, handleBackHome, finishBtnEvent, resetFirestoreHousework }) => {
  const classes = useStyles()
  const [flag, setFlag] = useState({ isExchange: false, isHome: true, isCash: false })
  const [isPage, setIsPage] = useState('isHome')

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
  //finish button
  const handleFinishBtn = (housework) => {
    finishBtnEvent(memberInfo, housework)
  }

  useState(() => {}, [])
  return (
    <Container maxWidth="md" className={classes.container}>
      <div className={classes.root}>
        <BackBtn className={classes.btn_back} handleBack={handleBackHome} />
        <Divider className={classes.divider} />
        <ContentsArea
          memberInfo={memberInfo}
          houseworkListInfo={houseworkListInfo}
          handleBackHome={handleBackHome}
          handleFinishBtn={handleFinishBtn}
          handleFlag={handleFlag}
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
