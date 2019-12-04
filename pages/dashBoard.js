import React from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class dashboard extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        this._isMounted = true;
        try{
            
        }
        catch(err){
            console.log(err)
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View>
                <Text>Hi</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});