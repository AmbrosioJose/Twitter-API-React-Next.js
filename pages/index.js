import { Component } from 'react'
import Tweets from '../components/tweets'
import {Grid, Row, Col, PageHeader} from 'react-bootstrap'
import Search  from '../components/search'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import SearchTabs from '../components/searchTabs'

class ChatOne extends Component {
  // fetch old messages data from the server
  static async getInitialProps ({ req }) {
    const response = await fetch('http://localhost:3000/tweets/term')
    const messages = await response.json()
    return { messages }
  }

  static defaultProps = {
    messages: []
  }

  // init state with the prefetched messages
  state = {
    searchedScreenName: '',
    searchedName: '',
    activeTab:0,
    messages: this.props.messages,
    subscribe: false,
    subscribed: false,
    tweets:this.props.messages,
    isSearching:false,
    search:'',

  }

  subscribe = () => {
    if (this.state.subscribe && !this.state.subscribed) {
      this.props.socket.on('clicked.response', this.handleServerResponse)
      this.props.socket.on('searched.response', this.handleServerResponse)
      this.setState({ subscribed: true })
    }
  }
  componentDidMount () {
    this.subscribe()
  }

  componentDidUpdate () {
    this.subscribe()
  }

  static getDerivedStateFromProps (props, state) {
    if (props.socket && !state.subscribe) return { subscribe: true }
    return null
  }

  // close socket connection
  componentWillUnmount () {
    this.props.socket.off('clicked.response', this.handleServerResponse)
    this.props.socket.off('searched.response', this.handleServerResponse)
  }

  handleServerResponse = (message) =>{

    console.log(message)
    this.setState(state => ({
      tweets: message
    }))
  }

  handleTabs = (key) =>{
    this.setState({ activeTab: key });
  }
  handleSearch = (query) =>{
    if(this.state.activeTab==0){
      this.setState({ search: query });
      this.props.socket.emit('searchTweet', query)
    } else if (this.state.activeTab==1) {
      this.setState({ searchedScreenName: query });
      this.props.socket.emit('searchScreenName', query)
    }
    else{
      this.setState({ searchedName: query });
      this.props.socket.emit('searchName', query)
    }

  }


  render () {
    return (
      <main>
        <div className="App">
          <Head>
            <title>Learning Twitter API App</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/>
            
          </Head>
          <header className="App-header">
            <PageHeader> Twitter API</PageHeader>

          </header>
          <SearchTabs handleSearch={this.handleSearch} handleTabs={this.handleTabs}/>
          
          <Grid>
            <Row className="show-grid">
              <Col xs={12} md={12}>
                <Tweets tweets={this.state.tweets}/>
              </Col>
            </Row>
          </Grid>


          <style jsx>{`

            .App-header {
              background-color: #0d0033;
              height: 150px;
              padding: 20px;
              color: white;
              text-align: center;
            }

    
    `}</style>
        </div>
      </main>
    )
  }
}

export default ChatOne
