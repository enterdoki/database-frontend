import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Manhattan from '../pages/manhattan.js'
import Queens from '../pages/queens.js'
import Brooklyn from '../pages/brooklyn.js'
import Bronx from '../pages/bronx.js'
import StatenIsland from '../pages/statenIsland.js'

const routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "Manhattan" component = {Manhattan} title = "Manhattan" />
         <Scene key = "Queens" component = {Queens} title = "Queens" initial={true}/>
         <Scene key = "Brooklyn" component = {Brooklyn} title = "Brooklyn" />
         <Scene key = "Bronx" component = {Bronx} title = "Bronx" />
         <Scene key = "StatenIsland" component = {StatenIsland} title = "Staten Island"/>
      </Scene>
   </Router>
)
export default routes