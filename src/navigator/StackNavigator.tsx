import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { HomeScreen } from "../screens/HomeScreen/HomeScreen";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { styles } from "../theme/styles";
import { DetailProductScreen } from "../screens/HomeScreen/DetailProductScreen";
const Stack= createStackNavigator();
interface Routes{
    name:string,
    screen: ()=> JSX.Element;
    headerShow?: boolean;
    title?:string
    
}

const routes:Routes[]=[
    {name:"Login", screen:LoginScreen},
    {name:"Register", screen:RegisterScreen},
    {name:"Home", screen:HomeScreen},
    {name:"Detail", screen: DetailProductScreen, headerShow:true, title:"Detalle del Videjuego"}
    
]

export const StackNavigator=()=>{

    const [isAuth, setIsAuth] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
    onAuthStateChanged(auth, (user)=>{
    if(user){
        setIsAuth(true)
    
    }
    setIsLoading(false);
      
      });}, []);
    

    return(
        <>
        {isLoading ? (
        <View style={styles.rootActivity}>
        <ActivityIndicator animating={true} size={35} />
        </View>
        ):(
        <Stack.Navigator initialRouteName={isAuth? "Home": "Login"}>
            { 
            routes.map((item, index)=>(
                <Stack.Screen key={index}
                    name ={item.name}
                     options={{headerShown:item.headerShow ?? false, title:item.title}}
                     component={item.screen}/>
            ))
        }
        </Stack.Navigator>)}
        </>
    );
}