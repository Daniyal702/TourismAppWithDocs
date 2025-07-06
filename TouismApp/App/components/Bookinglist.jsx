import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const UserBookingsScreen = () => {
  const navigation = useNavigation();
  const [bookings, setBookings] = useState([]);
  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const snapshot = await firestore()
        .collection('bookings')
        .where('userId', '==', user.uid)
        .get();

      const userBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBookings(userBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Could not fetch your bookings.');
    }
  };

  const handlePayNow = (bookingId, totalCost) => {
    navigation.navigate('PaymentScreen', { bookingId, totalCost });
  };

  const handleReview = (bookingId) => {
    navigation.navigate('ReviewScreen', { bookingId });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.tripName}>{item.tripName}</Text>
      <Text style={styles.details}>Travelers: {item.numberOfTravelers}</Text>
      <Text style={styles.details}>Total: ${item.totalCost}</Text>
      <Text style={styles.details}>Start: {new Date(item.startDate).toDateString()}</Text>
      <Text style={styles.details}>End: {new Date(item.endDate).toDateString()}</Text>

      {item.paymentStatus ? (
        <TouchableOpacity style={styles.reviewButton} onPress={() => handleReview(item.id)}>
          <Text style={styles.buttonText}>Give Review</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={() => handlePayNow(item.id, item.totalCost)}>
          <Text style={styles.buttonText}>Pay Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No bookings found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  tripName: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  details: { fontSize: 16, color: '#555', marginBottom: 3 },
  payButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  reviewButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 50, color: '#6c757d' },
});

export default UserBookingsScreen;
