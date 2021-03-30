import React, {useState, useEffect} from 'react'
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

const memberListMock = [
  {
    name: 'masaru',
    birth: '1992',
    level: 100,
    experiencePoint: 500,
    requiredExperiencePoint: 1000,
    point: 42,
  },
  {
    name: 'Jane Doe',
    birth: '1992',
    level: 120,
    experiencePoint: 12900,
    requiredExperiencePoint: 13098,
    point: 555,
  },
]

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

  //TODO: このfunctionはApp.jsからもってくる
  const handeChange = (event) => {
    // setIsEdit(true)
    // console.log({event}, {isEdit})
    console.log('handle changed')
    setTestName(event.target.value)
    console.log({testName})
  }
  useEffect(() => {
    setMembersInfo(memberListMock)
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
            <Route exact path="/" component={Home} membersInfo={membersInfo} />
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
