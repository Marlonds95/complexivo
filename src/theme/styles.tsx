import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent: 'center',
        padding:20,
        gap:10
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center"
    },
    message:{
        backgroundColor:"#7a0808",
        width:"105%",
        
    },
    textRedirect:{
        marginTop:20,
        textAlign:"center",
        fontSize:15,
        fontWeight:"bold",
        color:"#705aa9"
    },
    rootActivity:{
        flex:1,
        justifyContent: 'center',
        alignContent:"center"
    },
    rootHome:{
        flex:1,
        marginHorizontal:25,
        marginVertical:50
    },
    headerHome:{
        flexDirection:"row",
        gap:15,
        alignItems:"center"
    }
})