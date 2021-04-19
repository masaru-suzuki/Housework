import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { Button } from '@material-ui/core'

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
    maxWidth: '30ch',
    padding: theme.spacing(4, 6, 5),
  },
  btn: {
    margin: '16px auto 24px',
    width: '20ch',
    // height: 60,
  },
}))

const ErrorModal = ({ open, onSubmitEvent, handleClose }) => {
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
            <p id="transition-modal-description">所持ポイントが少ないので、家事を取り消せません</p>
            <p id="transition-modal-description">頑張ってやりましょう！</p>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onSubmitEvent()
              }}
            >
              確認
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
export default ErrorModal
