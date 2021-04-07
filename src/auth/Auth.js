import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../firebase'
import LoadingOverlay from 'react-loading-overlay'

//uidをエクスポート. mock id
let uid = ''
export const getUid = () => uid

export const useAuth = () => {
  //TODO: contextにする
  const [userId, setUserId] = useState(undefined)
  firebase.auth().onAuthStateChanged((user) => {
    // console.log(user)
    // console.log(user.uid)
    setUserId(user?.uid)
  })
  return { userId }
}

class Auth extends React.Component {
  state = {
    signinCheck: false, //ログインチェックが完了してるか
    signedIn: false, //ログインしてるか
  }

  _isMounted = false //unmountを判断（エラー防止用）

  componentDidMount = () => {
    //mountされてる
    this._isMounted = true

    //ログインしてるかどうかチェック
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid
        if (this._isMounted) {
          this.setState({
            signinCheck: true,
            signedIn: true,
          })
        }
      } else {
        // console.log("ログインしていない");
        //してない
        if (this._isMounted) {
          this.setState({
            signinCheck: true,
            signedIn: false,
          })
        }
      }
    })
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() {
    //チェックが終わってないなら（ローディング表示）
    if (!this.state.signinCheck) {
      return (
        <LoadingOverlay active={true} spinner text="Loading...">
          <div style={{ height: '100vh', width: '100vw' }} />
        </LoadingOverlay>
      )
    }

    //チェックが終わりかつ
    if (this.state.signedIn) {
      //サインインしてるとき（そのまま表示）
      // return this.props.children
      return this.props.children
    } else {
      //してないとき（ログイン画面にリダイレクト）
      return <Redirect to="/signin" />
    }
  }
}

export default Auth
