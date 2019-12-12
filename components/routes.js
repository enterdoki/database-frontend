import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Home from '../pages/home.js'
import Manhattan from '../pages/manhattan.js'
import Queens from '../pages/queens.js'
import Brooklyn from '../pages/brooklyn.js'
import Bronx from '../pages/bronx.js'
import StatenIsland from '../pages/statenIsland.js'
import LocationalMap from '../pages/locationalMap.js'
import DashBoard from '../pages/dashBoard.js'

const routes = () => (
    <Router>
        <Scene key="root">
            <Scene key="Home" component={Home} title="Crime Alert" initial={true}/>
            <Scene key="Manhattan" component={Manhattan} title="Manhattan" />
            <Scene key="Queens" component={Queens} title="Queens" />
            <Scene key="Brooklyn" component={Brooklyn} title="Brooklyn" />
            <Scene key="Bronx" component={Bronx} title="Bronx" />
            <Scene key="StatenIsland" component={StatenIsland} title="Staten Island" />
            <Scene key="LocationalMap" component={LocationalMap} title="Complaints" hideNavBar={true}/>
            <Scene key="DashBoard" component={DashBoard} title="DashBoard"/>
        </Scene>
    </Router>
)
export default routes