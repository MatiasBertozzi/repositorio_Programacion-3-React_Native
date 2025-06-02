import { Text, View, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import Post from '../components/Post';

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

        <Post posts={this.state.posts} perfil={false} />
      
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
