import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  text_field: {
    marginBottom: 16,
  },
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
}))

const EditHousework = ({
  editHouseworkIndex,
  houseworkListInfo,
  // updateFirestoreOfHouseworkInfo,
  updateFirestore,
  handleBackEditHouseworkList,
}) => {
  const classes = useStyles()
  const housework = houseworkListInfo[editHouseworkIndex]
  const history = useHistory()
  const [name, setName] = useState()
  const [earnedPoint, setEarnedPoint] = useState()

  //InputFeildに渡すnameとearnedPoint をstateで管理して、<SubmitBtn>に渡す
  //その際にfamiliIdとhouseworkIdを渡す
  //その情報をApp.jsxに持っていって、firebaseを更新する
  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    // console.log({ value })
    if (identificationName === 'name') {
      setName(value)
      // housework.name = name //最後の一文字まで更新されない・・・！このターンでは前回setされたstateを参照してしまうから！なぜ？
      housework.name = value
    } else if (identificationName === 'earnedPoint') {
      setEarnedPoint(value)
      housework.earnedPoint = value
    }
    // console.log({ housework })
  }
  // console.log({ housework })

  // housework.name = name
  // housework.earnedPoint = earnedPoint
  useEffect(() => {
    setName(housework.name)
    setEarnedPoint(housework.earnedPoint)
  }, [])
  return (
    <Container>
      <BackBtn handleBack={handleBackEditHouseworkList} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            家事編集
          </ListSubheader>
        }
        className={classes.root}
      >
        <InputField required={true} identificationName="name" label="名前" value={name} handleChange={handleChange} />
        <InputField
          required={true}
          identificationName="earnedPoint"
          label="獲得ポイント"
          value={earnedPoint}
          handleChange={handleChange}
        />
        <SubmitBtn
          value="変更する"
          // id={housework.id}
          firestoreTask={updateFirestore}
          // flag={flag}
          // name={name}
          // earnedPoint={earnedPoint}
          data={housework}
          updateTarget={['name', 'earnedPoint']}
          firestoreRef="housework"
          handleBackPage={handleBackEditHouseworkList}
        />
      </List>
    </Container>
  )
}

export default EditHousework
