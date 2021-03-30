import React from 'react'
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

// const memberListMock = [
//   {
//     name: 'John Doe',
//     birth: 'what is this field',
//     level: 100,
//     experiencePoint: 500,
//     requiredExperiencePoint: 1000,
//     point: 42,
//   },
//   {
//     name: 'Jane Doe',
//     birth: 'what is this field',
//     level: 120,
//     experiencePoint: 12900,
//     requiredExperiencePoint: 13098,
//     point: 555,
//   },
// ]

const sleep = (ms) => () => new Promise((r) => setTimeout(r, ms))
const sleep1Sec = sleep(1000)

const EditFamily = ({membersInfo}) => {
  console.log(membersInfo)
  const classes = useStyles()
  const history = useHistory()

  //FIXME: location.state.membersInfoがそもそも存在してない。
  //TODO: App.jsにstate作って渡した方がいい。
  //FIXME: ReactはImmutableだからletではなく常にconstを使う
  // let membersInfo = props.location.state.membersInfo;

  //とりあえずダミーデータを使用
  // const memberList = memberListMock

  //TODO: このfunctionはApp.jsからもってくる
  const updateFirestoreMock = async (member) => {
    console.log('updating store...', {member})
    await sleep1Sec()
    console.log('store updated')
  }

  // updateFireStore();
  // const updateFireStoreObj = { updateFireStore: updateFireStore };
  // updateFireStoreObj.updateFireStore();
  // console.log(updateFireStoreObj.updateFireStore());

  //media query
  const isTablet = useMediaQuery({query: '(min-device-width: 768px)'})
  const isSmartPhone = useMediaQuery({query: '(max-device-width: 767px)'})

  //FIXME: ここのコードはコンポーネントがrerenderingするたびに実行されるからやめたほうがいい。addFuncInfoはどこで使われるの?
  // let addfuncInfo = [];
  // membersInfo.forEach((memberInfo) => {
  // 	const newObj = { ...updateFireStoreObj, ...memberInfo };
  // 	addfuncInfo.push(newObj);
  // });
  //

  //FIXME: membersInfoがそもそもundefinedだからmap使えない。
  //FIXME: reassignをやめる
  // membersInfo = membersInfo.map((info, index) => {
  // 	return { ...updateFireStoreObj, ...info };
  // });

  const handleBackHome = () => {
    history.push({pathname: '/'})
  }

  const handleEditMember = async (member) => {
    await updateFirestoreMock(member)
    handleBackHome()
  }

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
        {membersInfo.map((member, i) => {
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
                      {member.name}
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
                      {member.name}
                    </Typography>
                    <Typography
                      className={classes.card_txt}
                      display="inline"
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {member.level}
                    </Typography>
                    <Typography
                      className={classes.card_txt}
                      display="inline"
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      {member.point}
                    </Typography>
                  </CardContent>
                )}
              </CardContent>
              <Divider className={classes.divider} orientation="vertical" flexItem />
              <IconButton aria-label="edit" onClick={() => handleEditMember(member)}>
                <EditIcon />
              </IconButton>
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

export default EditFamily
