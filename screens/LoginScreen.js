import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image } from 'react-native-elements'
import { auth } from '../firebase'

const LoginScreen = ({ navigation }) => {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authUser => {
            if (authUser) {
                navigation.replace("Dashboard")
            }
        })
        return unsubscribe
    }, [])
    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch(err => alert(err.message))
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png',

            }}
                style={{ width: 200, height: 200 }}

            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email"
                    onChangeText={(text) => setEmail(text)}
                    value={email} />
                <Input placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn}
                    secureTextEntry type="password" password={password} />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate('Register')} containerStyle={styles.button} type="outline" title="Register" />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
})
