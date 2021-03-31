import React, {useState, useEffect} from 'react'
import firebase from './firebase'
import './App.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Auth from './auth/Auth'
//screens
import Home from './screens/Home'
import EditFamily from './screens/EditFamily'
import EditHousework from './screens/EditHousework'
import Profile from './screens/Member'
import SignInOrUp from './screens/SignInOrUp'
import SignUp from './screens/SignUp'
import Member from './screens/Member'
import EditMember from './screens/EditMember'

//comberListMocにisEditを入れて、このidEditを変更したら、firebaseに登録して、isEditをfalseにすればいいのかな？
const db = firebase.firestore()
const familyRef = db.collection('family').doc('u9EnmX300LQsunRawSUwwrhEVhS2').collection('member')

// console.log(members)
const memberListMock = []
// firebaseからdetaを取得
// const memberRef = familyRef.doc(familyID).ref('member')
function App() {
  const [membersInfo, setMembersInfo] = useState([])
  const [testName, setTestName] = useState('')

  const sleep = (ms) => () => new Promise((r) => setTimeout(r, ms))
  const sleep1Sec = sleep(1000)

  //TODO: このfunctionはApp.jsからもってくる
  const updateFirestoreMock = async (member) => {
    console.log('updating store...', {member})
    await sleep1Sec()
    console.log('store updated')
  }

  // const updateState = () => {
  //   setMembersInfo(...membersInfo, ...memberListMock)
  // }

  //firebaseの情報をasyc awaitで取得
  const getFirestoreMock = async () => {
    console.log('getting data ...')
    familyRef
      .get()
      .then((querySnapshot) => {
        console.log('fetch data')
        querySnapshot.forEach((doc) => {
          const arr = {memberId: doc.id}
          const data = doc.data()
          const newarr = {...arr, ...data}
          // console.log(newarr)
          memberListMock.push(newarr)
          // setMembersInfo(...membersInfo, ...newarr) こうすればいいのか？
          console.log('push data')
        })
      })
      .then(() => {
        console.log({memberListMock})
        setMembersInfo(memberListMock)
        console.log('set member')
        console.log({membersInfo})
      })
      // .then(() => {
      //   console.log({membersInfo})
      // })
      .catch((error) => {
        console.log('Error getting documents: ', error)
      })
    // console.log('ok')
    await sleep1Sec()
    console.log({membersInfo})
    console.log('got data!')
  }

  //TODO: このfunctionはApp.jsからもってくる
  const handeChange = (event) => {
    // setIsEdit(true)
    // console.log({event}, {isEdit})
    console.log('handle changed')
    setTestName(event.target.value)
    console.log({testName})
  }
  useEffect(() => {
    console.log('render')
    getFirestoreMock()
    console.log({membersInfo})
  }, [])

  //今度はrecomposeのlibraryを使ってpropsを渡すのに挑戦してみる
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignInOrUp} />
        <Route exact path="/signup" component={SignUp} />
        {/* 以下認証のみ */}
        <Auth>
          <Switch>
            <Route exact path="/" render={() => <Home membersInfo={membersInfo} />} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/editFamily"
              render={() => (
                <EditFamily
                  membersInfo={membersInfo}
                  handeChange={handeChange}
                  updateFirestoreMock={updateFirestoreMock}
                />
              )}
            />
            <Route exact path="/EditHousework" component={EditHousework} />
            <Route exact path="/Member" component={Member} />
            <Route exact path="/EditMember" render={() => <EditMember membersInfo={membersInfo} />} />
            <Route render={() => <p>not found.</p>} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  )
}

export default App
