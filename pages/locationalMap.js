import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Header, Container, Icon, Body, Right, Left } from 'native-base'


export default class App extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			marginBottom: 1,
			initialRegion: [],
			currLoc: []
		}
	}

	async componentDidMount() {
		this._isMounted = true;
		try {
			await navigator.geolocation.getCurrentPosition(
				async position => {
					const obj = JSON.stringify(position);
					const location = JSON.parse(obj)
					const currLoc = [location[`coords`][`latitude`], location[`coords`][`longitude`]];
					let region = {
						latitude: location[`coords`][`latitude`],
						longitude: location[`coords`][`longitude`],
						latitudeDelta: 0.01,
						longitudeDelta: 0.01
					}
					this.mapView.animateToRegion(region, 1000);
					if (this._isMounted) {
						this.setState({
							initialRegion: region,
							currLoc: currLoc
						})
					}

				},
				error => Alert.alert(error.message),
				{ timeout: 20000, maximumAge: 1000 }
			);
		} catch (err) {
			console.log(err)
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	onMapReady = () => this.setState({ marginBottom: 0 })

	newAlert = () => {
		console.log(this.state.currLoc)
		console.log("recieved")
	}

	render() {
		return (
			<Container>
				<Header style={{ backgroundColor: 'white' }}>
					<Left>
						<TouchableOpacity onPress={() => { Actions.pop() }} >
							<Icon name="arrow-back" style={{ marginLeft: 5, fontSize: 35, color: '#1e90ff' }}/>
						</TouchableOpacity>
					</Left>
					<Body style={{ flex: 3 }}><Text style={{ fontSize: 17.5, fontWeight: "600" }}>{this.props.title}</Text></Body>
					<Right>
						<TouchableOpacity onPress={() => this.newAlert()}>
							<Icon name="warning" style={{ fontSize: 35}}/>
						</TouchableOpacity>
					</Right>
				</Header>
				<View style={styles.container}>
					<MapView
						provider={PROVIDER_GOOGLE}
						onMapReady={this.onMapReady}
						style={styles.map}
						initialRegion={{
							latitude: 40.7549,
							longitude: -73.9840,
							latitudeDelta: .08,
							longitudeDelta: .08,
						}}
						showsUserLocation={true}
						showsMyLocationButton={false}
						showsCompass={false}
						loadingEnabled={true}
						ref={ref => { this.mapView = ref }}>
					</MapView>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		marginTop: 1.5,
		...StyleSheet.absoluteFillObject,
	},
});