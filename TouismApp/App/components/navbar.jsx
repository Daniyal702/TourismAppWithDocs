import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'

const Navbar = ({navigation}) => {
  return (
    <View style={styles.nav}>
      {/* <Text>navbar</Text> */}
      <Pressable 
      onPress={() =>
        navigation.navigate('Home')
      } style={styles.btn}> 
        <Icon name = 'home' style={styles.icon} size={30}></Icon>
      </Pressable>
      <Pressable 
      onPress={() =>
        navigation.navigate('Fav')
      }style={styles.btn}> 
        <Icon name = 'heart' style={styles.icon} size={30}></Icon>
      </Pressable>
      <Pressable 
      onPress={() =>
        navigation.navigate('AllPlacesPage')
      }style={styles.btn}> 
        <Icon name = 'search'  size={42} color="darkslategrey"></Icon>
      </Pressable> 
      <Pressable
      onPress={() =>
        navigation.navigate('Chatbot')}
      style={styles.btn}>
        <Icon name="chatbubbles" style={styles.icon} size={30}></Icon>
      </Pressable>
      <Pressable 
      onPress={() =>
        navigation.navigate('Profile')
      }style={styles.btn}> 
        <Icon name = 'person' style={styles.icon} size={30} ></Icon>
      </Pressable>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  nav:{
    backgroundColor:"black",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    height:70,
    borderRadius:15,
    marginVertical:5,
    marginHorizontal:7,
  },
  icon:{
    color:"white",
  },
  btn:{
    width:80,
    height:40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    
  }
})