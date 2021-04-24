import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop, Button, Fade, List, ListItem, ListItemText, Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: 50,
    boxShadow: '0 3px 7px rgba(0, 0, 0, 0.3)',
    padding: theme.spacing(4, 4, 5),
    maxWidth: '30ch',
    width: '100%',
    height: 400,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  inner: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  btn: {
    margin: '16px auto 24px',
    width: '20ch',
  },
}))

const ConfigModalItem = ({ open, exchangeItems, onSubmitEvent, handleClose, toggleInvisualName }) => {
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
            <List className={classes.inner}>
              {exchangeItems.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemText primary={toggleInvisualName(item) + 'と交換しましたか？'} />
                  </ListItem>
                )
              })}
            </List>
            <Button
              className={classes.btn}
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                onSubmitEvent()
              }}
            >
              交換した！
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
export default ConfigModalItem
