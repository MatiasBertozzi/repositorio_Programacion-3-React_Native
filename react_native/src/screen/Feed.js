import { Text, View, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
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
    <View>
      {this.state.loading ? (
        <View>
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
            <View>
              <Text>Autor: {item.data.email}</Text>
              <Text>Post: {item.data.contenido}</Text>
              <Text>Likes: {item.data.likes.length}</Text>

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
                <Text>
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