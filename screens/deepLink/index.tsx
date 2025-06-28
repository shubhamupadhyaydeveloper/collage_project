import { View, Text } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { RootStackNavigationType } from 'utils/types'

const DeepLinkingPage = () => {
    const { params } = useRoute<RouteProp<RootStackNavigationType, 'DeepLinking'>>()
    const { id } = params

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, color: "white" }}>DeepLinking id {id}</Text>
        </View>
    )
}

export default DeepLinkingPage;