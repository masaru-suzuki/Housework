import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import BottomNav from '../components/BottomNav'
import ContentsArea from '../components/ContentsArea'
import Cash from './Cash'
import Exchange from './Exchange'

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
  if (isPage === 'isHome') {
    return (
      <Container maxWidth="md" className={classes.container}>
        <ContentsArea
          memberInfo={memberInfo}
          houseworkListInfo={houseworkListInfo}
          handleBackHome={handleBackHome}
          handleFinishBtn={handleFinishBtn}
        />
        <BottomNav
          isPage={isPage}
          flag={flag}
          handleFlag={handleFlag}
          resetFirestoreHousework={resetFirestoreHousework}
        />
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
