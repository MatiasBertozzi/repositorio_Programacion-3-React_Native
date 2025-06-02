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

        posts.sort((a, b) => b.data.createdAt - a.data.createdAt);

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
    <Text style={styles.texto}>Cargando perfil...</Text>
  )}
</View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f172a'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 16
  },
  info: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 6
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginTop: 24,
    marginBottom: 12
  },
  post: {
    backgroundColor: '#1e293b',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#334155'
  },
  botonLogout: {
    backgroundColor: '#ef4444',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  textoBotonLogout: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600'
  },
  texto: {
    color: "white",
  }
});
