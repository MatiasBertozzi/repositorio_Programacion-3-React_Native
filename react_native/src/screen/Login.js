import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'



class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password: '',
            loggedIn:false,
            error:""
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

    /* para pasar info  mediante la navegacion escribir 
    el codigo asi => this.props.navigation.navigate('Registro', {info :a pasar})*/

    redireccionar(){
    this.props.navigation.navigate('Registro')

    }
    /* si la info de los campos es erronea, estos se limpiaran y devolvera un error, caso contrario, 
    si la info de los campos es correcta redireccionara a home o cualquier otra pagina */

    login(email,pass){
        auth.signInWithEmailAndPassword(email,pass)
        .then((resp)=> {this.setState({loggedIn:true}),this.props.navigation.navigate('Tab',{loggedIn:true})
})
        .catch(error=> {this.setState({error:"credenciales no validas",email:"",password:""})})
    }

    
    render(){
        return(
            <View>
                 <TouchableOpacity onPress={() => this.redireccionar()}>
                          <Text>Resgistro</Text>
                        </TouchableOpacity>

                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text, error:""})}
                    keyboardType='default'
                    style={styles.input}
                    placeholder='email'
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text,error:""})}
                    keyboardType='default'
                    style={styles.input}
                    placeholder='contraseña'
                />

                <Text> {this.state.error}</Text>
                
                <TouchableOpacity onPress={()=> this.login(this.state.email,this.state.password)}>
                    <Text>Registrar usuario</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles= StyleSheet.create({
    input:{
        borderWidth: 1,
        borderColor: 'pink'
    }
})

export default Login