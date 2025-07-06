

// // import React, { useState } from 'react';
// // import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
// // import Icon from 'react-native-vector-icons/Ionicons';

// // export default function LoginScreen({ navigation }) {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
// //   const [errorMessage, setErrorMessage] = useState('');

// //   const handleLogin = () => {
// //     if (!email || !password) {
// //       setErrorMessage('Both email and password are required');
// //       return;
// //     }
// //     // Handle login logic
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}

// //       <Text style={styles.title}>Welcome Back!</Text>

// //       <TextInput
// //         style={styles.input}
// //         value={email}
// //         onChangeText={setEmail}
// //         placeholder="Enter Email"
// //         placeholderTextColor="#999"
// //         keyboardType="email-address"
// //       />

// //       <View style={styles.passwordContainer}>
// //         <TextInput
// //           style={styles.inputPassword}
// //           value={password}
// //           onChangeText={setPassword}
// //           placeholder="Enter Password"
// //           placeholderTextColor="#999"
// //           secureTextEntry={!showPassword} // Toggle between show/hide password
// //         />
// //         <TouchableOpacity
// //           style={styles.toggleButton}
// //           onPress={() => setShowPassword(!showPassword)}
// //         >
// //           <Icon
// //             name={showPassword ? 'eye-off' : 'eye'}
// //             size={24}
// //             color="#999"
// //           />
// //         </TouchableOpacity>
// //       </View>

// //       {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

// //       <TouchableOpacity style={styles.button} onPress={handleLogin}>
// //         <Text style={styles.buttonText}>Login</Text>
// //       </TouchableOpacity>

// //       <Text style={styles.switchText}>
// //         Don’t have an account?{' '}
// //         <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
// //           Sign Up
// //         </Text>
// //       </Text>
// //     </ScrollView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flexGrow: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //     backgroundColor: '#f0f4f8',
// //   },
// //   logo: {
// //     width: 100,
// //     height: 100,
// //     marginBottom: 20,
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //     color: '#333',
// //   },
// //   input: {
// //     width: '100%',
// //     height: 50,
// //     borderColor: '#ddd',
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     paddingHorizontal: 15,
// //     marginBottom: 15,
// //     backgroundColor: '#fff',
// //     fontSize: 16,
// //   },
// //   passwordContainer: {
// //     width: '100%',
// //     flexDirection: 'row',
// //     borderColor: '#ddd',
// //     borderWidth: 1,
// //     borderRadius: 8,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     marginBottom: 15,
// //   },
// //   inputPassword: {
// //     flex: 1,
// //     height: 50,
// //     paddingHorizontal: 15,
// //     fontSize: 16,
// //   },
// //   toggleButton: {
// //     padding: 10,
// //   },
// //   button: {
// //     width: '100%',
// //     height: 50,
// //     backgroundColor: '#4A90E2',
// //     borderRadius: 8,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginBottom: 20,
// //   },
// //   buttonText: {
// //     fontSize: 18,
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// //   switchText: {
// //     fontSize: 16,
// //     color: '#666',
// //   },
// //   linkText: {
// //     color: '#4A90E2',
// //     fontWeight: 'bold',
// //   },
// //   error: {
// //     color: 'red',
// //     marginBottom: 10,
// //   },
// // });

// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import auth from '@react-native-firebase/auth';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = async () => {
//     if (!email || !password) {
//       setErrorMessage('Both email and password are required');
//       return;
//     }

//     try {
//       // Firebase Authentication for Sign-In
//       await auth().signInWithEmailAndPassword(email, password);

//       // Navigate to Home Screen or Main App
//       Alert.alert('Success', 'Logged in successfully');
//       navigation.navigate('Home'); // Change 'Home' to your home screen name
//     } catch (error) {
//       // Handle errors
//       console.log('Error Code:', error.code);
//       console.log('Error Message:', error.message);

//       if (error.code === 'auth/invalid-email') {
//         setErrorMessage('Invalid email format.');
//       } else if (error.code === 'auth/user-not-found') {
//         setErrorMessage('No account found for this email.');
//       } else if (error.code === 'auth/wrong-password') {
//         setErrorMessage('Incorrect password.');
//       } else {
//         setErrorMessage('An error occurred. Please try again.');
//       }
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Welcome Back!</Text>

//       <TextInput
//         style={styles.input}
//         value={email}
//         onChangeText={setEmail}
//         placeholder="Enter Email"
//         placeholderTextColor="#999"
//         keyboardType="email-address"
//       />

//       <View style={styles.passwordContainer}>
//         <TextInput
//           style={styles.inputPassword}
//           value={password}
//           onChangeText={setPassword}
//           placeholder="Enter Password"
//           placeholderTextColor="#999"
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity
//           style={styles.toggleButton}
//           onPress={() => setShowPassword(!showPassword)}
//         >
//           <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#999" />
//         </TouchableOpacity>
//       </View>

//       {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
//       <Text style={styles.linkText} onPress={() => navigation.navigate('ForgetPassword')}>
//           Forget Password
//         </Text>
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <Text style={styles.switchText}>
//         Don’t have an account?{' '}
//         <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
//           Sign Up
//         </Text>
//       </Text>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f0f4f8',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   passwordContainer: {
//     width: '100%',
//     flexDirection: 'row',
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   inputPassword: {
//     flex: 1,
//     height: 50,
//     paddingHorizontal: 15,
//     fontSize: 16,
//   },
//   toggleButton: {
//     padding: 10,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: '#4A90E2',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   switchText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   linkText: {
//     color: '#4A90E2',
//     fontWeight: 'bold',
//   },
//   error: {
//     color: 'red',
//     marginBottom: 10,
//   },
// });

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { firestore } from '../config/firestoreConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Both email and password are required');
      return;
    }
  
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
  
      // Check if the email is verified
      if (!user.emailVerified) {
        setErrorMessage('Please verify your email before logging in.');
        return;
      }
  
      // Check if the user's data exists in Firestore
      const userDoc = await firestore().collection('users').doc(user.uid).get();
  
      if (!userDoc.exists) {
        // If no data exists, redirect to the profile completion form
        navigation.navigate('ProfileCompletion', { uid: user.uid });
      } else {
        // User exists, navigate to home
        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Error:', error.message);
      setErrorMessage('An error occurred. Please try again.');
    }
  };
  
  const handleResendVerification = async () => {
    try {
      await auth().currentUser.sendEmailVerification();
      Alert.alert('Verification Sent', 'A new verification email has been sent. Please check your inbox.');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend the verification email. Please try again later.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>

      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          placeholderTextColor="#999"
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon name={showPassword ? 'eye-off' : 'eye'} size={24} color="#999" />
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.switchText}>
        Don’t have an account?{' '}
        <Text style={styles.linkText} onPress={() => navigation.navigate('Signup')}>
          Sign Up
        </Text>
      </Text>

      <TouchableOpacity onPress={handleResendVerification}>
        <Text style={styles.linkText}>Resend Verification Email</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  toggleButton: {
    padding: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  linkText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

