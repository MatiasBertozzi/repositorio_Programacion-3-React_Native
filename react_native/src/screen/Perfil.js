import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';

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

        this.setState({ userPosts: posts});
      });

    }

cerrarSesion() {
  auth.signOut()
    .then(() => console.log('Sesión cerrada'))
    .catch((error) => console.log(error));
}

/* userPosts es un array de objetos literarios */

/* obtuve la info de la documentacion de firestore */
borrarPost(id_post){
  db.collection('posts')
      .doc(id_post)
     .delete()
     .then(()=> console.log("El comentario se a eliminado con exito", id_post))
     .catch((err)=>console.log("Ha ocurrido un error: " , err))
}

  render() {
    return (
      <View style={styles.container}>
        {this.state.userData ? (
      <View>
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
        this.state.userPosts.map((item) => (
          <View key={item.id} style={styles.post}>
            <Text>{item.data.contenido}</Text>
            <TouchableOpacity onPress={()=> this.borrarPost(item.id)} >
              <Text>Borrar post</Text>
            </TouchableOpacity>
          </View>
        ))
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
