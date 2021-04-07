import React from 'react'
import { useMediaQuery } from 'react-responsive'
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

const EditScreensCardInner = ({ data, i, displayElmNameSp, displayElmName, handleEdit, handleDelete }) => {
  const classes = useStyles()
  //media query
  const isTablet = useMediaQuery({ query: '(min-device-width: 768px)' })
  const isSmartPhone = useMediaQuery({ query: '(max-device-width: 767px)' })
  const id = data.id
  return (
    <Card className={classes.root} key={id}>
      <CardActionArea onClick={() => handleEdit(i)}>
        <CardContent className={classes.txtbox}>
          {isSmartPhone && (
            <CardContent className={classes.content_area}>
              <Typography align="left" display="inline" variant="subtitle2">
                {data[displayElmNameSp[0]]}
              </Typography>
              <Typography
                className={classes.card_txt}
                display="inline"
                variant="caption"
                color="textSecondary"
                component="p"
              >
                {data[displayElmNameSp[1]]}point
              </Typography>
            </CardContent>
          )}

          {isTablet && (
            <CardContent className={classes.content_area}>
              <Typography
                align="left"
                display="inline"
                // gutterBottom
                variant="body1"
                component="p"
              >
                {data[displayElmName[0]]}
              </Typography>
              <Typography
                className={classes.card_txt}
                display="inline"
                variant="body1"
                color="textSecondary"
                component="p"
              >
                {data[displayElmName[1]]}point
              </Typography>
              <Typography
                className={classes.card_txt}
                display="inline"
                variant="caption"
                color="textSecondary"
                component="p"
              >
                {data[displayElmName[2]]}
              </Typography>
            </CardContent>
          )}
        </CardContent>
      </CardActionArea>
      <ThemeProvider theme={theme}>
        <Divider className={classes.divider} orientation="vertical" flexItem />
        <IconButton color="secondary" onClick={() => handleDelete(data.id)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ThemeProvider>
    </Card>
  )
}

export default EditScreensCardInner
