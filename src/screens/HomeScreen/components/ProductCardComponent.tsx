import React from 'react'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper';
import { styles } from '../../../theme/styles';

export const ProductCardComponent = () => {
  return (
    <View>
        <View style={styles.rootListProduct}>
            <Text variant='labelLarge'>Nombre:</Text>
            <Text variant='bodyMedium'>Precio:</Text>
        </View>
        <View style={styles.icon}>
            <IconButton
            icon="arrow-right-bold-box"
            size={24}
            mode="contained"
            onPress={()=>("")}

            />
        </View>
    </View>
  )
}


