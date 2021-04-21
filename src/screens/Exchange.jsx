import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Button, Checkbox, Grid, Paper, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import StatusBar from '../uikit/StatusBar'
import BottomNav from '../components/BottomNav'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
const useStyles = makeStyles((theme) => ({
  root: {
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
}))

const Exchange = ({ memberInfo, items }) => {
  const classes = useStyles()
  // console.log({ items })
  //isSecretで名前を表示するかトグルする
  const toggleInvisualName = (item) => (item.isSecret ? '???????' : item.name)
  return (
    <>
      <List className={classes.root} subheader={<li />}>
        {items.map((item) => {
          const labelId = `checkbox-list-secondary-label-${item.id}`
          const { doneMemberId, isSecret } = item
          // const isMatchDoneMember = isSecret && id !== doneMemberId
          return (
            <ListItem
              key={item.id}
              divider
              role={undefined}
              // disabled={isMatchDoneMember}
              dense
              button
              className={isSecret ? classes.list_item_finished : classes.list_item}
              // onClick={() => toggleBudge(item)}
            >
              <ListItemText id={labelId} primary={toggleInvisualName(item)} />
              <ListItemText id={labelId} primary={`${item.requiredPoint}point`} />
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.isSecret}
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
      <Button
        className={classes.btn}
        variant="contained"
        // disabled={isDisabled}
        color="primary"
        size="small"
        // onClick={() => handleOpen()}
      >
        ポイントを交換する
      </Button>
    </>
  )
}

export default Exchange
