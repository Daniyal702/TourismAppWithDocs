// import React, { useState, useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   Modal,
//   TouchableOpacity,
//   Alert,
//   StyleSheet,
// } from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore'; // Import Firestore

// const TripCreationScreen = ({ route }) => {
//   const { place } = route.params;

//   const [tripName, setTripName] = useState('');
//   const [numberOfTravelers, setNumberOfTravelers] = useState('');
//   const [showHotelModal, setShowHotelModal] = useState(false);
//   const [filteredHotels, setFilteredHotels] = useState([]); 
//   const selectedHotelsRef = useRef([]); 
//   const [totalCost, setTotalCost] = useState(0); 
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);

//   useEffect(() => {
//     if (place) {
//       setTripName(place.placeName);
//     }
//     fetchHotelsFromFirestore();
//   }, [place]);

//   const fetchHotelsFromFirestore = async () => {
//     try {
//       const hotelQuerySnapshot = await firestore()
//         .collection('hotels')
//         .where('Hotel Name', 'in', place.Hotels)
//         .get();

//       const hotelData = hotelQuerySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       setFilteredHotels(hotelData);
//     } catch (error) {
//       console.error('Error fetching hotels from Firestore:', error);
//       Alert.alert('Error', 'Could not fetch hotels at the moment.');
//     }
//   };

//   const handleSelectHotel = (hotel) => {
//     if (!selectedHotelsRef.current.some((selectedHotel) => selectedHotel.id === hotel.id)) {
//       selectedHotelsRef.current.push(hotel);
//       calculateTotalPrice();
//     }
//     setShowHotelModal(false);
//   };

//   const handleRemoveHotel = (hotelId) => {
//     selectedHotelsRef.current = selectedHotelsRef.current.filter((hotel) => hotel.id !== hotelId);
//     calculateTotalPrice();
//   };

//   const calculateTotalPrice = () => {
//     const total = selectedHotelsRef.current.reduce(
//       (acc, hotel) => acc + (parseFloat(hotel.price) || 0) * numberOfTravelers,
//       0
//     );
//     setTotalCost(total);
//   };

//   // const handleSaveBooking = () => {
//   //   Alert.alert('Booking Saved', 'Your trip has been successfully saved!');
//   // };
//   const handleSaveBooking = async (payNow) => {
//     if (endDate <= startDate) {
//       Alert.alert('Error', 'End date must be after start date.');
//       return;
//     }
  
    
//     const userId = auth().currentUser.uid;
//     console.log(userId)
//     if (!userId) {
//       Alert.alert('Error', 'You need to be logged in to book a trip.');
//       return;
//     }
//     try {
//       const bookingRef = await firestore().collection('bookings').add({
//         userId: userId,
//         tripName,
//         numberOfTravelers,
//         selectedHotels: selectedHotelsRef.current,
//         totalCost,
//         startDate: startDate.toISOString(),
//         endDate: endDate.toISOString(),
//         paymentStatus: payNow, // true if paying now, false if paying later
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
  
//       const bookingId = bookingRef.id;
  
//       if (payNow) {
//         // Redirect to payment screen
//         navigation.navigate('PaymentScreen', { bookingId, totalCost });
//       } else {
//         Alert.alert('Booking Saved', 'You can pay later from your bookings.');
//         navigation.goBack(); // Navigate back to the previous screen
//       }
  
//     } catch (error) {
//       console.error('Error saving booking:', error);
//       Alert.alert('Error', 'Could not save the booking.');
//     }
//   };
  
//   const onStartDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || startDate;
//     setShowStartDatePicker(false);
//     setStartDate(currentDate);
//   };

//   const onEndDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || endDate;
//     setShowEndDatePicker(false);
//     setEndDate(currentDate);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Create Your Trip</Text>
//       <TextInput
//         placeholder="Trip Name"
//         style={styles.input}
//         value={tripName}
//         onChangeText={setTripName}
//       />
//       <TextInput
//         placeholder="Number of Travelers"
//         style={styles.input}
//         keyboardType="numeric"
//         value={numberOfTravelers.toString()}
//         onChangeText={(text) => setNumberOfTravelers((text ))}
//       />

//       <Text style={styles.label}>Start Date</Text>
//       <TouchableOpacity
//         style={styles.dateButton}
//         onPress={() => setShowStartDatePicker(true)}
//       >
//         <Text style={styles.dateText}>{startDate.toDateString()}</Text>
//       </TouchableOpacity>

