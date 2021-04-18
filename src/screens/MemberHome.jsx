import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core'
import BottomNav from '../components/BottomNav'
import BackBtn from '../uikit/BackBtn'
import ContentsArea from './ContentsArea'
import MemberHomeMemberInfoAria from '../components/MemberHomeMemberInfoAria'
import ErrorModal from '../components/ErrorModal'

const navHeight = 55
const useStyles = makeStyles({
  container: {
    minHeight: '100vh',
    backgroundColor: 'unset',
    width: '100%',
    overflow: 'hidden',
    padding: 0,
    margin: 0,
    paddingBottom: navHeight,
    position: 'relative',
  },
  root: {
    display: 'grid',
    height: `calc(100vh - ${navHeight}px)`,
    gridTemplateRows: '40px 10px 160px 10px auto',
    overflow: 'hidden',
  },
  btn_back: {
    margin: '8px 16px',
    width: 30,
    fontSize: 16,
  },
  navigation: {
    width: '100%',
    height: navHeight,
    position: 'fixed',
    bottom: 0,
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
  const [open, setOpen] = useState(false)
  const { point } = memberInfo

  //家事取り消し時に所持ポイントよりも家事の獲得ポイントが大きかった時に取り消しをできなくする
  const toggleErrorModal = (point, earnedPoint, isDone) => {
    //家事をやっていなければ、cancelの判定は行わない
    if (isDone === false) return

    if (point < earnedPoint) {
      console.log('can not cancel because point <= earnedPoint')
      //error modal
      console.log('open error modal')
      setOpen(true)
      return true
    } else {
      return false
    }
  }
  const handleClose = () => {
    setOpen(false)
  }
  const onSubmitEvent = () => {
    handleClose()
  }

  const toggleBudge = (housework) => {
    //処理中断をトグルするflag trueになるとmodalが出現
    let cancel = false
    const { earnedPoint, isDone } = housework
    //家事取り消し時に所持ポイントよりも家事の獲得ポイントが大きかった時に取り消しをできなくする
    cancel = toggleErrorModal(point, earnedPoint, isDone)
    if (cancel) {
      return
    } else {
      finishBtnEvent(memberInfo, housework) //houseworkの状態をFirestoreに登録
      setClikedHousework(housework)
    }
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
      <div className={classes.navigation}>
        <BottomNav
          isPage={isPage}
          flag={flag}
          handleFlag={handleFlag}
          resetFirestoreHousework={resetFirestoreHousework}
        />
      </div>
      <ErrorModal onSubmitEvent={onSubmitEvent} handleClose={handleClose} open={open} />
    </Container>
  )
}

export default MemberHome
