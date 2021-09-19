import React, { useLayoutEffect, useState } from 'react'
import {
    Keyboard, KeyboardAvoidingView, ScrollView,
    StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native'
import { Avatar } from 'react-native-elements'
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { TextInput } from 'react-native'
import { Platform } from 'react-native'
import { auth, db } from '../firebase'
import firebase from 'firebase'

const ChatScreen = ({ navigation, route }) => {
    const [input, setinput] = useState('')
    const [messages, setmessages] = useState([])
    const sendMessage = () => {
        console.log(auth.currentUser);
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })
        setinput('')
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerTitleAlign: 'left',
            headerBackTitleVisible: false,
            headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Avatar rounded source={{
                        uri: messages[0]?.data.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png'
                    }} />
                    <Text style={{

                        color: 'white',
                        marginLeft: 10,
                        fontWeight: '700'
                    }}>{route.params.chatName}</Text>
                </View>
            ),
            headerRight: () => (
                <View style={{
                    flexDirection: "row", justifyContent: "space-between",
                    marginRight: 20,
                    width: 80,
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation, messages])
    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setmessages(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [route])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={styles.container} keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
                            {messages.map(({ id, data }) => (
                                data.email === auth.currentUser.email ? (
                                    <View key={id} style={styles.reciever}>
                                        <Avatar
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                left: -5
                                            }}
                                            position="absolute"
                                            rounded
                                            size={30}
                                            source={{
                                                uri: data.photoURL
                                            }} />
                                        <Text style={styles.recieverText}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View key={id} style={styles.sender}>
                                        <Avatar
                                            position="absolute"
                                            containerStyle={{
                                                position: "absolute",
                                                bottom: -15,
                                                left: -5
                                            }}
                                            rounded
                                            size={30}
                                            source={{
                                                uri: data.photoURL
                                            }} />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>

                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput value={input}
                                onChangeText={(text) => setinput(text)}
                                placeholder="Signal Message" style={styles.textInput} onSubmitEditing={sendMessage} />
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="#2B68E6" />
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    footer: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        padding: 15
    },
    reciever: {
        padding: 15,
        backgroundColor: '#ECECEC',
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        marginLeft: 10,
        marginBottom: 15,
        fontWeight: '500',
        color: "white",
    },
    recieverText: {
        marginLeft: 10,
        marginBottom: 15,
        fontWeight: '500',
        color: "black",
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },
    sender: {
        padding: 15,
        backgroundColor: '#2868E6',
        alignSelf: "flex-start",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ECECEC',
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})
