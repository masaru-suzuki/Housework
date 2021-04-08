import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'

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

const HouseworkListArea = () => {
  const classes = useStyles()
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
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`
        return (
          <ListItem key={value} button>
            <ListItemAvatar>
              <Avatar alt={`Avatar n°${value + 1}`} src={`/static/images/avatar/${value + 1}.jpg`} />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )
      })}
    </List>
  )
}

export default HouseworkListArea
