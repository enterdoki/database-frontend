import React from 'react'
import { Text,StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import axios from 'axios';

export default class Brooklyn extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            coords: [],
            issues: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        try {
            let { data } = await axios.get('https://data-visual-api.herokuapp.com/borough/Brooklyn');
            let coords = [];
			data.slice(0,300).forEach((e, i) => {
				if (e.longitude && e.latitude) {
					color = e.price <= 100 ? '#ffa500' : (e.price <= 200 && e.price > 100) ? '#ff4500' : '#ff0000';
					coords.push(
						<Marker key={i}
							coordinate={{ latitude: e.latitude, longitude: e.longitude }}
							pinColor={color}>
							<MapView.Callout >
								<Text>Price: ${e.price} per night{"\n"}Number Of Reviews: {e.number_of_reviews}{"\n"}Room Type: {e.room_type}</Text>
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
        catch(err){
            console.log(err);
        }
        try{
            let { data } = await axios.get('http://data-visual-api.herokuapp.com/service/Brooklyn');
            let issues = [];
            data.forEach((e, i) => {
                if (e.longitude && e.latitude) {
                    issues.push(
                        <Polyline key={i}
                            coordinates={[
                                { latitude: e.latitude, longitude: e.longitude },
                                { latitude: e.latitude, longitude: e.longitude + .0001 },
                                { latitude: e.latitude - .0001, longitude: e.longitude + .0001 },
                                { latitude: e.latitude - .0001, longitude: e.longitude },
                                { latitude: e.latitude, longitude: e.longitude }
                            ]}
                            strokeColor="#dc143c"
                            strokeWidth={6}
                        />
                    )
                }
            });
            if (this._isMounted) {
                this.setState({
                    issues:issues
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onMapReady = () => this.setState({ marginBottom: 0 })

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    onMapReady={this.onMapReady}
                    style={[styles.map, { flex: 1, marginBottom: this.state.marginBottom }]}
					initialRegion={{
						latitude: 40.644823,
						longitude: -73.958926,
						latitudeDelta: 0.16,
						longitudeDelta: 0.16
					}}
                    showsCompass={false}
                    loadingEnabled={true}>
                    {this.state.coords}
                    {this.state.issues}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});