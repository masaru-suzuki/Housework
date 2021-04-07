import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth, { useAuth } from './auth/Auth'
//screens
import Home from './screens/Home'
import EditFamily from './screens/EditFamily'
import EditHouseworkList from './screens/EditHouseworkList'
import Profile from './screens/Member'
import SignInOrUp from './screens/SignInOrUp'
import SignUp from './screens/SignUp'
import Member from './screens/Member'
import EditMember from './screens/EditMember'

//comberListMocにisEditを入れて、このidEditを変更したら、firebaseに登録して、isEditをfalseにすればいいのかな？
const db = firebase.firestore()

const makeListFromCollection = (querySnapshot) => {
  const list = []
  querySnapshot.forEach((res) => {
    const data = res.data()
    list.push({ id: res.id, ...data })
  })
  return list
}
// firebaseからdetaを取得
const App = () => {
  const { userId } = useAuth()
  const [membersInfo, setMembersInfo] = useState([])
  const [houseworkListInfo, setHouseworkListInfo] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  //どういうふうに非同期処理にしたらいいのか分からない・・・！
  const getRef = (refName) => {
    return db.collection('family').doc(userId).collection(refName)
  }
  const getFirestoreMock = async (refName, stateSetter) => {
    const Ref = await getRef(refName)
    const data = makeListFromCollection(await Ref.get())
    stateSetter(data.filter((v) => typeof v.name === 'string'))
    //firebaseが更新された時に、再レンダリングするように、isEditをセット
    setIsEdit(false)
  }

  /**
   * firebase update task (EditMember , EditHouseworkで使う)
   * data : submitボタンを押した際に渡ってくるデータ member,housework
   * updateTarget : 変更する要素 id, name,birth ,earnedPoint
   * firestoreRef : firestoreのref familyRef, houseworkRef
   */
  const updateFirestore = (data, refName) => {
    const firestoreRef = getRef(refName)
    const targetId = data.id
    firestoreRef.doc(targetId).set(data, { merge: true })
    setIsEdit(true) //isEditで再レンダリングを発火させる
  }
  const updateFirestoreMember = (data) => {
    updateFirestore(data, 'family')
  }
  const updateFirestoreHousework = (data) => {
    updateFirestore(data, 'housework')
  }

  //firestoreへデータの登録
  const addFirestore = (data, refName) => {
    const firestoreRef = getRef(refName)
    firestoreRef.add(data)
    setIsEdit(true) //isEditで再レンダリングを発火させる
  }

  //housework専用のfunctionをつくる
  const addFiestoreMember = (data) => {
    addFirestore(data, 'family')
  }
  const addFiestoreHousework = (data) => {
    addFirestore(data, 'housework')
  }

  //TODOfunctionの共通化
  //firestoreのメンバーの削除
  const deleteFirestore = (refName, id) => {
    const firestoreRef = getRef(refName)
    firestoreRef
      .doc(id)
      .delete()
      .then(() => {
        setIsEdit(true) //isEditで再レンダリングを発火させる
      })
      .catch((error) => {
        console.error('Error removeing document: ', error)
      })
  }

  useEffect(() => {
    if (!userId) return

    //submitがclickされるたびにfirestoreのデータを引っ張ってきて更新する
    getFirestoreMock('family', setMembersInfo)
    getFirestoreMock('housework', setHouseworkListInfo)
    //userIdが変わった時も情報を撮り直す
  }, [isEdit, userId])

  //今度はrecomposeのlibraryを使ってpropsを渡すのに挑戦してみる
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={SignInOrUp} />
        <Route exact path="/signup" component={SignUp} />
        {/* 以下認証のみ */}
        <Auth>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home membersInfo={membersInfo} houseworkListInfo={houseworkListInfo} />}
            />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/EditFamily"
              render={() => (
                <EditFamily
                  membersInfo={membersInfo}
                  updateFirestoreMember={updateFirestoreMember}
                  addFiestoreMember={addFiestoreMember}
                  deleteFirestore={deleteFirestore}
                />
              )}
            />
            <Route
              exact
              path="/EditHouseworkList"
              render={() => (
                <EditHouseworkList
                  houseworkListInfo={houseworkListInfo}
                  addFiestoreHousework={addFiestoreHousework}
                  // updateFirestoreOfHouseworkInfo={updateFirestoreOfHouseworkInfo}
                  updateFirestoreHousework={updateFirestoreHousework}
                  deleteFirestore={deleteFirestore}
                />
              )}
            />
            <Route exact path="/Member" component={Member} />
            <Route exact path="/EditMember" render={() => <EditMember membersInfo={membersInfo} />} />
            {/* AddMemberは必要？ */}
            <Route render={() => <p>not found.</p>} />
          </Switch>
        </Auth>
      </Switch>
    </Router>
  )
}

export default App
