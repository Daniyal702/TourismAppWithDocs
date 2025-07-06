import { Button,Pressable,  ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Welcome = ({navigation}) => {
  return (
    <View>
        <ImageBackground source={require('./pakmont.jpg')} style={styles.Signup}>
            <View>
                <Text style={styles.text1}>Let's enjoy the</Text>
                <Text style={styles.text2}>Beautiful</Text>
                <Text style={styles.text2}>Trip</Text>
            </View>
            <View style={styles.btnsection}>
                <Pressable style={styles.signinbtn} title='Sign in'
                onPress={() =>
                    navigation.navigate('Login')
                  }
                 >
                    <Text style={styles.btnfont}>Sign In</Text>
                </Pressable>
                <Pressable style={styles.signupbtn} title='Sign in' 
                onPress={() =>
                    navigation.navigate('Signup')
                  }>
                    <Text style={styles.btnfont}>Create an Account</Text>
                </Pressable>
                {/* <Pressable style={styles.signupbtn} title='Sign in' 
                onPress={() =>
                    navigation.navigate('Home')
                  }>
                    <Text style={styles.btnfont}>See HomePAGE</Text>
                </Pressable> */}
            </View>
        </ImageBackground>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    Signup:{
        fontSize:12,
        color:"blue",
        height:870,
        width:500,
        padding:30,
        display:'flex',
        justifyContent:"space-between"
        
    },
    text1:{
        color:"darkslategrey",
        fontSize:40,
        fontFamily: 'Fuzzy Bubbles Regular',
        
    },
    text2:{
        color:"darkslategrey",
        fontSize:60,
        fontFamily: 'Protest Guerrilla Regular',
        lineHeight:70
    },
    btnsection:{
        height:150,
        display:'flex',
        justifyContent:'space-around',
        paddingLeft:35,
        paddingBottom:10,
    },
    btnfont:{
        fontSize:20,
        color:'white',
        fontWeight:'bold'
    },
    signinbtn:{
        padding:4,
        paddingLeft:103,
        width:280,
        height:40,
        backgroundColor:'white',
        fontSize:20,
        borderRadius:20,
        backgroundColor:"dimgray",
    },
    signupbtn:{
        padding:4,
        paddingLeft:55,
        width:280,
        height:40,
        backgroundColor:'white',
        fontSize:20,
        borderRadius:20,
        backgroundColor:"darkkhaki",
    }
})