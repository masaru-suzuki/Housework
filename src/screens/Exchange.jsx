import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Card, CardContent, Checkbox, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ConfigModalItem from '../components/ConfigModalItem'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 80px 90px',
    // paddingBottom: rootPaddingBottom,
    overflow: 'hidden',
  },
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
  },
  list_item_finished: {
    //TODO onFocusの時にline-throughが適用されなくなるから適用されるようにする
    // textDecoration: 'line-through', //逆にみづらいからけした
    display: 'grid',
    gap: '8px',
    gridTemplateColumns: '4fr 1fr 50px',
  },
  list_item: {
    display: 'grid',
    gap: '8px',
    gridTemplateColumns: '4fr 1fr 50px',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  card_container: {
    //error message用
    marginTop: 12,
    position: 'relative',
  },
  card: {
    width: '25ch',
    margin: 'auto',
    // minHeight: 60,
    padding: 0,
    height: 'auto',
    textAlign: 'center',
    boxShadow: 'unset',
    backgroundColor: '#eceeef',
    marginTop: 12,
  },
  card_content: {
    padding: 8,
    '&:last-child': {
      paddingBottom: 8,
    },
  },
  btn: {
    margin: '16px auto 24px',
    width: '25ch',
    height: 60,
  },
  error: {
    position: 'absolute',
    top: 60,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    fontSize: 12,
    zIndex: 1,
    textAlign: 'center',
    color: 'red',
  },
  invisual: {
    display: 'none',
  },
}))

const Exchange = ({ memberInfo, items, exhangeItems }) => {
  const classes = useStyles()
  const [checked, setChecked] = useState([])
  const [paidPoint, setPaidPoint] = useState(0)
  // const checkedItemArr = []
  const [isError, setIsError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [open, setOpen] = useState(false)
  const [exchangeItems, setExchangeItems] = useState([])
  let { id, point } = memberInfo

  //isSecretで名前を表示するかトグルする
  const toggleInvisualName = (item) => (item.isSecret ? '???????' : item.name)

  //checkされたら項目を保存
  const toggleCheckItem = (item) => {
    const { id, requiredPoint } = item
    const checkedItemArr = [...checked]
    const checkedItemName = [...exchangeItems]
    const currentIndex = checked.indexOf(id)
    if (currentIndex === -1) {
      checkedItemArr.push(id)
      checkedItemName.push(item)
      setPaidPoint(paidPoint + requiredPoint)
    } else {
      checkedItemArr.splice(currentIndex, 1)
      checkedItemName.splice(currentIndex, 1)
      setPaidPoint(paidPoint - requiredPoint)
    }
    setChecked(checkedItemArr)
    setExchangeItems(checkedItemName)
  }
  const toggleDisabled = () => {
    paidPoint > point || paidPoint === 0 ? setIsDisabled(true) : setIsDisabled(false)
  }
  const toggleError = () => {
    paidPoint > point ? setIsError(true) : setIsError(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const clearChecked = () => {
    setPaidPoint(0)
    setChecked([])
    setExchangeItems([])
  }

  const changeIsSecret = (data) => {
    data.isSecret = false
    return data
  }
  const onSubmitEvent = () => {
    point -= paidPoint
    handleClose()
    clearChecked()
    //交換するitem listのisSecretを反転させる
    const updateItemData = exchangeItems.map((item) => {
      console.log({ item })
      return changeIsSecret(item)
    })
    exhangeItems(id, point, updateItemData)
  }
  console.log(exchangeItems)

  useEffect(() => {
    toggleDisabled()
    toggleError()
  }, [paidPoint])

  return (
    <div className={classes.root}>
      <List className={classes.list} subheader={<li />}>
        {items.map((item) => {
          const labelId = `checkbox-list-secondary-label-${item.id}`
          const { id, isSecret } = item
          return (
            <ListItem
              key={item.id}
              divider
              role={undefined}
              dense
              button
              className={isSecret ? classes.list_item_finished : classes.list_item}
              onClick={() => toggleCheckItem(item)}
            >
              <ListItemText id={labelId} primary={toggleInvisualName(item)} />
              <ListItemText id={labelId} primary={`${item.requiredPoint}point`} />
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(id) !== -1}
                  tabIndex={-1}
                  icon={<CheckCircleOutlineIcon fontSize="large" />}
                  checkedIcon={<CheckCircleIcon fontSize="large" />}
                  disableRipple
                  color="primary"
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
            </ListItem>
          )
        })}
      </List>
      <div className={classes.card_container}>
        {/* <Divider /> */}
        <Card className={classes.card}>
          <CardContent className={classes.card_content}>{paidPoint}point</CardContent>
        </Card>
        <span className={isError ? classes.error : classes.invisual}>所持ポイントを超えないでください</span>
      </div>
      <Button
        className={classes.btn}
        variant="contained"
        disabled={isDisabled}
        color="primary"
        size="small"
        onClick={() => handleOpen()}
      >
        アイテムを交換する
      </Button>
      <ConfigModalItem
        onSubmitEvent={onSubmitEvent}
        exchangeItems={exchangeItems}
        handleClose={handleClose}
        open={open}
      />
    </div>
  )
}

export default Exchange
