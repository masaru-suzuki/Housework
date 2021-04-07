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

const EditMember = ({ editMemberIndex, membersInfo, updateFirestoreMember, handleBackEditFamily }) => {
  const classes = useStyles()
  const member = membersInfo[editMemberIndex]
  const [memberData, setMemberData] = useState(member)

  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    if (identificationName === 'name') {
      setMemberData((prevState) => ({ ...prevState, name: value }))
    } else if (identificationName === 'birth') {
      setMemberData((prevState) => ({ ...prevState, birth: value }))
    }
  }
  //submitBtnで使うfunction
  const onSubmitEvent = () => {
    updateFirestoreMember(memberData)
    handleBackEditFamily()
  }
  return (
    <Container>
      <BackBtn handleBack={handleBackEditFamily} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            家族編集
          </ListSubheader>
        }
        className={classes.root}
      >
        <InputField
          required={true}
          identificationName="name"
          label="名前"
          value={memberData.name}
          handleChange={handleChange}
        />
        <InputField
          required={true}
          identificationName="birth"
          label="生年月日"
          value={memberData.birth}
          handleChange={handleChange}
        />
        <SubmitBtn text="変更する" onSubmitEvent={onSubmitEvent} />
      </List>
    </Container>
  )
}

export default EditMember
