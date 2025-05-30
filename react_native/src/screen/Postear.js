import {Text,View} from "react-native";
import React, {Component} from "react";
import CrearPosteo from '../components/CrearPosteo';  

export default class Postear extends Component{
    constructor(props){
        super(props)
    }
    render() {
        return(
            <View> 
                <CrearPosteo navigation ={this.props.navigation}/>
            </View>
        )
    }
}