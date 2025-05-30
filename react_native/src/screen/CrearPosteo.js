import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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
      <View>
        <Text>Crear nuevo posteo</Text>
        <TextInput
          placeholder="Escribí tu posteo"
          value={this.state.contenido}
          onChangeText={(text) => this.setState({ contenido: text })}
        />
        <TouchableOpacity onPress={() => this.crearPosteo()}>
          <Text>Postear</Text>
        </TouchableOpacity>
        {this.state.error !== '' && <Text>{this.state.error}</Text>}
      </View>
    );
  }
}