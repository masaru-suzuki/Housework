import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  Checkbox,
  Fade,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Modal,
} from '@material-ui/core'
import { FixedSizeList } from 'react-window'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    padding: 50,
    // boxShadow: theme.shadows[5],
    boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    padding: theme.spacing(4, 6, 5),
    maxWidth: '30ch',
  },
  btn: {
    margin: '16px auto 24px',
    width: '20ch',
    // height: 60,
  },
}))

const ConfigModalItem = ({ open, exchangeItems, onSubmitEvent, handleClose }) => {
  const classes = useStyles()
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {exchangeItems.map((item, index) => {
              // return <p id="transition-modal-description">{item}をもらいましたか？</p>
              return (
                <ListItem key={index}>
                  <ListItemText primary={item + 'をもらいましたか？'} />
                </ListItem>
              )
            })}
            {/* <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p>
            <p id="transition-modal-description">をもらいましたか？</p> */}
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onSubmitEvent()
              }}
            >
              もらった！
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
export default ConfigModalItem
