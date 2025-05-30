import { Text, View, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';


export default class Feed extends Component {
  constructor(props) {
  super(props);
  this.state = {
    posts: [],
    loading: true
  };
}componentDidMount() {
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
}

 render() {
  return (
    
    <View style={styles.container}>
      {this.state.loading ? (
        <View style={styles.loading}>
          <ActivityIndicator />
          <Text>Cargando posteos...</Text>
        </View>
      ) : this.state.posts.length === 0 ? (
        <View>
          <Text>No hay posteos todavía.</Text>
        </View>
      ) : (
        <FlatList
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
        />
      )}
    </View>
  );
}

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff'
  },
  loading: {
    marginTop: 100,
    alignItems: 'center',
  },
  postContainer: {
    backgroundColor: '#eeeeee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  postEmail: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 14,
    color: '#000000'
  },
  postContenido: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333333'
  },
  postLikes: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 4
  },
  botonLike: {
    fontSize: 14,
    color: '#007AFF'
  }
});
