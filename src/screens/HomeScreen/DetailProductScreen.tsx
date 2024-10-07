import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Divider, TextInput, Button } from 'react-native-paper';
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native';
import { Product } from './HomeScreen';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import { ref, remove, update } from 'firebase/database';


export const DetailProductScreen = () => {

    const navigation = useNavigation();
        const route = useRoute();
        //@ts-ignore
        const {product}=route.params;

        const [formEdit, setformEdit] = useState<Product>({
            id: "",
            name: "",
            plataform:"",
            price: 0,
            stock:0,
            genre:"",
            releaseDate:"" 
        });

        useEffect(()=>{
            setformEdit(product);
        },[]);

        const handleSetValues= (key: string, value:string)=>{
            setformEdit({...formEdit, [key]:value})
        }

        const handleUpdateProduct= async()=>{
            const dbRef=ref(dbRealTime,"products/"+ auth.currentUser?.uid + "/"+formEdit.id)
            try{
            await update(dbRef,{
                name:formEdit.name,
                plataform:formEdit.plataform,
                price:formEdit.price,
                stock:formEdit.stock,
                genre:formEdit.genre,
                releaseDate:formEdit.releaseDate,
            });

            navigation.goBack();
        }catch(e){
            console.log(e)
        }
        }

        const handleDeleteProduct =async()=>{
            const dbRef=ref(dbRealTime,"products/" + auth.currentUser?.uid+ "/"+formEdit.id);
            try{
            await remove(dbRef);
            navigation.goBack();
            } catch(e){
                console.log(e)
            }
        }
  return (

    <View style={styles.rootDetail}>
        <View>
        <Text variant='headlineSmall'>Video Juego </Text>
        <Divider/>
        
        <TextInput
        value={formEdit.name}
        onChangeText={(value)=> handleSetValues("name",value)}
        />
        <Divider/>
        </View>
        <View>
        <Text variant='bodyLarge'>Plataforma compatible</Text>
        <TextInput
        value={formEdit.plataform}
        onChangeText={(value)=> handleSetValues("plataform",value)}
        />
        </View>
        <View style={styles.rootInputsProduct}>
        <Text variant='labelLarge'>Precio:</Text>
        <TextInput
        value={formEdit.price.toString()}
        onChangeText={(value)=> handleSetValues("price",value)}
        style={{width:"25%"}}
        />
        <Text variant='labelLarge'>Stock </Text>
        <TextInput
        value={formEdit.stock.toString()}
        onChangeText={(value)=> handleSetValues("stock",value)}
        style={{width:"24%"}}
        />
        </View>
        <View>
        <Text variant='bodyLarge'>Género </Text>
        <TextInput
        value={formEdit.genre}
        onChangeText={(value)=> handleSetValues("genre",value)}
        />
        </View>
        <View>
        <Text variant='bodyLarge'>Fecha lanzamiento del Videojuego </Text>
        <TextInput
        value={formEdit.releaseDate}
        onChangeText={(value)=> handleSetValues("releaseDate",value)}
        />
        </View>
       
            <Button 
            mode='contained'
            icon="update"
            onPress={handleUpdateProduct}>
                Actualizar
                </Button>
            <Button 
            mode='contained' 
            icon="delete-empty-outline"
            onPress={handleDeleteProduct}>
                Eliminar
                </Button>
        
    </View>
    
  )
}

