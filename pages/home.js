import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Card } from 'react-native-elements';

export default class Home extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onMapReady = () => this.setState({ marginBottom: 0 })

    navigate = async (event) => {
        let coords = await event.coordinate;
        if (coords.latitude < 40.90 && coords.latitude > 40.83 && coords.longitude < -73.82 && coords.longitude > -73.94) {
            Actions.Bronx();
        }
        else if (coords.latitude < 40.83 && coords.latitude > 40.70 && coords.longitude < -73.90 && coords.longitude > -74.00) {
            Actions.Manhattan();
        }
        else if (coords.latitude < 40.81 && coords.latitude > 40.67 && coords.longitude < -73.50 && coords.longitude > -73.90) {
            Actions.Queens();
        }
        else if (coords.latitude < 40.70 && coords.latitude > 40.56 && coords.longitude < -73.84 && coords.longitude > -74.035) {
            Actions.Brooklyn();
        }
        else if (coords.latitude < 40.66 && coords.latitude > 40.55 && coords.longitude < -74.05) { // change if scroll enabled
            Actions.StatenIsland();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ zIndex: 1 }}>
                    <Card>
                        <Text> Please Select A Borough</Text>
                    </Card>
                </View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    onMapReady={this.onMapReady}
                    onPress={e => this.navigate(e.nativeEvent)}
                    style={[styles.map, { flex: 1, marginBottom: this.state.marginBottom }]}
                    initialRegion={{
                        latitude: 40.73283051513457,
                        longitude: -73.9417390152812,
                        latitudeDelta: 0.4,
                        longitudeDelta: 0.4
                    }}
                    showsCompass={false}
                    zoomTapEnabled={false}
                    scrollEnabled={false}
                    zoomEnabled={false}
                    loadingEnabled={true}>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});