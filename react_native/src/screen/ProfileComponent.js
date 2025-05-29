import {Text, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import React, {Component} from 'react';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';
import 'firebase/firestore';

class ProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileEmail: '',
            profileCreationTime: '',
            profileUsername: '',
            postsUser: [],
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('User logged in');
                this.setState({profiles: auth.currentUser});

                const mailUser = auth.currentUser.email;

                db.collection('users').onSnapshot(
                    docs => {
                        docs.forEach(
                            doc => {
                                if (doc.data().owner === mailUser) {
                                    this.setState({
                                        profileEmail: doc.data().owner,
                                        profileCreationTime: doc.data().createdAt,
                                        profileUsername: doc.data().username,
                                    });
                                }
                            }
                        );
                    }
                )

                db.collection('posts').where('email' , '==', mailUser).onSnapshot(
                    docs => {
                        let posts = [];
                        docs.forEach(doc => {
                            posts.push({
                                id: doc.id,
                                data: doc.data()
                            });
                        });
                        this.setState({
                            postsUser: posts,
                            loading: false
                        });
                    },
                    error => {
                        console.error("Salto el siguiente error: ", error);
                        this.setState({loading: false});
                    }
                );

            }
        });
    }

    logOut = () => {
        auth.signOut().then(() => {
            console.log('User logged out');
        }).catch((error) => {
            console.error('Sign out error: ', error);
        });

        this.props.navigation.navigate('login')
    };

    deletePost = (postId) => {
        console.log('Delete post: ', postId);

        console.log(db.collection('posts'))

        db.collection('posts')
        .doc(postId)
        .delete()
        .then(() => {
            console.log('Post deleted');
        }).catch((error) => {
            console.error('Delete post error: ', error);
        }
        );
    };


    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={styles.IrRegistro} onPress={this.logOut}>
                        <Text style={styles.buttonText}>Log out</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Perfil</Text>

                    <View style={styles.profileInfo}>
                        <Text style={styles.profileText}>Email: </Text> <Text style={styles.text}>{this.state.profileEmail}</Text>
                        <Text style={styles.profileText}>Username: </Text> <Text style={styles.text}>{this.state.profileUsername}</Text>
                        <Text style={styles.profileText}>Creation time: </Text > <Text style={styles.text}>{this.state.profileCreationTime}</Text>
                        <Text style={styles.profileText}>Publicaciones: </Text>  <Text style={styles.text}>{this.state.postsUser.length}</Text>
                    </View>


                    <View>
                    <Text style={styles.reseñasTitle}>Mis Reseñas:</Text>
                    </View>
                    

                    <FlatList
                        data={this.state.postsUser}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.postContainer}>

                                <Text style={styles.postTitle}>
                                    Reseña: {item.data.descripcion}
                                </Text>

                                <Text style={styles.postDate}>
                                    Fecha: {item.data.fecha_creacion}
                                </Text>

                                <Text style={styles.postLike}>
                                    Likes: {item.data.like.length}
                                </Text>

                                <TouchableOpacity style={styles.Delete} onPress={() => this.deletePost(item.id)}>
                                    <Text style={styles.buttonText}>Delete</Text>
                                </TouchableOpacity>

                            </View>
                        )}
                    />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    title:{
        fontSize: 16,

    },
    reseñasTitle:{
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom:5,
        marginTop:200

    },
    text:{
        fontSize: 14,
        marginBottom:5
    },
    
    profileText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    postContainer: {
        // flex: 1,
        marginTop:10,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding:10
    },

    profileInfo: { 
        flex:1,
        marginBottom: 20,
        padding: 10,
        // backgroundColor: "white",
        borderRadius: 5,
    },

    postTitle: {
        fontSize: 14,
        marginBottom: 5,
        borderColor: '#007BFF',
        // marginBottom: 30,
    },

    postDate: {
        fontSize: 14,
        color: '#666',
    },

    postLike: {
        fontSize: 14,
        marginTop: 5,
        color: '#666',
    },

    Delete:{
        padding: 10,
        marginTop: 10,
        backgroundColor: "#bd4120",
        borderRadius: 5,
        alignItems: 'center'
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom:30,
        marginTop:40
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    IrRegistro:{
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center'
    }
});

export default ProfileComponent;