import React, { useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import { ListSubheader, List, Container } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import { initMember } from '../initialData'

const AddMember = ({ addMemberToFirestore, handleIsAdd, flag, handleBackEditFamily }) => {
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')

  let member = initMember()

  member.name = name
  member.birth = birth

  //textare への入力をする
  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    if (identificationName === 'name') {
      setName(value)
    } else if (identificationName === 'birth') {
      setBirth(value)
    }
  }

  return (
    <Container>
      <BackBtn handleBackEditFamily={handleBackEditFamily} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            家族追加
          </ListSubheader>
        }
      >
        <InputField required={true} identificationName="name" label="名前" value={name} handleChange={handleChange} />
        <InputField
          required={true}
          identificationName="birth"
          label="生年月日"
          value={birth}
          handleChange={handleChange}
        />
        <SubmitBtn
          value="登録する"
          addMemberToFirestore={addMemberToFirestore}
          member={member}
          flag={flag}
          handleBackEditFamily={handleIsAdd}
        />
      </List>
    </Container>
  )
}

export default AddMember
