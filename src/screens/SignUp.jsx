import React from 'react'
// import { Form } from 'react-bootstrap';
import {Button, Form, FormGroup, Label, Input, FormFeedback, Spinner} from 'reactstrap'
import {Link, withRouter} from 'react-router-dom'
import {Formik} from 'formik'
import * as Yup from 'yup'
import {db, firebaseAuth} from '../firebase'

class SignUp extends React.Component {
  state = {
    loading: false, //処理中にボタンにspinner表示する制御用
  }

  _isMounted = false
  //Submitされたら
  handleOnSubmit = (values) => {
    //spinner表示開始
    if (this._isMounted) this.setState({loading: true})
    //新規登録処理
    firebaseAuth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(() => {
        //正常終了時
        //spinner表示終了
        if (this._isMounted) this.setState({loading: false})
        //Homeに移動
        this.props.history.push('/') //history.pushを使うためwithRouterしている
      })
      //firebase に登録したら、データベースにもユーザー情報を登録する
      .then(() => {
        let user = firebaseAuth.currentUser
        // console.log(user);
        if (user != null) {
          const uid = user.uid
          db.collection('family')
            .doc(uid)
            .set({
              name: values.familyname,
              email: values.email,
              createdAt: new Date(),
            })
            .then(function () {
              console.log('Document successfully written!')
            })
            .catch(function (error) {
              console.error('Error writing document: ', error)
            })
        }
      })
      .catch((error) => {
        //異常終了時
        if (this._isMounted) this.setState({loading: false})
        alert(error)
      })
  }

  componentDidMount = () => {
    this._isMounted = true
  }
  componentWillUnmount = () => {
    this._isMounted = false
  }

  render() {
    return (
      <div className="container">
        <div className="mx-auto" style={{width: 400, background: '#eee', padding: 20, marginTop: 60}}>
          <p style={{textAlign: 'center'}}>新規登録</p>
          <Formik
            initialValues={{familyname: '', email: '', password: ''}}
            onSubmit={(values) => this.handleOnSubmit(values)}
            validationSchema={Yup.object().shape({
              familyname: Yup.string().required(),
              email: Yup.string().email().required(),
              password: Yup.string().required(),
            })}
          >
            {({handleSubmit, handleChange, handleBlur, values, errors, touched}) => (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="familyname">familyname</Label>
                  <Input
                    type="text"
                    familyname="familyname"
                    id="familyname"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.familyname && errors.familyname ? true : false}
                  />
                  <FormFeedback>{errors.familyname}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input
                    type="email"
                    email="email"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.email && errors.email ? true : false}
                  />
                  <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    invalid={touched.password && errors.password ? true : false}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                <div style={{textAlign: 'center'}}>
                  <Button color="success" type="submit" disabled={this.state.loading}>
                    <Spinner size="sm" color="light" style={{marginRight: 5}} hidden={!this.state.loading} />
                    新規登録
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="mx-auto" style={{width: 400, background: '#fff', padding: 20}}>
          <Link to="/signin">ログインはこちら。</Link>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
