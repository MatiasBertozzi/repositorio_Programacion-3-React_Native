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
    backgroundColor: '#0f172a',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 16
  },
  input: {
    backgroundColor: '#1e293b',
    borderColor: '#334155',
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    color: '#f8fafc',
    fontSize: 16
  },
  boton: {
    backgroundColor: '#3b82f6',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  error: {
    marginTop: 10,
    color: '#f87171'
  }
});
