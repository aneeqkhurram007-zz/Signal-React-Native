import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Icon } from 'react-native-elements'
import { db } from '../firebase'
const AddChatScreen = ({ navigation }) => {
    const [input, setinput] = useState('')
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats"
        })
    }, [navigation])
    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack()
        }).catch(err => alert(err))
    }
    return (
        <View style={styles.container}>
            <Input placeholder="Enter a chat name"
                onSubmitEditing={createChat}
                leftIcon={<Icon name="wechat" type="antdesign" size={24} color="black" />}
                value={input} onChangeText={(text) => setinput(text)} />
            <Button disabled={!input} title="Create New Chat" onPress={createChat} />
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        height: "100%"
    }
})
