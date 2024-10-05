import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../config/firebaseConfig'

interface UserAuth{
  name: string,
}

export const HomeScreen = () => {

  const [userAuth, setUserAuth] = useState<UserAuth>({
    name: ''
  });
useEffect(()=>{
  onAuthStateChanged(auth, (user)=>{
    if(user){
      setUserAuth({name:user.displayName ?? "NA"})

    }
  })
}
,[]);


  return (
    <View style={styles.rootHome}>
      <View>
      <Avatar.Text size={50} label="IM"/>
      <Text variant='bodySmall'>Bienvenid@</Text>
      <Text variant='labelLarge'>{userAuth.name}</Text>
      </View>

    </View>
  )
}