//       {showStartDatePicker && (
//         <DateTimePicker
//           value={startDate}
//           mode="date"
//           display="calendar"
//           onChange={onStartDateChange}
//         />
//       )}

//       <Text style={styles.label}>End Date</Text>
//       <TouchableOpacity
//         style={styles.dateButton}
//         onPress={() => setShowEndDatePicker(true)}
//       >
//         <Text style={styles.dateText}>{endDate.toDateString()}</Text>
//       </TouchableOpacity>

//       {showEndDatePicker && (
//         <DateTimePicker
//           value={endDate}
//           mode="date"
//           display="calendar"
//           onChange={onEndDateChange}
//         />
//       )}

//       <Button
//         title="Add Hotel"
//         onPress={() => setShowHotelModal(true)}
//         color="#007bff"
//       />

//       <FlatList
//         data={selectedHotelsRef.current}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>{item['Hotel Name']}</Text>
//             <Text style={styles.cardText}>Price: ${item.price}</Text>
//             <Text style={styles.cardText}>Rating: {item.Rating} ⭐</Text>
//             <Text style={styles.cardText}>Location: {item.district}</Text>
//             <TouchableOpacity
//               style={styles.removeButton}
//               onPress={() => handleRemoveHotel(item.id)}
//             >
//               <Text style={styles.removeButtonText}>Remove</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       <Text style={styles.totalCost}>Total Price: ${totalCost}</Text>
//       {/* <Button title="Save Booking" onPress={handleSaveBooking} color="#28a745" /> */}
//       <View style={{ marginTop: 20 }}>
//       <Button title="Pay Now" onPress={() => handleSaveBooking(true)} color="#007bff" />
//       <View style={{ height: 10 }} />
//       <Button title="Pay Later" onPress={() => handleSaveBooking(false)} color="#28a745" />
//       </View>
//       <Modal visible={showHotelModal} animationType="slide" transparent>
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalHeader}>Select a Hotel</Text>
//             <FlatList
//               data={filteredHotels}
//               keyExtractor={(item) => item.id.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.hotelOption}
//                   onPress={() => handleSelectHotel(item)}
//                 >
//                   <Text style={styles.hotelName}>
//                     {item['Hotel Name']} - ${item.price}
//                   </Text>
//                   <Text style={styles.hotelDetails}>
//                     Rating: {item.Rating} ⭐ | Location: {item.district}
//                   </Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setShowHotelModal(false)}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f1f1f1',
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 20,
//     backgroundColor: '#fff',
//     fontSize: 16,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   dateButton: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 10,
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   dateText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   card: {
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   cardText: {
//     fontSize: 14,
//     marginBottom: 5,
//     color: '#555',
//   },
//   totalCost: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     margin: 20,
//     padding: 20,
//     borderRadius: 10,
//   },
//   modalHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#007bff',
//   },
//   hotelOption: {
//     padding: 15,
//     backgroundColor: '#f7f7f7',
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   hotelName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   hotelDetails: {
//     fontSize: 14,
//     color: '#777',
//   },
//   cancelButton: {
//     padding: 10,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 10,
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     color: '#007bff',
//   },
//   removeButton: {
//     padding: 8,
//     backgroundColor: '#dc3545',
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default TripCreationScreen;

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import auth from '@react-native-firebase/auth'; 
import firestore from '@react-native-firebase/firestore'; // Import Firestore

const TripCreationScreen = ({ route ,navigation}) => {
  const { place } = route.params;

  const [tripName, setTripName] = useState('');
  const placeName = place._key;
  const [numberOfTravelers, setNumberOfTravelers] = useState('');
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]); 
  const selectedHotelsRef = useRef([]); 
  const [totalCost, setTotalCost] = useState(0); 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    if (place) {
      setTripName(place.placeName);
    }
    fetchHotelsFromFirestore();
  }, [place]);

  const fetchHotelsFromFirestore = async () => {
    try {
      const hotelQuerySnapshot = await firestore()
        .collection('hotels')
        .where('Hotel Name', 'in', place.Hotels)
        .get();

      const hotelData = hotelQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setFilteredHotels(hotelData);
    } catch (error) {
      console.error('Error fetching hotels from Firestore:', error);
      Alert.alert('Error', 'Could not fetch hotels at the moment.');
    }
  };

  const handleSelectHotel = (hotel) => {
    if (!selectedHotelsRef.current.some((selectedHotel) => selectedHotel._id === hotel._id)) {
      selectedHotelsRef.current.push(hotel);
      console.log(hotel._id)
      calculateTotalPrice();
    }
    setShowHotelModal(false);
  };

  const handleRemoveHotel = (hotelId) => {
    console.log(hotelId)
    selectedHotelsRef.current = selectedHotelsRef.current.filter((hotel) => hotel.id !== hotelId);
    console.log(selectedHotelsRef.current)
    calculateTotalPrice();
  };

  const calculateTotalPrice = () => {
    const total = selectedHotelsRef.current.reduce(
      (acc, hotel) => acc + (parseFloat(hotel.price) || 0) * numberOfTravelers,1
      
    );
    setTotalCost(total || 0);
  };

  // const handleSaveBooking = () => {
  //   Alert.alert('Booking Saved', 'Your trip has been successfully saved!');
  // };
  const handleSaveBooking = async () => {
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Please select a valid start and end date.');
      return;
    }
    if (endDate <= startDate) {
      Alert.alert('Error', 'End date must be after start date.');
      return;
    }

    const user = auth().currentUser;
    if (!user) {
      Alert.alert('Error', 'You need to be logged in to book a trip.');
      return;
    }

    try {
      const bookingRef = await firestore().collection('bookings').add({
        userId: user.uid,
        placeName : placeName,
        tripName: tripName || "Unnamed Trip", // Prevent empty trip name
        numberOfTravelers: numberOfTravelers || 1, // Default to 1
        selectedHotels: selectedHotelsRef.current.length > 0 ? selectedHotelsRef.current : [], // Ensure it's an array
        totalCost: totalCost || 0, // Default to 0
        startDate: startDate ? startDate.toISOString() : null, // Avoid undefined
        endDate: endDate ? endDate.toISOString() : null, // Avoid undefined
        paymentStatus: false, 
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      
      

      const bookingId = bookingRef.id;

      // Navigate to PaymentScreen
      navigation.navigate('PaymentScreen', { bookingId, totalCost });

    } catch (error) {
      console.error('Error saving booking:', error);
      Alert.alert('Error', 'Could not save the booking.');
    }};

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Your Trip</Text>
      <TextInput
        placeholder="Trip Name"
        style={styles.input}
        value={tripName}
        onChangeText={setTripName}
      />
      <TextInput
        placeholder="Number of Travelers"
        style={styles.input}
        keyboardType="numeric"
        value={numberOfTravelers.toString()}
        onChangeText={(text) => setNumberOfTravelers(text )}
      />

      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowStartDatePicker(true)}
      >
        <Text style={styles.dateText}>{startDate.toDateString()}</Text>
      </TouchableOpacity>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="calendar"
          onChange={onStartDateChange}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity
        style={styles.dateButton}
        onPress={() => setShowEndDatePicker(true)}
      >
        <Text style={styles.dateText}>{endDate.toDateString()}</Text>
      </TouchableOpacity>

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="calendar"
          onChange={onEndDateChange}
        />
      )}

      <Button
        title="Add Hotel"
        onPress={() => setShowHotelModal(true)}
        color="green"
      />

      <FlatList
        data={selectedHotelsRef.current}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item['Hotel Name']}</Text>
            <Text style={styles.cardText}>Price: {item.price * 50}</Text>
            <Text style={styles.cardText}>Rating: {item.Rating} ⭐</Text>
            <Text style={styles.cardText}>Location: {item.district}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveHotel(item.id)}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.totalCost}>Total Price: Rs{totalCost * 50}</Text>
      <Button title="Save Booking" onPress={handleSaveBooking} color="green" />

      <Modal visible={showHotelModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select a Hotel</Text>
            <FlatList
              data={filteredHotels}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.hotelOption}
                  onPress={() => handleSelectHotel(item)}
                >
                  <Text style={styles.hotelName}>
                    {item['Hotel Name']} - Rs{item.price * 50}
                  </Text>
                  <Text style={styles.hotelDetails}>
                    Rating: {item.Rating} ⭐ | Location: {item.district}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowHotelModal(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f1f1',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: 'dimgrey',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  dateText: {
    color: '#fff',
    fontSize: 16,
  },
  card: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  totalCost: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007bff',
  },
  hotelOption: {
    padding: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 10,
  },
  hotelName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hotelDetails: {
    fontSize: 14,
    color: '#777',
  },
  cancelButton: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TripCreationScreen;