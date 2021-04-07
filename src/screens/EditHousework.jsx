import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'

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
  updateFirestoreHousework,
  handleBackEditHouseworkList,
}) => {
  const classes = useStyles()
  const housework = houseworkListInfo[editHouseworkIndex]
  const [houseworkData, setHouseworkData] = useState(housework)
  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    if (identificationName === 'name') {
      setHouseworkData((prevState) => ({ ...prevState, name: value }))
    } else if (identificationName === 'earnedPoint') {
      setHouseworkData((prevState) => ({ ...prevState, earnedPoint: value }))
    } else if (identificationName === 'description') {
      setHouseworkData((prevState) => ({ ...prevState, description: value }))
    }
  }
  //SubmitBtn
  const onSubmitEvent = () => {
    updateFirestoreHousework(houseworkData)
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
            家事編集
          </ListSubheader>
        }
        className={classes.root}
      >
        <InputField
          required={true}
          identificationName="name"
          label="名前"
          value={houseworkData.name}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          identificationName="earnedPoint"
          label="獲得ポイント"
          value={houseworkData.earnedPoint}
          handleChange={handleChange}
        />
        <InputField
          identificationName="description"
          label="説明"
          value={houseworkData.description}
          handleChange={handleChange}
        />
        <SubmitBtn text="変更する" onSubmitEvent={onSubmitEvent} />
      </List>
    </Container>
  )
}

export default EditHousework
