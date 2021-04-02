import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import {
  Card,
  ListSubheader,
  Avatar,
  CardContent,
  Typography,
  List,
  IconButton,
  Container,
  Button,
  Divider,
  CardActionArea,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { ThemeProvider } from '@material-ui/styles'

import EditMember from './EditMember'
import AddMember from './AddMember'
import AddHousework from './AddHousework'
import BackBtn from '../uikit/BackBtn'

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    maxWidth: 600,
    width: '100%',
    height: '10%',
    margin: 10,
  },
  content_area: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  container: {
    flexGrow: 1,
    maxWidth: 600,
    backgroundColor: '#efefef',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: '0 5%',
  },
  img: {
    marginRight: 16,
  },
  img_sp: {
    marginRight: 8,
    width: 20,
    height: 20,
  },
  txtbox: {
    width: '100%',
    display: 'flex',
  },
  card_txt: {
    lineHeight: 3,
    verticalAlign: 'middle',
    paddingLeft: 16,
  },
  divider: {
    margin: '0 4px',
  },
  btn_back: {
    marginTop: 8,
    width: 30,
    fontSize: 16,
  },
  btn_icon: {
    margin: 0,
  },
  btn: {
    margin: 24,
  },
}))
//theme color change
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6587ae',
    },
    secondary: {
      main: '#765759',
    },
  },
})

const EditHouseworkList = ({ addHouseworkToFirestore, houseworkListInfo }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)
  // const [editMemberIndex, setEditMemberIndex] = useState('')
  // console.log({ houseworkListInfo })
  const classes = useStyles()
  const history = useHistory()

  //media query
  const isTablet = useMediaQuery({ query: '(min-device-width: 768px)' })
  const isSmartPhone = useMediaQuery({ query: '(max-device-width: 767px)' })

  const handleBackHome = () => {
    console.log({ history })
    history.push({ pathname: '/' })
  }

  //isSetを変更する
  // const handleIsEdit = () => {
  //   setIsEdit(false)
  // }
  //isAddを変更する
  const handleIsAdd = () => {
    setIsAdd(false)
    console.log({ isAdd })
  }

  //EditMember.jsxへ
  // const handleEditMember = (i) => {
  //   setEditMemberIndex(i)
  //   setIsEdit(true)
  // }

  //EditMember.jsxでsubmit buttonを押した際に使いたい
  // const handleSubmitMember = async (member) => {
  //   await updateFirestoreOfhouseworkInfo(member)
  //   handleBackHome()
  // }

  //flagをfalseにしてEditHousework画面に戻る
  const handleBackEditHouseworkList = () => {
    setIsEdit(false)
    setIsAdd(false)
  }
  //メンバー編集画面、メンバー追加画面はflagを使って対応させる
  if (isAdd && !isEdit) {
    return (
      <AddHousework
        addHouseworkToFirestore={addHouseworkToFirestore}
        flag="isAdd"
        handleIsAdd={handleIsAdd}
        // membersInfo={membersInfo}
        handleBackEditHouseworkList={handleBackEditHouseworkList}
      />
    )
  } else if (!isAdd && isEdit) {
    return (
      <EditMember
        membersInfo={membersInfo}
        editMemberIndex={editMemberIndex}
        updateFirestoreOfhouseworkInfo={updateFirestoreOfhouseworkInfo}
        flag="isEdit"
        handleEditMember={handleEditMember}
        handleIsEdit={handleIsEdit}
        handleBackEditHouseworkList={handleBackEditHouseworkList}
      />
    )
  } else if (!isAdd && !isEdit) {
    return (
      <Container className={classes.container} maxWidth="sm">
        <BackBtn handleBack={handleBackHome} />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader disableSticky component="div" id="nested-list-subheader">
              家事編集
            </ListSubheader>
          }
          className={classes.root}
        >
          {houseworkListInfo.map((houseworkInfo, i) => {
            return (
              <Card className={classes.card} key={i}>
                <CardActionArea
                  houseworkInfo={houseworkInfo}
                  // handleSubmitMember={(member) => handleSubmitMember(member)}
                  // handleSubmitMember={handleSubmitMember}
                  // onClick={() => handleEditMember(i)}
                >
                  <CardContent className={classes.txtbox}>
                    {isSmartPhone && (
                      <CardContent className={classes.content_area}>
                        <Typography
                          align="left"
                          display="inline"
                          // gutterBottom
                          variant="subtitle2"
                        >
                          {houseworkInfo.name}
                        </Typography>
                        <Typography
                          className={classes.card_txt}
                          display="inline"
                          variant="caption"
                          color="textSecondary"
                          component="p"
                        >
                          {houseworkInfo.earnedPoint}
                        </Typography>
                      </CardContent>
                    )}

                    {isTablet && (
                      <CardContent className={classes.content_area}>
                        <Typography
                          align="left"
                          display="inline"
                          // gutterBottom
                          variant="h5"
                          component="p"
                        >
                          {houseworkInfo.name}
                        </Typography>
                        <Typography
                          className={classes.card_txt}
                          display="inline"
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          {houseworkInfo.earnedPoint}
                        </Typography>
                        <Typography
                          className={classes.card_txt}
                          display="inline"
                          variant="body1"
                          color="textSecondary"
                          component="p"
                        >
                          {houseworkInfo.description}
                        </Typography>
                      </CardContent>
                    )}
                  </CardContent>
                </CardActionArea>
                <ThemeProvider theme={theme}>
                  {/* <Divider className={classes.divider} orientation="vertical" flexItem />
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    houseworkInfo={houseworkInfo}
                    // handleSubmitMember={(member) => handleSubmitMember(member)}
                    handleSubmitMember={handleSubmitMember}
                    onClick={() => handleEditMember(i)}
                  >
                    <EditIcon />
                  </IconButton> */}
                  <Divider className={classes.divider} orientation="vertical" flexItem />
                  <IconButton
                    color="secondary"
                    /*onClick={() => deleteFirestoreMember(houseworkInfo.id)}*/ aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ThemeProvider>
              </Card>
            )
          })}
        </List>
        <Button
          variant="contained"
          onClick={() => setIsAdd(true)}
          color="primary"
          className={classes.btn}
          startIcon={<AddIcon />}
        >
          家事を追加する
        </Button>
      </Container>
    )
  }
}

export default EditHouseworkList
