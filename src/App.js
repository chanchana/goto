import React from 'react'
import ListItem from './List'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Loading from './Loading'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      links: [],
      loading: true,
      inputName: '',
      inputLink: '',
    }

    this.handleInputLink = this.handleInputLink.bind(this)
    this.handleInputName = this.handleInputName.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getAllList()
      .then(res => {
        console.log(res)
        this.setState({ links: res.reverse() })
        this.setState({ loading: false })
      })
      .catch(err => console.log(err))
  }

  getAllList = async () => {
    const response = await fetch('https://take-me-to-server.herokuapp.com/links')
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  postList = async () => {
    const data = {
      name: this.state.inputName,
      link: this.state.inputLink,
    }
    console.log(data)
    const response = await fetch('https://take-me-to-server.herokuapp.com/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const body = await response.json()

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body
  }

  handleInputLink(event) {
    this.setState({inputLink: event.target.value});
  }

  handleInputName(event) {
    this.setState({inputName: event.target.value});
  }

  handleSubmit() {
    this.postList()
      .then(res => {
        var updatedList = this.state.links
        updatedList.unshift({
          name: this.state.inputName,
          link: this.state.inputLink,
        })
        this.setState({ links: updatedList })
      })
      .catch(err => console.log(err))
  }

  render() {
    const list = this.state.links.map((value, index) =>
      <div>
        <ListItem key={index} name={value.name} link={value.link} /><Divider />
      </div>
    )

    return (
      <div>
        <Container>
          <h1>Goto</h1>
          {/* Add text field */}
          <Grid container spacing={3} >
            <Grid item xs={8}>
            <TextField id="input-link" value={this.state.inputLink} onChange={this.handleInputLink} label="Add new shortcut link" variant="filled" fullWidth={true}/>
            </Grid>
            <Grid item xs={2}>
            <TextField id="input-name" value={this.state.inputName} onChange={this.handleInputName} label="Name (optional)" variant="filled" fullWidth={true}/>
            </Grid>
            <Grid item xs={2}>
              <Button onClick={this.handleSubmit} variant="contained" color="primary" fullWidth={true} size="large">Add</Button>
            </Grid>
          </Grid>

          {/* All Link List */}
          <Loading isActive={this.state.loading} />
          <List>
            <Divider />
            {list}
          </List>
        </Container>
      </div>
    )
  }
}

export default App
