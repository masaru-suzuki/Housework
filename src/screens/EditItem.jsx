import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
  },
  input_field: {
    marginBottom: 12,
  },
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
  submit_btn: {
    marginBottom: 12,
  },
}))

const EditItem = ({ member, items, editItemIndex, updateFirestoreItem }) => {
  const classes = useStyles()

  const item = items[editItemIndex]
  // const handleChange = (event) => {
  //   const identificationName = event.target.name
  //   const value = event.target.value
  //   if (identificationName === 'name') {
  //     setMemberData((prevState) => ({ ...prevState, name: String(value) }))
  //   } else if (identificationName === 'requiredPoint') {
  //     setMemberData((prevState) => ({ ...prevState, requiredPoint: Number(value) }))
  //   }
  // }
  // //submitBtnで使うfunction
  // const onSubmitEvent = () => {
  //   updateFirestoreMember(memberData)
  //   handleBackEditFamily()
  // }
  // const handelEditItems = () => {
  //   setFlag('editItems')
  // }
  const handleBackEditFamily = () => console.log('handle')
  return (
    <Container>
      <BackBtn handleBack={handleBackEditFamily} className={classes.btn_back} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            アイテム編集
          </ListSubheader>
        }
        className={classes.root}
      >
        <InputField
          className={classes.input_field}
          required={true}
          identificationName="name"
          label="名前"
          value={item.name}
          // handleChange={handleChange}
        />
        <InputField
          className={classes.input_field}
          required={true}
          identificationName="requiredPoint"
          label="必要ポイント"
          value={item.requiredPoint}
          // handleChange={handleChange}
        />
      </List>
      <SubmitBtn
        className={classes.submit_btn}
        text="変更する"
        // onSubmitEvent={onSubmitEvent}
      />
    </Container>
  )
}

export default EditItem
