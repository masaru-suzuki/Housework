import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${props.value}%`}</Typography>
      </Box>
    </Box>
  )
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
})
//TODO reset experiencePoint when you level up
//TODO add surplus point to experiencePoint when you level up
//TODO save experiencePoint to Firestore
//TODO calculate requiredExperiencePoint when level up
//TODO save requiredExperiencePoint when level up

const StatusBar = ({ memberInfo }) => {
  const classes = useStyles()
  const [progress, setProgress] = React.useState(60)
  const { level, experiencePoint, requiredExpreriencePoint } = memberInfo
  const calcProgress = () => {
    const result = Math.round((requiredExpreriencePoint / experiencePoint) * 1000) / 10
    return experiencePoint === 0 ? 0 : result
  }
  useEffect(() => {
    setProgress(calcProgress())
  }, [experiencePoint])
  return (
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
    </div>
  )
}

export default StatusBar
