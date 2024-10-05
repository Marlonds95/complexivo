import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormRegister{
    email:string,
    password:string,
}

interface ShowMessage {
    visible:boolean;
    message:string;
    color:string;
}

export const RegisterScreen = () => {
//hook useState
const [formRegister, setFormRegister] = useState <FormRegister>({
    email:"",
    password:""
});

const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color:"#fff"
});

//contraseña
const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);


const handleSetValues=(key: string, value:string) =>{
    setFormRegister({...formRegister, [key]:value});
    

}
const navigation= useNavigation();
//Registrar Nuevos Usuarios

const handleRegister = async () => {
    if (!formRegister.email || !formRegister.password){
        setShowMessage({visible:true, message:"Completa todoso los campos!", color:"#7a0808"});
        return;
            
    }
    try {
        const response= await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
    )
    setShowMessage({visible:true,
         message:"Registro exitoso!", color:"#085f06"});  
         
    } catch (e) {
        console.log(e);
        setShowMessage({visible:true, message:"No se logró completar el registro, intenta más tarde!", color:"#7a0808"});
    }
    
}

  return (
    <View style={styles.root}>
    <Text style={styles.text}>Regístrate</Text>
    <TextInput
        label="Correo"
        mode="outlined"
        placeholder='Escribe tu correo'
        onChangeText= {(value)=>handleSetValues("email",value)}
    />
    <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder='Escribe tu contraseña' 
        secureTextEntry={hiddenPassword}
        onChangeText= {(value)=>handleSetValues("password",value)}
        right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
    />
    <Button mode="contained" onPress={ handleRegister}> Registrar</Button>
    <Text style={styles.textRedirect}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Login"}))}>
        Ya tienes cuenta? Inicia Sesión ahora</Text>
    <Snackbar
        visible={showMessage.visible}
        onDismiss={()=>setShowMessage({...showMessage,visible:false})}
        style={{...styles.message,
            backgroundColor:showMessage.color
       
        }}>
            {showMessage.message}
        
      </Snackbar>
    </View>
  )
}


