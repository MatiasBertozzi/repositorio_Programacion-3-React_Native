import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      userPosts: []
    };
  }

  componentDidMount() {
    
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let info = [];
        docs.forEach((doc) => {
          info.push(doc.data());
        });

        this.setState({
          userData: info[0]
        });
      });
      

    
    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let posts = [];

        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });

        posts.sort(function(a,b){return a.data.createdAt - b.data.createdAt})

        this.setState({ userPosts: posts});
      });

    }

cerrarSesion() {
  auth.signOut()
    .then(() => console.log('Sesión cerrada'))
    .catch((error) => console.log(error));
}

/* userPosts es un array de objetos literarios */

  render() {
    return (
      <View style={styles.container}>
        {this.state.userData ? (
      <View style={styles.container}>
      <Text style={styles.titulo}>Mi perfil</Text>
      <Text style={styles.info}>Email: {this.state.userData.owner}</Text>
      <Text style={styles.info}>Username: {this.state.userData.username}</Text>
      <Text style={styles.info}>
        Fecha de registro: {new Date(this.state.userData.createdAt).toLocaleString()}
      </Text>

      <TouchableOpacity onPress={() => this.cerrarSesion()} style={styles.botonLogout}>
        <Text style={styles.textoBotonLogout}>Cerrar sesión</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Mis posteos:</Text>

      {this.state.userPosts.length === 0 ? (
        <Text style={styles.info}>No tenés posteos aún.</Text>
      ) : (
        
          <Post userPosts={this.state.userPosts} perfil={true}  style={styles.post}/>

      )}
    </View>
  ) : (
    <Text>Cargando perfil...</Text>
  )}
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
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333'
  },
  botonLogout: {
    backgroundColor: '#ff3b30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24
  },
  textoBotonLogout: {
    color: '#fff',
    fontSize: 16
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  post: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8
  }
});
