import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: null,
      userPosts: [],
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

        this.setState({ userPosts: posts });
      });
  }
cerrarSesion() {
  auth.signOut()
    .then(() => console.log('Sesión cerrada'))
    .catch((error) => console.log(error));
}



  render() {
    return (
      <View>
        {this.state.userData ? (
          <View>
            <Text>Email: {this.state.userData.owner}</Text>
            <Text>Username: {this.state.userData.username}</Text>
            <Text>Fecha de registro: {new Date(this.state.userData.createdAt).toLocaleString()}</Text>

            <Text>Mis posteos:</Text>
            {this.state.userPosts.length === 0 ? (
              <Text>No tenés posteos aún.</Text>
            ) : (
              this.state.userPosts.map((item) => (
                <View key={item.id}>
                  <Text>- {item.data.contenido}</Text>
                </View>
              ))
            )}
            <TouchableOpacity onPress={() => this.cerrarSesion()}>
              <Text>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text>Cargando perfil...</Text>
        )}
      </View>
    );
  }
}