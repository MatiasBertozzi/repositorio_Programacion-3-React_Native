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
        console.log('Monta el Registro')
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
lo redireccionara al login, en esta coleccion */

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
                username: username,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            })
            .then(()=> {
                this.props.navigation.navigate('Login')
            })

          })
          .catch(err=> {console.log('err:', err),this.setState({error:err.message})})  
        }

        else{if( password.length <6){this.setState({error:"La contraseña debe contener un minimo de 6 caracteres"})}
            if(!email.includes('@') ){this.setState({error:"El email debe contener un @ o direccion de correo electronico"})}
          if(username.length <=2){this.setState({error:"El nombre de usuario debe ser mayor a 3 caracteres"})}};
      }

    render(){
        return(
            <View style={styles.container}>
            <Text style={styles.titulo}>Registrarse</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={this.state.email}
                onChangeText={(text) => this.setState({ email: text ,error:""})}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text,error:"" })}
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text,error:"" })}
            />

            <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)} style={styles.boton}>
                <Text style={styles.textoBoton}>Crear cuenta</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
            </TouchableOpacity>

            {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
            </View>

        )
    };

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
    backgroundColor: '#28a745',
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


export default Registro