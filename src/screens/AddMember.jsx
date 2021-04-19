import React, { useEffect, useState } from 'react'
import { ListSubheader, List, Container, makeStyles } from '@material-ui/core'
import BackBtn from '../uikit/BackBtn'
import SubmitBtn from '../uikit/SubmitBtn'
import InputField from '../uikit/InputField'
import { initMember } from '../initialData'

const useStyles = makeStyles({
  input_field: {
    marginBottom: 16,
  },
})
const AddMember = ({ addFiestoreMember, handleBackEditFamily }) => {
  const classes = useStyles()
  const [memberData, setMemberData] = useState({})

  const handleChange = (event) => {
    const identificationName = event.target.name
    const value = event.target.value
    if (identificationName === 'name') {
      setMemberData((prevState) => ({ ...prevState, name: String(value) }))
    } else if (identificationName === 'birth') {
      setMemberData((prevState) => ({ ...prevState, birth: Number(value) }))
    }
  }
  //SubmitBtn
  const onSubmitEvent = () => {
    addFiestoreMember(memberData)
    handleBackEditFamily()
  }
  useEffect(() => {
    setMemberData(initMember())
  }, [])

  return (
    <Container>
      <BackBtn handleBack={handleBackEditFamily} />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader disableSticky component="div">
            家族追加
          </ListSubheader>
        }
      >
        <InputField
          className={classes.input_field}
          required={true}
          identificationName="name"
          label="名前"
          value={memberData.name}
          handleChange={handleChange}
        />
        <InputField
          className={classes.input_field}
          required={true}
          identificationName="birth"
          label="生年月日"
          value={memberData.birth}
          handleChange={handleChange}
        />
        <SubmitBtn text="登録する" onSubmitEvent={onSubmitEvent} />
      </List>
    </Container>
  )
}

export default AddMember
