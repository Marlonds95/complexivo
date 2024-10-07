import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text, IconButton, Portal, Modal, Divider, TextInput, Button, FAB } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { auth, dbRealTime } from '../../config/firebaseConfig';
import firebase, { updateProfile } from "@firebase/auth"
import { FlatList } from 'react-native-gesture-handler';
import { ProductCardComponent } from './components/ProductCardComponent';
import { NewProductComponent } from './components/NewProductComponent';
import { onValue, ref } from 'firebase/database';
import { useNavigation, CommonActions } from '@react-navigation/native';

interface FormUser{
  name: string,
}

export interface Product{
  id: string,
  name: string;
    plataform: string;
    price: number;
    stock:number;
    genre:string;
    releaseDate:string
}
export const HomeScreen = () => {
const navigation = useNavigation();

  const [formUser, setFormUser] = useState<FormUser>({
    name: ''
  });

  const [userData, setuserData] = useState<firebase.User | null>(null)

  const [products, setproducts] = useState<Product[]>([])


const [showModalProfile, setshowModalProfile] = useState <boolean>(false);

const [showModalProduct, setShowModalProduct] = useState <boolean>(false);


useEffect(()=>{
  setuserData(auth.currentUser);
  setFormUser({name:auth.currentUser?.displayName ?? ""});
  getAllProducts();
}
,[]);

const handleSetValues=(key:string, vlaue:string)=>{
  setFormUser({...formUser, [key]:vlaue})
}

const handleUpdateUser=async()=>{
  try{
    
  await updateProfile(userData!,
    {displayName: formUser.name}
  );}catch(e)
  {
    console.log(e)

  }

  setshowModalProfile(false);
}

const getAllProducts=()=>{
  
  const dbRef=ref(dbRealTime, "products/" + auth.currentUser?.uid );
  
  onValue(dbRef, (snapshot)=>{
    const data =snapshot.val();
    if(!data)return;
    const getKeys= Object.keys(data);
    const listPorduct:Product[]=[];

    getKeys.forEach((key)=>{
      const value={...data[key], id:key}
      listPorduct.push(value);
    });
    setproducts(listPorduct);
  })
}
const handleSignOut =async()=>{
  try{
  await auth.signOut();
  navigation.dispatch(CommonActions.reset(
    {
      index:0, 
      routes:[{name: "Login"}]
    }))}catch(e){
      console.log(e);
    }
}

  return (
    <>
    <View style={styles.rootHome}>
      <View style={styles.header}>
      <Avatar.Text size={50} label="IM"/>
      <View>
      <Text variant='bodySmall'>Bienvenid@</Text>
      <Text variant='labelLarge'>{userData?.displayName}</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
        icon="account-edit"
        size={30}
        mode="contained"
        onPress={()=>setshowModalProfile(true)}
        />
      </View>
      </View>
      <View>
      <FlatList
      data={products}
      renderItem={({item})=><ProductCardComponent product={item}/>}
      keyExtractor={item=>item.id}
      />
    </View>
    </View>
    
    <Portal>
      <Modal visible={showModalProfile}  contentContainerStyle={styles.modal}>
          <View style={styles.header}>
          <Text variant='headlineSmall'>Mi Perfil</Text>
          <View style={styles.icon}>
          <IconButton
          icon="close-circle-outline"
          size={30}
          mode="contained"
          onPress={()=>setshowModalProfile(false)}
          />
          </View>
          </View>
          <Divider/>
          
          <TextInput
          mode="outlined"
          label="Nombre"
          value={formUser.name}
          onChangeText={(value)=>handleSetValues("name",value)}
          />
          <TextInput
          mode="outlined"
          label="Correo"
          disabled
          value={userData?.email!}
          />
          <Button mode="contained" onPress={handleUpdateUser}>
            Actualizar
          </Button>
          <View style={styles.iconSingOut}>
          <IconButton
          icon="logout-variant"
          size={35}
          mode='contained'
          onPress={handleSignOut}
          />
          </View>
      </Modal>
    </Portal>
    <FAB 
    icon="plus"
    style={styles.fabProduct}
    onPress={()=>setShowModalProduct(true)}
    />
    <NewProductComponent showModalProduct={showModalProduct} setShowModalProduct={setShowModalProduct}/>

    </>
  )
}


