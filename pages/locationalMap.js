import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Modal, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Header, Container, Icon, Body, Right, Left, Content, Form, Item, Input, Label, Picker, Button } from 'native-base';
import axios from 'axios';

export default class App extends React.Component {
	_isMounted = false;
	constructor(props) {
		super(props);
		this.state = {
			marginBottom: 1,
			initialRegion: [],
			coords: [],
			currLoc: [],
			toggleModal: false,
			selected: "Low",
			accidentType: ""
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
					this.updatePoints();
				},
				error => console.log(error.message),
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
		this.toggleModal();
		console.log(this.state.currLoc)

	}

	onValueChange(value) {
		console.log(value)
		this.setState({
			selected: value
		});
	}

	toggleModal = () => {
		this.setState({
			toggleModal: !this.state.toggleModal
		});
	}

	handleSubmit = async () => {
		let newAlert =
		{
			latitude: this.state.currLoc[0],
			longitude: this.state.currLoc[1],
			description: this.state.accidentType,
			severity: this.state.selected
		}
		this.toggleModal();
		try {
			await axios.post(`https://data-visual-api.herokuapp.com/report`, newAlert)
		}
		catch (err) {
			console.log(err);
		}
		this.updatePoints();
		console.log(newAlert)
	}

	updatePoints = async () => {
		try {
			let { data } = await axios.get(`https://data-visual-api.herokuapp.com/report`)
			let coords = [];
			data.slice(0, 300).forEach((e, i) => {
				if (e.longitude && e.latitude) {
					coords.push(
						<Marker key={i}
							coordinate={{ latitude: e.latitude, longitude: e.longitude }}
						>
							<MapView.Callout >
								<Text>Severity Level: {e.severity} {"\n"}Location: {e.latitude},{e.longitude}</Text>
							</MapView.Callout>
						</Marker>
					)
				}
			});
			if (this._isMounted) {
				this.setState({
					coords: coords,
				})
			}
		}
		catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<Container>
				<Header style={{ backgroundColor: 'white' }}>
					<Left>
						<TouchableOpacity onPress={() => { Actions.pop() }} >
							<Icon name="arrow-back" style={{ marginLeft: 5, fontSize: 35, color: '#1e90ff' }} />
						</TouchableOpacity>
					</Left>
					<Body style={{ flex: 3 }}><Text style={{ fontSize: 17.5, fontWeight: "600" }}>{this.props.title}</Text></Body>
					<Right>
						<TouchableOpacity onPress={() => this.newAlert()}>
							<Icon name="warning" style={{ fontSize: 35 }} />
						</TouchableOpacity>
					</Right>
				</Header>
				<Modal
					animationType="fade"
					transparent={false}
					visible={this.state.toggleModal}
					onRequestClose={this.toggleModal}
					presentationStyle="formSheet"
				>
					<Container>
						<Content>
							<Form>
								<Item fixedLabel>
									<Label>Location:</Label>
									<Input placeholder={`${this.state.currLoc[0]},${this.state.currLoc[1]}`} disabled />
								</Item>
								<Item fixedLabel>
									<Label>Accident Type:</Label>
									<Input onChangeText={(e) => this.setState({ accidentType: e })} />
								</Item>
								<Item picker fixedLabel>
									<Label>Severity Level:</Label>
									<Picker
										mode="dropdown"
										iosIcon={<Icon name="arrow-down" />}
										style={{ width: undefined }}
										placeholder="Severity Level"
										placeholderStyle={{ color: "#bfc6ea" }}
										placeholderIconColor="#007aff"
										selectedValue={this.state.selected}
										onValueChange={this.onValueChange.bind(this)}
									>
										<Picker.Item label="Low" value="Low" />
										<Picker.Item label="Medium" value="Medium" />
										<Picker.Item label="High" value="High" />
									</Picker>
								</Item>
							</Form>
						</Content>
					</Container>
					<View style={styles.textBox}>
						<Button style={{ width: "45%", textAlign: 'center' }} onPress={this.handleSubmit}>
							<Text>Submit</Text>
						</Button>
						<Button style={{ width: "45%", textAlign: 'center' }} onPress={this.toggleModal}>
							<Text>Cancel</Text>
						</Button>
					</View>
				</Modal>
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
						{this.state.coords}
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
	form: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBox: {
		flex: 1,
		flexDirection: "row",
		justifyContent: 'space-evenly',
		alignItems: 'center',
	}
});