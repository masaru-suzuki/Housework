import React from 'react'
import { makeStyles, createMuiTheme } from '@material-ui/core/styles'
import { Card, CardContent, Typography, IconButton, Divider, CardActionArea } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { ThemeProvider } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    maxWidth: 600,
    width: '100%',
    height: '10%',
    margin: 10,
  },
  content_area: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  txtbox: {
    width: '100%',
    display: 'flex',
    padding: '8px 12px',
  },
  card_txt: {
    lineHeight: 3,
    verticalAlign: 'middle',
    paddingLeft: 16,
  },
  divider: {
    margin: '0 4px',
  },
}))
//theme color change
const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#765759',
    },
  },
})

const EditItemListCardInner = ({ data, i, handleEdit, handleDelete, memberId }) => {
  const classes = useStyles()
  const id = data.id
  return (
    <Card className={classes.root} key={id}>
      <CardActionArea onClick={() => handleEdit(i)}>
        <CardContent className={classes.txtbox}>
          <CardContent className={classes.content_area}>
            <Typography align="left" display="inline" variant="subtitle2">
              {data.name}
            </Typography>
            <Typography
              className={classes.card_txt}
              display="inline"
              variant="caption"
              color="textSecondary"
              component="p"
            >
              {data.requiredPoint}point
            </Typography>
          </CardContent>
        </CardContent>
      </CardActionArea>
      <ThemeProvider theme={theme}>
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <IconButton color="secondary" onClick={() => handleDelete(id, memberId)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ThemeProvider>
    </Card>
  )
}

export default EditItemListCardInner
