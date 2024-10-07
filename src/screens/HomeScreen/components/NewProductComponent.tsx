import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, IconButton, Modal, Portal, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { auth, dbRealTime } from '../../../config/firebaseConfig';
import { push, ref, set } from 'firebase/database';


interface Props{
    showModalProduct:boolean;
    setShowModalProduct: Function;

}

interface FormProduct{
    name: string;
    plataform: string;
    price: number;
    stock:number;
    genre:string;
    releaseDate:string

}
interface ShowMessage {
    visible:boolean;
    message:string;
    color:string;
}
export const NewProductComponent = ({showModalProduct, setShowModalProduct}:Props) => {
  
    const [formProduct, setformProduct] = useState<FormProduct>({
        name:"",
        plataform:"",
        price:0,
        stock:0,
        genre:"",
        releaseDate:""
    });

    const  handleSetValues=async(key:string,value:string)=>{
        setformProduct({...formProduct,[key]:value})
    }
  const handleSaveProduct=async()=>{
    if(!formProduct.name ||!formProduct.plataform||!formProduct.price||!formProduct.stock||!formProduct.genre||!formProduct.releaseDate ){
        setShowMessage({
            visible:true,
            message:"Completa todos los campos!",
            color:"#7a0808"
        });
        return;

    }


    const dbRef=ref(dbRealTime, "products/" + auth.currentUser?.uid);
    const saveProduct =push(dbRef);

    try{
    await set(saveProduct, formProduct)
    setShowModalProduct(false)
}catch(e){
    console.log(e);
    setShowMessage({
        visible:true,
        message:"No se completo la transacción, intentalo más tarde!",
        color:"#7a0808"
    });
}
  }
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color:"#fff"
});
    return (
        <>
    <Portal>
      <Modal visible={showModalProduct}  contentContainerStyle={styles.modal}>
          <View style={styles.header}>
          <Text variant='headlineSmall'>Nuevo Video Juego</Text>
          <View style={styles.icon}>
          <IconButton
          icon="close-circle-outline"
          size={30}
          mode="contained"
          onPress={()=>setShowModalProduct(false)}
          />
          </View>
          </View>
          <Divider/>
          
          <TextInput
          mode="outlined"
          label="Nombre"
          
          onChangeText={(value)=>handleSetValues("name",value)}
          />
          <TextInput
          mode="outlined"
          label="Plataforma compatible"
          
          onChangeText={(value)=>handleSetValues("plataform",value)}
          />
          <View style={styles.rootInputsProduct}>
          <TextInput
          mode="outlined"
          label="Precio"
          keyboardType='numeric'
          style={{width:"45%"}}
          
          onChangeText={(value)=>handleSetValues("price",value)}
          />
          <TextInput
          mode="outlined"
          label="Cantidad disponible"
          keyboardType='numeric'
          style={{width:"45%"}}
          
          onChangeText={(value)=>handleSetValues("stock",value)}
          />
          </View>
          <TextInput
          mode="outlined"
          label="Género"
          
          onChangeText={(value)=>handleSetValues("genre",value)}
          />
          <TextInput
          mode="outlined"
          label="Fecha lanzamiento del Videojuego"
          
          onChangeText={(value)=>handleSetValues("releaseDate",value)}
          />
          
          <Button mode="contained" onPress={handleSaveProduct}>
            Agregar
          </Button>
      </Modal>
      <Snackbar
    visible={showMessage.visible}
    onDismiss={()=>setShowMessage({...showMessage,visible:false})}
    style={{...styles.message,
        backgroundColor:showMessage.color
   
    }}>
        {showMessage.message}
    
  </Snackbar>
    </Portal>
    
  </>
  )
}

