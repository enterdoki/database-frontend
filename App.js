import React, { Component } from 'react';
import  Icon  from 'react-native-vector-icons/Ionicons'
import { Container, Footer, FooterTab, Button } from 'native-base';
import Routes from './components/routes.js'
import { Actions } from 'react-native-router-flux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1
    };
  }

  
  goToHome = () =>{
    Actions.Home();
  }
  
  goToLocationalMap = () =>{
    Actions.LocationalMap();
  }

  render() {
    return (
      <Container>
        <Routes />
        <Footer>
          <FooterTab>
            <Button onPress={async () => { await this.setState({activePage:1}); this.goToHome()}}>
              <Icon style={this.state.activePage === 1 ? { color: '#1E90FF', fontSize: 20 } : { fontSize: 20 }} name="ios-subway" />
            </Button>
            <Button onPress={async () => { await this.setState({activePage:2}); this.goToLocationalMap()}}>
              <Icon style={this.state.activePage === 2 ? { color: '#1E90FF', fontSize: 20 } : { fontSize: 20 }} active name="ios-map" />
            </Button>
            <Button onPress={()=>this.setState({activePage:3})}>
              <Icon style={this.state.activePage === 3 ? { color: '#1E90FF', fontSize: 20 } : { fontSize: 20 }} name="logo-twitter" type="Ionicons" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

export default App
