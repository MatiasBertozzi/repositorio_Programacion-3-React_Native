import { View, Text, TextInput, TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

export default class Post extends Component {
        constructor(props){
            super(props)
            this.state={
                posts:[],
                userPosts:props.userPosts,
                perfil:props.perfil
            }
        }

componentDidMount() {
  db.collection('posts')
    .orderBy('createdAt', 'desc')
    .onSnapshot((docs) => {
      let posteos = [];

      docs.forEach((doc) => {
        posteos.push({
          id: doc.id,
          data: doc.data()
        });
      });

      this.setState({
        posts: posteos,
        loading: false
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
          {this.state.perfil ? 
          ( <FlatList 
            data={this.state.userPosts}
            keyExtractor={item=>item.id}
            renderItem={({item})=>
                <View style={styles.post}>
                    <Text> {item.data.contenido}</Text>
                    <TouchableOpacity onPress={()=> this.borrarPost(item.id)} >
                         <Text>Borrar post</Text>
                    </TouchableOpacity>
                </View>}/>) :

                ( <FlatList 
                  data={this.state.posts}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.postContainer}>
                      <Text style={styles.postEmail}>Autor: {item.data.email}</Text>
                      <Text style={styles.postContenido}>Post: {item.data.contenido}</Text>
                      <Text style={styles.postLikes}>Likes: {item.data.likes.length}</Text>
        
                      <TouchableOpacity
                        onPress={() => {
                          let email = auth.currentUser.email;
        
                          if (item.data.likes.includes(email)) {
                            db.collection('posts')
                              .doc(item.id)
                              .update({
                                likes: firebase.firestore.FieldValue.arrayRemove(email)
                              });
                          } else {
                            db.collection('posts')
                              .doc(item.id)
                              .update({
                                likes: firebase.firestore.FieldValue.arrayUnion(email)
                              });
                          }
                        }}
                      >
                        <Text style={styles.botonLike}>
                          {item.data.likes.includes(auth.currentUser.email)
                            ? 'Quitar Like'
                            : 'Dar Like'}
                        </Text>
                      </TouchableOpacity>
        
                    </View>
                  )}
                />)}
         </View>

        
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0f172a'  // azul oscuro tipo app moderna
  },
  loading: {
    marginTop: 100,
    alignItems: 'center',
  },
  postContainer: {
    backgroundColor: '#1e293b', // tarjeta azul intermedia
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },
  postEmail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#38bdf8',  // celeste fuerte
    marginBottom: 6,
  },
  postContenido: {
    fontSize: 16,
    color: '#f8fafc', // casi blanco
    marginBottom: 10,
    lineHeight: 22
  },
  postLikes: {
    fontSize: 13,
    color: '#94a3b8', // gris claro
    marginBottom: 6
  },
  botonLike: {
    fontSize: 15,
    color: '#3b82f6',
    fontWeight: '600',
    paddingVertical: 6,
  }
});
