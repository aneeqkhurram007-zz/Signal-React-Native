import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from "react-native-elements"
import { db } from '../firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setchatMessages] = useState([])
    useEffect(() => {
        const unsubscribe = db.collection('chats').doc(id).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setchatMessages(snapshot.docs.map(doc => doc.data()))
        })
        return unsubscribe
    }, [])
    return (
        <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider >
            <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.'
                }}

            />

            <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '800' }} >
                    {chatName}
                </ListItem.Title>
                <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" >
                    {chatMessages?.[0]?.displayName} : {chatMessages?.[0]?.message}
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})