import React, { useState } from 'react'
import { ListSubheader, List, Container, makeStyles } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import InputFieldMultiline from '../uikit/InputFieldMultiline'
import { initHousework } from '../initialData'

const useStyles = makeStyles({
  input_field: {
    marginBottom: 16,
  },
})
const AddHousework = ({ addFiestoreHousework, handleBackEditHouseworkList }) => {
  const classes = useStyles()
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
          className={classes.input_field}
          required={true}
          identificationName="name"
          label="家事の名前"
          value={housework.name}
          handleChange={handleChange}
        />
        <InputField
          className={classes.input_field}
          required={true}
          identificationName="earnedPoint"
          label="獲得ポイント"
          value={housework.earnedPoint}
          handleChange={handleChange}
        />
        <InputFieldMultiline
          className={classes.input_field}
          required={false}
          identificationName="description"
          multiline
          rows={4}
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
