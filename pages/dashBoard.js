import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import axios from 'axios';

export default class dashboard extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            freq: []
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        try {
            let { data } = await axios.get(`http://data-visual-api.herokuapp.com/service/count`);
            if (this._isMounted) {
                this.setState({
                    freq: data
                })
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    display = () => (
        this.state.freq.map((item , i)=>{
            return(
                <Text key={i} style={{textAlign: 'center'}}>Neighborhood: {item.neighbourhood} Service Count: {item.count}</Text>
            )
        })
    )

    render() {
        return (
            <View style={{flex:1, justifyContent: "space-evenly", alignItems:'center'}}>
                <Text h3 style={{textAlign: 'center'}}>High Request Areas</Text>
                {this.state.freq.length > 0 ? this.display(): <View/>}
            </View>
        );
    }
}

const styles = StyleSheet.create({

});