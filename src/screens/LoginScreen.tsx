import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';


interface FormLogin{
    email: string,
    password: string,
}
interface ShowMessage {
    visible:boolean;
    message:string;
    color:string;
}
export const LoginScreen = () => {

    const [formLogin, setformLogin] = useState<FormLogin>({
        email: '',
        password:""        
    });

    const handleSetValues =(key : string, value: string) => {
        setformLogin({...formLogin,[key]:value});
    }
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
    
    const navigation= useNavigation();
    
    const handleSignIn=async()=>{
        if (!formLogin.email || !formLogin.password){
            setShowMessage({
                visible:true,
                message:"Completa todos los campos!",
                color:"#7a0808"
            });
            return;
        }
        try {
            const response= await signInWithEmailAndPassword(auth, formLogin.email, formLogin.password);
        
        } catch (e) {
            console.log(e);
            setShowMessage
            ({
                visible:true,
                message:"Usuario o contraseña incorrectos",
                color:"#7a0808"
            })
        }
        


    }

    
const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color:"#fff"
});

    return(
    <View style={styles.root}>
    <Text style={styles.text}>Inicia Sesión</Text>
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
    <Button mode="contained" onPress={ handleSignIn}> Iniciar</Button>
    <Text style={styles.textRedirect}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:"Register"}))}>
        No tienes cuenta? Regístrate ahora</Text>
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


