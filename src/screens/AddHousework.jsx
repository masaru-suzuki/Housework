import React, { useState } from 'react'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import { initHousework } from '../initialData'

const AddHousework = ({ addFiestoreHousework, handleBackEditHouseworkList }) => {
  const [housework, setHousework] = useState(initHousework())

  //textare への入力をする
  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    if (identificationName === 'name') {
      setHousework((prevState) => ({ ...prevState, name: String(value) }))
    } else if (identificationName === 'earnedPoint') {
      setHousework((prevState) => ({ ...prevState, earnedPoint: Number(value) }))
    } else if (identificationName === 'description') {
      setHousework((prevState) => ({ ...prevState, description: String(value) }))
    }
  }

  const onSubmitEvent = () => {
    addFiestoreHousework(housework)
    handleBackEditHouseworkList()
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
          value={housework.name}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          identificationName="earnedPoint"
          label="獲得ポイント"
          value={housework.earnedPoint}
          handleChange={handleChange}
        />
        <InputField
          required={false}
          identificationName="description"
          label="説明"
          value={housework.description}
          handleChange={handleChange}
        />
        <SubmitBtn onSubmitEvent={onSubmitEvent} text="家事を登録する" />
      </List>
    </Container>
  )
}

export default AddHousework
