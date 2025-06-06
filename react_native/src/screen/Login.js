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

    login(email,password){
         if(
            (email !== '' && password !== '' )
            &&
            password.length >= 6
            &&
            email.includes('@') 
            
        ){auth.signInWithEmailAndPassword(email,password)
        .then((resp)=> {this.setState({loggedIn:true}),this.props.navigation.navigate('Tab',{loggedIn:true})})
        .catch(()=> {this.setState({error:"Los datos ingresados no son correctos"})} )}

          else{
            if(email == "" || password == ""){this.setState({error:"Los campos no pueden estar vacios, por favor ingrese su email y constraseña"})}
            else{
            if( password.length <6){this.setState({error:"La contraseña debe contener un minimo de 6 caracteres"})}
            if(!email.includes('@') ){this.setState({error:"El email debe contener un @ o direccion de correo electronico valida"})}}}
        
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
                onChangeText={(text) => this.setState({ email: text, error:"" })}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text,error:"" })}
            />
                  {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}

            <TouchableOpacity onPress={() => this.login(this.state.email, this.state.password)} style={styles.boton}>
                <Text style={styles.textoBoton}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Registro')}>
                <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
            </TouchableOpacity>

            
            </View>

        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#0f172a'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    color: '#f8fafc',
    fontSize: 16,
    marginBottom: 16
  },
  boton: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  link: {
    color: '#38bdf8',
    textAlign: 'center',
    marginTop: 8
  },
  error: {
    color: '#f87171',
    marginTop: 10,
    textAlign: 'center'
  }
});


export default Login

