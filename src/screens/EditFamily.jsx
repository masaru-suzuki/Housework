import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useMediaQuery} from 'react-responsive'
import {makeStyles} from '@material-ui/core/styles'
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
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import EditMember from './EditMember'

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
const EditFamily = ({membersInfo, updateFirestoreOfMemberInfo}) => {
  const [isEdit, setIsEdit] = useState(false)
  const [editMemberIndex, setEditMemberIndex] = useState('')
  // console.log({editMemberIndex})
  const classes = useStyles()
  const history = useHistory()

  //media query
  const isTablet = useMediaQuery({query: '(min-device-width: 768px)'})
  const isSmartPhone = useMediaQuery({query: '(max-device-width: 767px)'})

  const handleBackHome = () => {
    console.log({history})
    history.push({pathname: '/'})
  }
  // console.log({history})

  //isSetを変更する
  const handleIsEdit = () => {
    setIsEdit(false)
  }

  //EditMember.jsxへ
  const handleEditMember = (i) => {
    setEditMemberIndex(i)
    setIsEdit(true)
  }

  //EditMember.jsxでsubmit buttonを押した際に使いたい
  const handleSubmitMember = async (member) => {
    await updateFirestoreOfMemberInfo(member)
    handleBackHome()
  }
  if (isEdit) {
    return (
      <>
        <EditMember
          membersInfo={membersInfo}
          editMemberIndex={editMemberIndex}
          updateFirestoreOfMemberInfo={updateFirestoreOfMemberInfo}
          handleEditMember={handleEditMember}
          handleIsEdit={handleIsEdit}
        />
      </>
    )
  } else {
    return (
      <Container className={classes.container} maxWidth="sm">
        <Button
          variant="text"
          color="inherit"
          size="small"
          className={classes.btn_back}
          onClick={() => handleBackHome()}
          startIcon={<ArrowBackIosIcon className={classes.btn_icon} />}
        >
          back
        </Button>
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader disableSticky component="div" id="nested-list-subheader">
              家族編集
            </ListSubheader>
          }
          className={classes.root}
        >
          {membersInfo.map((memberInfo, i) => {
            return (
              <Card className={classes.card} key={i}>
                <CardContent className={classes.txtbox}>
                  {isSmartPhone && (
                    <CardContent className={classes.content_area}>
                      <Avatar className={classes.img_sp} variant="circular" />
                      <Typography
                        align="left"
                        display="inline"
                        // gutterBottom
                        variant="subtitle2"
                      >
                        {memberInfo.name}
                      </Typography>
                    </CardContent>
                  )}

                  {isTablet && (
                    <CardContent className={classes.content_area}>
                      <Avatar className={classes.img} variant="circular" />
                      <Typography
                        align="left"
                        display="inline"
                        // gutterBottom
                        variant="h5"
                        component="p"
                      >
                        {memberInfo.name}
                      </Typography>
                      <Typography
                        className={classes.card_txt}
                        display="inline"
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        {memberInfo.level} Lv
                      </Typography>
                      <Typography
                        className={classes.card_txt}
                        display="inline"
                        variant="body1"
                        color="textSecondary"
                        component="p"
                      >
                        {memberInfo.point}Point
                      </Typography>
                    </CardContent>
                  )}
                </CardContent>
                <Divider className={classes.divider} orientation="vertical" flexItem />
                <IconButton
                  aria-label="edit"
                  memberInfo={memberInfo}
                  // handleSubmitMember={(member) => handleSubmitMember(member)}
                  handleSubmitMember={handleSubmitMember}
                  onClick={() => handleEditMember(i)}
                >
                  <EditIcon />
                </IconButton>

                {/* <Divider className={classes.divider} orientation="vertical" flexItem />
                <Link to={{pathname: '/EditMember', state: memberInfo}}>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Link> */}

                <Divider className={classes.divider} orientation="vertical" flexItem />
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Card>
            )
          })}
        </List>
        <Button variant="contained" color="primary" className={classes.btn} startIcon={<AddIcon />}>
          家族を追加する
        </Button>
      </Container>
    )
  }
}

export default EditFamily
