import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import CommentIcon from '@material-ui/icons/Comment'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
const useStyles = makeStyles((theme) => ({
  root: {
    //TODO remove scroll ber
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}))

const HouseworkListArea = ({ houseworkListInfo }) => {
  const classes = useStyles()
  //checkedに完了したカジノIDを入れる
  const [checked, setChecked] = React.useState([])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    console.log(currentIndex)

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  return (
    <List className={classes.root} subheader={<li />}>
      {houseworkListInfo.map((housework, index) => {
        const labelId = `checkbox-list-secondary-label-${housework.id}`
        return (
          <ListItem key={housework.id} role={undefined} dense button onClick={handleToggle(index)}>
            {/* TODO grid */}
            <ListItemText id={labelId} primary={housework.name} />
            <ListItemText id={labelId} primary={`${housework.earnedPoint}point`} />
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(index) !== -1}
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
  )
}

export default HouseworkListArea
