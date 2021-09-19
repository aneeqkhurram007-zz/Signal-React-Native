import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StatusBar, StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../firebase'
const RegisterScreen = ({ navigation }) => {
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setPassword] = useState('')
    const [imageURL, setImageURL] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password).then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageURL ||
                    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png',

            }
            )
        }).catch(err => alert(err.message))
    }
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>Create a signal account</Text>
            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autofocus type="text"
                    value={name} onChangeText={(text) => setname(text)} />
                <Input placeholder="Email" autofocus type="email"
                    value={email} onChangeText={(text) => setemail(text)} />
                <Input placeholder="Password" secureTextEntry type="password"
                    value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder="Profile Picture (Optional)" type="text"
                    value={imageURL} onChangeText={(text) => setImageURL(text)} onSubmitEditing={register} />

            </View>
            <Button
                containerStyle={styles.button}
                raised title="Register" onPress={register} />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: 'white'
    },
    button: {
        width: 200,
        marginTop: 10,
    },
    inputContainer: {
        width: 300,
    }
})
