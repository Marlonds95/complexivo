import React from 'react'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { Product } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props{
    product: Product;
}

export const ProductCardComponent = ({product}:Props) => {


const navigation = useNavigation();

  return (
    <View style={styles.rootListProduct}>
        <View>
            <Text variant='labelLarge'>Nombre : {product.name}</Text>
            <Text variant='bodyMedium'>Precio : ${product.price}</Text>
        </View>
        <View style={styles.icon}>
            <IconButton
            icon="arrow-right-bold-box"
            size={24}
            mode="contained"
            onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Detail", params:{product}}))}
            />
        </View>
    </View>
  )
}


