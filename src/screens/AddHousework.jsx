import React, { useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import { initHousework } from '../initialData'

const AddHousework = ({ handleIsAdd, flag, addFirestore, handleBackEditHouseworkList }) => {
  const [name, setName] = useState('')
  const [earnedPoint, setEarnedPoint] = useState('')
  const [description, setDescription] = useState('')
  let housework = initHousework()

  housework.name = name
  housework.earnedPoint = earnedPoint
  housework.description = description
  console.log({ housework })

  //textare への入力をする
  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    console.log(identificationName)
    console.log(value)
    if (identificationName === 'name') {
      setName(value)
    } else if (identificationName === 'earnedPoint') {
      setEarnedPoint(value)
    } else if (identificationName === 'description') {
      setDescription(value)
    }
  }

  return (
    <Container>
      <BackBtn handleBack={handleBackEditHouseworkList} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            家事追加
          </ListSubheader>
        }
      >
        <InputField
          required={true}
          identificationName="name"
          label="家事の名前"
          value={name}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          identificationName="earnedPoint"
          label="獲得ポイント"
          value={earnedPoint}
          handleChange={handleChange}
        />
        <InputField
          required={false}
          identificationName="description"
          label="説明"
          value={description}
          handleChange={handleChange}
        />
        <SubmitBtn
          value="登録する"
          firestoreTask={addFirestore}
          data={housework}
          targetRef="housework"
          // flag={flag}
          handleBackPage={handleIsAdd} //ここ対応していないのなんでだっけ？？
        />
      </List>
    </Container>
  )
}

export default AddHousework
