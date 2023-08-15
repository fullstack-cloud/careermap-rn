import React from 'react'
import { View } from 'react-native'
import { Colors } from '../Utils/Colors'

const AppContainer = ({children,style={}}) => {
    return <View style={{flex: 1,paddingHorizontal: 25,paddingBottom: 150,backgroundColor: Colors.backgroundColor,...style}}>{children}</View>
}

export default AppContainer