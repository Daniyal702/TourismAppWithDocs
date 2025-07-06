// import React from 'react';
// import { View, Text, Button, Alert, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import { useNavigation } from '@react-navigation/native';

// const PaymentScreen = ({ route , navigation}) => {
  
//   const { bookingId, totalCost } = route.params;

//   const handlePayment = async (paid,) => {
//     try {
//       await firestore().collection('bookings').doc(bookingId).update({
//         paymentStatus: paid,
//       });

//       Alert.alert('Success', paid ? 'Payment completed!' : 'Payment postponed.');
//       navigation.navigate('Home'); // Redirect to Home
//     } catch (error) {
//       console.error('Payment update failed:', error);
//       Alert.alert('Error', 'Could not update payment status.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Payment</Text>
//       <Text style={styles.amount}>Total Amount: ${totalCost}</Text>
      
//       <Button title="Pay Now" onPress={() => handlePayment(true)} color="#007bff" />
//       <Button title="Pay Later" onPress={() => handlePayment(false)} color="#6c757d" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({ /* styles here */ });

// export default PaymentScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { bookingId, totalCost } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handlePayment = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method.');
      return;
    }

    try {
      await firestore().collection('bookings').doc(bookingId).update({
        paymentStatus: true,
        paymentMethod: selectedMethod,
      });

      Alert.alert('Success', 'Payment completed via ' + selectedMethod + '!');
      navigation.navigate('Home'); // Redirect to Home
    } catch (error) {
      console.error('Payment update failed:', error);
      Alert.alert('Error', 'Could not update payment status.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      <Text style={styles.amount}>Total Amount: ${totalCost}</Text>

      <Text style={styles.label}>Select Payment Method:</Text>

      <TouchableOpacity 
        style={[styles.paymentOption, selectedMethod === 'Credit Card' && styles.selected]}
        onPress={() => setSelectedMethod('Credit Card')}
      >
        <Text style={styles.paymentText}>💳 Credit Card</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.paymentOption, selectedMethod === 'PayPal' && styles.selected]}
        onPress={() => setSelectedMethod('PayPal')}
      >
        <Text style={styles.paymentText}>🅿️ PayPal</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.paymentOption, selectedMethod === 'Easy Paisa' && styles.selected]}
        onPress={() => setSelectedMethod('Easy Paisa')}
      >
        <Text style={styles.paymentText}>📱 Easy Paisa</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.payButton, selectedMethod ? styles.activeButton : styles.disabledButton]}
        onPress={handlePayment}
        disabled={!selectedMethod}
      >
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.laterButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Pay Later</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa', alignItems: 'center' },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  amount: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#28a745' },
  label: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  
  paymentOption: { 
    width: '90%', 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 10, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc' 
  },
  selected: { borderColor: '#007bff', backgroundColor: '#e0f0ff' },
  paymentText: { fontSize: 18, fontWeight: 'bold' },

  payButton: { 
    width: '90%', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 20 
  },
  activeButton: { backgroundColor: '#007bff' },
  disabledButton: { backgroundColor: '#cccccc' },

  laterButton: { 
    width: '90%', 
    padding: 15, 
    backgroundColor: '#6c757d', 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default PaymentScreen;
