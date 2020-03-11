import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function App(props) {
  return (
    <ListItem button component="a" href={props.link}>
      <ListItemText primary={props.name + ' - ' + props.link}/>
    </ListItem>
  )
}

export default App