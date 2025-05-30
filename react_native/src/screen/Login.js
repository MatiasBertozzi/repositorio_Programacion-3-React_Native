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
            <View style={styles.container}>
            <Text style={styles.titulo}>Iniciar sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text })}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
            />

            <TouchableOpacity onPress={() => this.login()} style={styles.boton}>
                <Text style={styles.textoBoton}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Registro')}>
                <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
            </TouchableOpacity>

            {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
            </View>

        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16
  },
  boton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16
  },
  link: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  }
});


export default Login

