import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { auth, db } from '../firebase/config'



class Registro extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password: '',
            username: '',
            error:""
        }
    }
/* en este codigo comprobamos si la sesion del usuario esta activa 
(eso quiere decir que esta logueado y por consiguiente que esta registrado)
si esta activa la sesion entonces la redirreccionara a Home o la pagina de inicio,
caso contrario debera registrarse */

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

    redireccionar(){
    this.props.navigation.navigate('Login')

    }

/* en esta linea de codigo nosotros vamos a crear un ususario, primero se deben cunplir con las especificaciones para 
crear un email, constraseña y nombre de usuario, una vez que se cumplan esos campos se creara el ususario, una tabla o coleccion y 
lo redireccionara al login, en esta coleccion    */
    registrarUsuario(email, password, username){
        if(
            (email !== '' && password !== '' && username !== '')
            &&
            password.length >= 6
            &&
            email.includes('@') 
            &&
            username.length > 3
        ){
          auth.createUserWithEmailAndPassword(email, password)
          .then(() => {

            db.collection('users')
            .add({
                owner: email,
                username: username
            })
            .then(()=> {
                this.props.navigation.navigate('Login')
            })

          })
          .catch(err=> {console.log('err:', err),this.setState({error:err.message})})  
        }
    }

    render(){
        return(
            <View>
                
                 <TouchableOpacity onPress={() => this.redireccionar()}>
                          <Text>Login</Text>
                        </TouchableOpacity>

                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text, error:""})}
                    keyboardType='default'
                    style={styles.input}
                />
                <Text> {this.state.error}</Text>

                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    keyboardType='default'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.username}
                    onChangeText={(text) => this.setState({username: text})}
                    keyboardType='default'
                    style={styles.input}
                />
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
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

export default Registro