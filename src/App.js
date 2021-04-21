import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth, { useAuth } from './auth/Auth'
//screens
import Home from './screens/Home'
import EditFamily from './screens/EditFamily'
import EditHouseworkList from './screens/EditHouseworkList'
import Profile from './screens/MemberHome'
import SignInOrUp from './screens/SignInOrUp'
import SignUp from './screens/SignUp'
import Member from './screens/MemberHome'
import EditMember from './screens/EditMember'
import MemberHome from './screens/MemberHome'

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
  const [items, setItems] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [memberId, setMemberId] = useState()

  const getRef = (refName) => {
    return db.collection('family').doc(userId).collection(refName)
  }
  const getItemRef = (memberId) => {
    return db.collection('family').doc(userId).collection('member').doc(memberId).collection('items')
  }

  const getFirestoreMock = async (refName, stateSetter) => {
    const Ref = getRef(await refName)
    const data = makeListFromCollection(await Ref.get())
    stateSetter(data.filter((v) => typeof v.name === 'string'))
    //firebaseが更新された時に、再レンダリングするように、isEditをセット
    setIsEdit(false)
  }
  //get items from firestore
  const getMemberId = (memberId) => {
    setMemberId(memberId)
  }
  const getItems = async (id) => {
    // console.log({ id })
    const ItemRef = getItemRef(await id)
    // console.log(itemRef)
    const data = makeListFromCollection(await ItemRef.orderBy('requiredPoint').get())
    // console.log(data)
    setItems(data.filter((v) => typeof v.name === 'string'))
    setIsEdit(false)
  }

  //Ref
  const memberRef = getRef('member')
  const houseworkRef = getRef('housework')

  //update firestore
  const updateFirestore = (data, firestoreRef) => {
    const targetId = data.id
    firestoreRef.doc(targetId).set(data, { merge: true })
    setIsEdit(true) //isEditで再レンダリングを発火させる
  }
  const updateFirestoreMember = (data) => {
    updateFirestore(data, memberRef)
  }
  const updateFirestoreHousework = (data) => {
    updateFirestore(data, houseworkRef)
  }
  const updateFirestoreItem = (data, memberId) => {
    console.log('update')
    const itemRef = getItemRef(memberId)
    updateFirestore(data, itemRef)
  }

  //add data to firestore
  const addFirestore = (data, firestoreRef) => {
    firestoreRef.add(data)
    setIsEdit(true) //isEditで再レンダリングを発火させる
  }
  const addFiestoreMember = (data) => {
    addFirestore(data, memberRef)
  }
  const addFiestoreHousework = (data) => {
    addFirestore(data, houseworkRef)
  }
  const addFirestoreItems = (data, memberId) => {
    console.log('add items')
    const itemRef = getItemRef(memberId)
    addFirestore(data, itemRef)
  }

  //delete data to firestore
  const deleteFirestore = (id, firestoreRef) => {
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
  const deleteFirestoreMember = (id) => {
    deleteFirestore(id, memberRef)
  }
  const deleteFirestoreHousework = (id) => {
    deleteFirestore(id, houseworkRef)
  }
  const deleteFirestoreItem = (id, memberId) => {
    const itemRef = getItemRef(memberId)
    deleteFirestore(id, itemRef)
  }

  const finishBtnEvent = (memberInfo, housework) => {
    let { id, level, experiencePoint, point, requiredExpreriencePoint, doneDate, runningDay } = memberInfo //updateFirestoreMemberでidも必要なため、idも定義
    let { earnedPoint, isDone, doneMemberId, finishedDate } = housework
    if (isDone) {
      //家事取り消し時
      point -= earnedPoint
      doneMemberId = ''
      //完了日の削除
      doneDate = doneDate.filter((timestamp) => !timestamp.isEqual(finishedDate))
      // console.log({ doneDate })
      //連続家事日数の計算
      runningDay = getRunningDay(doneDate)
      //経験値の計算
      if (experiencePoint < earnedPoint) {
        let requiredLevelDownPoint = experiencePoint
        while (earnedPoint > requiredLevelDownPoint) {
          earnedPoint -= requiredLevelDownPoint
          requiredExpreriencePoint -= level * level
          requiredLevelDownPoint = requiredExpreriencePoint
          level -= 1
        }
        experiencePoint = requiredLevelDownPoint - earnedPoint
      } else {
        experiencePoint -= earnedPoint
      }
    } else {
      //家事完了時
      experiencePoint += earnedPoint
      point += earnedPoint
      doneMemberId = id
      //完了日の登録
      const date = new Date()
      doneDate.unshift(date)
      finishedDate = date
      //連続家事日数の計算
      runningDay = getRunningDay(doneDate)
      //経験値の計算
      if (requiredExpreriencePoint <= experiencePoint) {
        while (requiredExpreriencePoint <= experiencePoint) {
          experiencePoint -= requiredExpreriencePoint
          level += 1
          requiredExpreriencePoint += level * level
        }
      }
    }
    //完了・未完了のトグル
    isDone = !isDone

    // 更新するデータ
    const memberData = { id, experiencePoint, point, level, requiredExpreriencePoint, doneDate, runningDay }
    const houseworkData = { id: housework.id, doneMemberId, isDone, finishedDate }
    // console.log({ memberData })
    // console.log({ houseworkData })

    //更新を実行
    updateFirestoreMember(memberData)
    updateFirestoreHousework(houseworkData)
  }

  //Pointを金額に変更するfunction
  const exchangeCash = (id, point) => {
    console.log(`${id}の${point}を換金します`)
    const updateMemberData = { id, point }
    updateFirestoreMember(updateMemberData)
  }

  //日付が今日と同じか判定
  const getIsEquortoDay = (date) => {
    // console.log(date.length)
    if (!date || date === undefined) return
    const today = new Date()
    const y = date?.getFullYear()
    const m = date?.getMonth() + 1
    const d = date?.getDate()
    const Y = today.getFullYear()
    const M = today.getMonth() + 1
    const D = today.getDate()
    return y === Y && m === M && d === D
  }
  // 日付の配列から、最新の日付を取得
  const getLatestDate = (dateArr) => {
    let latestDate = ''
    dateArr.forEach((e) => {
      if (e > latestDate) latestDate = e
    })
    // console.log({ latestDate })
    return latestDate
  }

  //日付が変わった時に家事のデータをresetする
  //初期状態の時にデータがないからエラー対策が必要
  const getIsNewDate = () => {
    // console.log({ membersInfo })
    // console.log(membersInfo === [])
    if (membersInfo === []) return
    // メンバーごとのdoneDateから最新日付を取得して、配列にする
    const latestDateMemberDoneHousework = membersInfo?.map((member) => {
      // console.log(member.doneDate.length === 0)
      if (member.doneDate.length === 0) return
      let date = ''
      try {
        date = member.doneDate[0]?.toDate()
      } catch {
        date = member.doneDate[0]
      }
      // console.log(data)
      return date
    })
    // console.log({ latestDateMemberDoneHousework })
    // console.log(latestDateMemberDoneHousework === undefined)
    //誰も家事をやっていない状態なら終了
    // console.log(latestDateMemberDoneHousework[0])
    if (latestDateMemberDoneHousework[0] === undefined) return
    const latestDate = getLatestDate(latestDateMemberDoneHousework)
    // console.log({ latestDate })
    //日付が変わったか判定
    // console.log(getIsEquortoDay(latestDate))
    if (!getIsEquortoDay(latestDate) === '') resetFirestoreHousework()
  }
  //最も新しい日付とアプリケーションをレンダリングした時に日付を比較して、レンダリングした時の日付が新しかったら、restFirestoreHoueworkする

  const resetFirestoreHousework = () => {
    // console.log('reset')
    houseworkListInfo.forEach((housework) => {
      const resetHouseworkData = {
        id: housework.id,
        doneMemberId: '',
        isDone: false,
      }
      updateFirestoreHousework(resetHouseworkData)
    })
  }
  //連続家事日数の取得
  const getRunningDay = (date) => {
    if (date.length < 1) {
      return 0
    } else {
      let runningDay = 0
      for (let i = 0; i < date.length - 1; i++) {
        //新しく追加したdoneDateはfirebaseに登録されることでfirebaseのタイムスタンプ型になるけど、この時点ではなっていないので、
        //toDate()が使えない
        //新しくdoneDateを追加した場合はdoneDate[0].getDate()でいけるけど、そうじゃない場合doneDate[0].toDate()にする必要がある
        //新しく追加した場合はこれでおkだけど、同じにひやっていて、doneDateに追加しない場合は、成功しない=>try catchでやってみる
        let newDate = ''

        try {
          newDate = date[i].toDate()
        } catch (error) {
          newDate = date[0]
        }
        const prevDate = date[i + 1].toDate()
        const newDay = newDate.getDate()
        const prevDay = prevDate.getDate()

        // console.log({ newDate })
        // console.log({ prevDate })

        if (newDay === 1) {
          const lastMonthLastDay = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate()
          //前月の最終日と同じなら連続していることとする
          if (lastMonthLastDay === prevDay) {
            runningDay += 1
          }
        }
        if (newDay - prevDay === 1) {
          runningDay += 1
          // console.log('constant done housework!')
        } else if (newDay === prevDay) {
          // console.log('in a day')
        } else {
          break
        }
        // console.log({runningDay})
      }
      return runningDay
    }
  }

  //アイテム交換の時にpointを減算する
  const exhangeItems = (id, point, itemList) => {
    console.log('exchange item')
    console.log(itemList)
    console.log(point)
    const updateMemberData = { id, point }
    updateFirestoreMember(updateMemberData)
    // updateFirestoreItem(item, memberId)
    itemList.forEach((item) => updateFirestoreItem(item, id))
  }
  useEffect(() => {
    if (!userId) return
    //submitがclickされるたびにfirestoreのデータを引っ張ってきて更新する
    getFirestoreMock('member', setMembersInfo)
    getFirestoreMock('housework', setHouseworkListInfo)
    //userIdが変わった時も情報を撮り直す
  }, [isEdit, userId])

  //memberが変わったら、itemListを更新する
  useEffect(() => {
    if (!userId) return
    getItems(memberId)
  }, [memberId, isEdit])
  //今度はrecomposeのlibraryを使ってpropsを渡すのに挑戦してみる
  //初回のレンダリングのみ
  useEffect(() => {
    getIsNewDate()
    //userIdでもmembersInfoでもうまくいかなかった
  }, [memberId])
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
              render={() => (
                <Home
                  membersInfo={membersInfo}
                  houseworkListInfo={houseworkListInfo}
                  finishBtnEvent={finishBtnEvent}
                  resetFirestoreHousework={resetFirestoreHousework}
                  exchangeCash={exchangeCash}
                  exhangeItems={exhangeItems}
                  getMemberId={getMemberId}
                  items={items}
                />
              )}
            />
            <Route exact path="/MemberHome" component={MemberHome} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/EditFamily"
              render={() => (
                <EditFamily
                  membersInfo={membersInfo}
                  updateFirestoreMember={updateFirestoreMember}
                  addFiestoreMember={addFiestoreMember}
                  deleteFirestoreMember={deleteFirestoreMember}
                  getMemberId={getMemberId}
                  items={items}
                  addFirestoreItems={addFirestoreItems}
                  deleteFirestoreItem={deleteFirestoreItem}
                  updateFirestoreItem={updateFirestoreItem}
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
                  updateFirestoreHousework={updateFirestoreHousework}
                  deleteFirestoreHousework={deleteFirestoreHousework}
                />
              )}
            />
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
