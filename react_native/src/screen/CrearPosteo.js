import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

export default class CrearPosteo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contenido: '',
      error: ''
    };
  }

  crearPosteo() {
    if (this.state.contenido.trim() !== '') {
      db.collection('posts')
        .add({
          email: auth.currentUser.email,
          contenido: this.state.contenido,
          createdAt: Date.now(),
          likes: []
        })
        .then(() => {
          this.setState({ contenido: '', error: '' });
          this.props.navigation.navigate('Feed');  
        })
        .catch((err) => {
          console.log(err);
          this.setState({ error: 'Error al crear posteo' });
        });
    } else {
      this.setState({ error: 'El contenido no puede estar vacío' });
    }
  }

 render() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear nuevo posteo</Text>

      <TextInput
        style={styles.input}
        placeholder="Escribí tu posteo"
        value={this.state.contenido}
        onChangeText={(text) => this.setState({ contenido: text })}
        multiline={true}
      />

      <TouchableOpacity onPress={() => this.crearPosteo()} style={styles.boton}>
        <Text style={styles.textoBoton}>Postear</Text>
      </TouchableOpacity>

      {this.state.error !== '' && <Text style={styles.error}>{this.state.error}</Text>}
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16
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
    alignItems: 'center'
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16
  },
  error: {
    marginTop: 12,
    color: 'red'
  }
});
