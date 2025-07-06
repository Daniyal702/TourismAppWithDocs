// // import React, { useState } from 'react';
// // import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert } from 'react-native';
// // import firestore from '@react-native-firebase/firestore';

// // export default function ProfileCompletionScreen({ route, navigation }) {
// //   const { uid } = route.params;

// //   // States for user data
// //   const [name, setName] = useState('');
// //   const [age, setAge] = useState('');
// //   const [nationality, setNationality] = useState('');
// //   const [dob, setDob] = useState('');
// //   const [gender, setGender] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [location, setLocation] = useState({ latitude: '', longitude: '' });
// //   const [selectedPlaces, setSelectedPlaces] = useState([]);
// //   const [customPlace, setCustomPlace] = useState('');
// //   const [selectedInterests, setSelectedInterests] = useState([]);
// //   const [customInterest, setCustomInterest] = useState('');

// //   // Predefined options
// //   const predefinedPlaces = [
// //     "Ansoo Lake",
// //     "Astola Island",
// //     "Attabad Lake",
// //     "Badshahi Mosque",
// //     "Baltoro Glacier",
// //     "Bhurban",
// //     "Bruti Waterfall Islamabad",
// //     "Concordia",
// //     "Deosai National Park",
// //     "Derawar Fort",
// //     "Dhanni Waterfall",
// //     "Emperor's Mosque",
// //     "Fairy Meadows",
// //     "Faisal Mosque",
// //     "Farphu Waterfall",
// //     "Gawadar",
// //     "Gojal Valley",
// //     "Gorakh Hill",
// //     "Gulpur Mahuli Waterfalls",
// //     "Hingol National Park",
// //     "Hunza Valley",
// //     "Indus Kohistan",
// //     "Jahaz Banda Kumrat Valley",
// //     "Kalam Valley",
// //     "Kalash",
// //     "Kanhatti Gardens",
// //     "Karambar Lake",
// //     "Katasraj Temple",
// //     "Khewra Salt Mine",
// //     "Kiwai Kaghan",
// //     "Lahore Fort",
// //     "Lake Saif-ul-Malook",
// //     "Lasbela Beach",
// //     "Mahodand Waterfall",
// //     "Malam Jabba",
// //     "Manthoka Waterfall",
// //     "Masjid Wazir Khan",
// //     "Matiltan",
// //     "Minar-e-Pakistan",
// //     "Mohatta Palace",
// //     "Mohenjo-daro",
// //     "Moola Chotok",
// //     "Naltar Lake",
// //     "Narh Waterfall",
// //     "Neela Sandh Waterfall",
// //     "Neelam Valley",
// //     "Noori de Than Waterfall",
// //     "Pakistan Air Force Museum",
// //     "Pakistan Monument",
// //     "Panjpeer Rocks",
// //     "Pattan",
// //     "Pir Sohawa",
// //     "Rama Lake",
// //     "Ratti Galli Waterfall",
// //     "Rawalakot",
// //     "Rohtas Fort",
// //     "Rush Lake",
// //     "Sajjikot Waterfall",
// //     "Satpara Lake",
// //     "Shalamar Bagh",
// //     "Shangrila Resort",
// //     "Shumber Waterfalls",
// //     "Skardu",
// //     "Sonmiani Beach",
// //     "Taxila Museum",
// //     "Thal Desert",
// //     "The Lahore Museum",
// //     "Umbrella Waterfall",
// //     "West Bay Beach"
// //   ];
// //   const predefinedInterests = [
// //       "Lake",
// //       "Nature",
// //       "City Attractions",
// //       "Mountainous",
// //       "Hill Station",
// //       "Waterfall",
// //       "National Park",
// //       "Fort",
// //       "Coastal",
// //       "Valley",
// //       "Temple",
// //       "Mine",
// //       "Monument",
// //       "Museum",
// //       "Resort",
// //       "Desert",];

// //   const handleSave = async () => {
// //     if (!name || !age || !nationality || !dob || !gender || !email || !phone) {
// //       Alert.alert('Error', 'All fields except "Places" and "Interests" are required.');
// //       return;
// //     }

// //     try {
// //       await firestore().collection('users').doc(uid).set({
// //         uid,
// //         name,
// //         age,
// //         nationality,
// //         dob,
// //         gender,
// //         email,
// //         phone,
// //         currentLocation: location,
// //         places: [...selectedPlaces, ...(customPlace ? [customPlace] : [])], // Combine predefined and custom
// //         interests: [...selectedInterests, ...(customInterest ? [customInterest] : [])], // Combine predefined and custom
// //       });

// //       Alert.alert('Success', 'Profile completed successfully!');
// //       navigation.navigate('Home');
// //     } catch (error) {
// //       console.log('Error saving user data:', error.message);
// //       Alert.alert('Error', 'Failed to save profile. Please try again.');
// //     }
// //   };

// //   const togglePlaceSelection = (place) => {
// //     if (selectedPlaces.includes(place)) {
// //       setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
// //     } else {
// //       setSelectedPlaces([...selectedPlaces, place]);
// //     }
// //   };

// //   const toggleInterestSelection = (interest) => {
// //     if (selectedInterests.includes(interest)) {
// //       setSelectedInterests(selectedInterests.filter((i) => i !== interest));
// //     } else {
// //       setSelectedInterests([...selectedInterests, interest]);
// //     }
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.title}>Complete Your Profile</Text>

// //       <TextInput
// //         style={styles.input}
// //         value={name}
// //         onChangeText={setName}
// //         placeholder="Name"
// //         placeholderTextColor="#999"
// //       />
// //       <TextInput
// //         style={styles.input}
// //         value={age}
// //         onChangeText={setAge}
// //         placeholder="Age"
// //         placeholderTextColor="#999"
// //         keyboardType="numeric"
// //       />
// //       <TextInput
// //         style={styles.input}
// //         value={nationality}
// //         onChangeText={setNationality}
// //         placeholder="Nationality"
// //         placeholderTextColor="#999"
// //       />
// //       <TextInput
// //         style={styles.input}
// //         value={dob}
// //         onChangeText={setDob}
// //         placeholder="Date of Birth (DD/MM/YYYY)"
// //         placeholderTextColor="#999"
// //       />
// //       <TextInput
// //         style={styles.input}
// //         value={gender}
// //         onChangeText={setGender}
// //         placeholder="Gender"
// //         placeholderTextColor="#999"
// //       />
// //       {/* <TextInput
// //         style={styles.input}
// //         value={email}
// //         onChangeText={setEmail}
// //         placeholder="Email"
// //         placeholderTextColor="#999"
// //         keyboardType="email-address"
// //       /> */}
// //       <TextInput
// //         style={styles.input}
// //         value={phone}
// //         onChangeText={setPhone}
// //         placeholder="Phone Number"
// //         placeholderTextColor="#999"
// //         keyboardType="phone-pad"
// //       />

// //       {/* Predefined Places Selection */}
// //       <Text style={styles.sectionTitle}>Choose Previous Visited Places  (Optional):</Text>
// //       <View style={styles.optionsContainer}>
// //         {predefinedPlaces.map((place) => (
// //           <TouchableOpacity
// //             key={place}
// //             style={[
// //               styles.optionButton,
// //               selectedPlaces.includes(place) && styles.selectedOptionButton,
// //             ]}
// //             onPress={() => togglePlaceSelection(place)}
// //           >
// //             <Text
// //               style={[
// //                 styles.optionButtonText,
// //                 selectedPlaces.includes(place) && styles.selectedOptionButtonText,
// //               ]}
// //             >
// //               {place}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>

// //       {/* Custom Place */}
// //       <TextInput
// //         style={styles.input}
// //         value={customPlace}
// //         onChangeText={setCustomPlace}
// //         placeholder="Add Custom Place (Optional)"
// //         placeholderTextColor="#999"
// //       />

// //       {/* Predefined Interests Selection */}
// //       <Text style={styles.sectionTitle}>Choose Interests (Optional):</Text>
// //       <View style={styles.optionsContainer}>
// //         {predefinedInterests.map((interest) => (
// //           <TouchableOpacity
// //             key={interest}
// //             style={[
// //               styles.optionButton,
// //               selectedInterests.includes(interest) && styles.selectedOptionButton,
// //             ]}
// //             onPress={() => toggleInterestSelection(interest)}
// //           >
// //             <Text
// //               style={[
// //                 styles.optionButtonText,
// //                 selectedInterests.includes(interest) && styles.selectedOptionButtonText,
// //               ]}
// //             >
// //               {interest}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>

      

// //       <TouchableOpacity style={styles.button} onPress={handleSave}>
// //         <Text style={styles.buttonText}>Save Profile</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // }

// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert, Picker } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// export default function ProfileCompletionScreen({ route, navigation }) {
//   const { uid } = route.params;

//   // States for user data
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [nationality, setNationality] = useState('');
//   const [dob, setDob] = useState('');
//   const [gender, setGender] = useState(''); // Gender dropdown state
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [location, setLocation] = useState({ latitude: '', longitude: '' });
//   const [selectedPlaces, setSelectedPlaces] = useState([]);
//   const [customPlace, setCustomPlace] = useState('');
//   const [selectedInterests, setSelectedInterests] = useState([]);
//   const [customInterest, setCustomInterest] = useState('');

//   // Predefined options
//   const predefinedPlaces = [
//     "Ansoo Lake",
//     "Astola Island",
//     "Attabad Lake",
//     "Badshahi Mosque",
//     "Baltoro Glacier",
//     "Bhurban",
//     "Bruti Waterfall Islamabad",
//     "Concordia",
//     "Deosai National Park",
//     "Derawar Fort",
//     "Dhanni Waterfall",
//     "Emperor's Mosque",
//     "Fairy Meadows",
//     "Faisal Mosque",
//     "Farphu Waterfall",
//     "Gawadar",
//     "Gojal Valley",
//     "Gorakh Hill",
//     "Gulpur Mahuli Waterfalls",
//     "Hingol National Park",
//     "Hunza Valley",
//     "Indus Kohistan",
//     "Jahaz Banda Kumrat Valley",
//     "Kalam Valley",
//     "Kalash",
//     "Kanhatti Gardens",
//     "Karambar Lake",
//     "Katasraj Temple",
//     "Khewra Salt Mine",
//     "Kiwai Kaghan",
//     "Lahore Fort",
//     "Lake Saif-ul-Malook",
//     "Lasbela Beach",
//     "Mahodand Waterfall",
//     "Malam Jabba",
//     "Manthoka Waterfall",
//     "Masjid Wazir Khan",
//     "Matiltan",
//     "Minar-e-Pakistan",
//     "Mohatta Palace",
//     "Mohenjo-daro",
//     "Moola Chotok",
//     "Naltar Lake",
//     "Narh Waterfall",
//     "Neela Sandh Waterfall",
//     "Neelam Valley",
//     "Noori de Than Waterfall",
//     "Pakistan Air Force Museum",
//     "Pakistan Monument",
//     "Panjpeer Rocks",
//     "Pattan",
//     "Pir Sohawa",
//     "Rama Lake",
//     "Ratti Galli Waterfall",
//     "Rawalakot",
//     "Rohtas Fort",
//     "Rush Lake",
//     "Sajjikot Waterfall",
//     "Satpara Lake",
//     "Shalamar Bagh",
//     "Shangrila Resort",
//     "Shumber Waterfalls",
//     "Skardu",
//     "Sonmiani Beach",
//     "Taxila Museum",
//     "Thal Desert",
//     "The Lahore Museum",
//     "Umbrella Waterfall",
//     "West Bay Beach"
//   ];
//   const predefinedInterests = [
//     "Lake",
//     "Nature",
//     "City Attractions",
//     "Mountainous",
//     "Hill Station",
//     "Waterfall",
//     "National Park",
//     "Fort",
//     "Coastal",
//     "Valley",
//     "Temple",
//     "Mine",
//     "Monument",
//     "Museum",
//     "Resort",
//     "Desert",
//   ];

//   const handleSave = async () => {
//     if (!name || !age || !nationality || !dob || !gender || !email || !phone) {
//       Alert.alert('Error', 'All fields except "Places" and "Interests" are required.');
//       return;
//     }

//     try {
//       await firestore().collection('users').doc(uid).set({
//         uid,
//         name,
//         age,
//         nationality,
//         dob,
//         gender,
//         email,
//         phone,
//         currentLocation: location,
//         places: [...selectedPlaces, ...(customPlace ? [customPlace] : [])], // Combine predefined and custom
//         interests: [...selectedInterests, ...(customInterest ? [customInterest] : [])], // Combine predefined and custom
//       });

//       Alert.alert('Success', 'Profile completed successfully!');
//       navigation.navigate('Home');
//     } catch (error) {
//       console.log('Error saving user data:', error.message);
//       Alert.alert('Error', 'Failed to save profile. Please try again.');
//     }
//   };

//   const togglePlaceSelection = (place) => {
//     if (selectedPlaces.includes(place)) {
//       setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
//     } else {
//       setSelectedPlaces([...selectedPlaces, place]);
//     }
//   };

//   const toggleInterestSelection = (interest) => {
//     if (selectedInterests.includes(interest)) {
//       setSelectedInterests(selectedInterests.filter((i) => i !== interest));
//     } else {
//       setSelectedInterests([...selectedInterests, interest]);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Complete Your Profile</Text>

//       <TextInput
//         style={styles.input}
//         value={name}
//         onChangeText={setName}
//         placeholder="Name"
//         placeholderTextColor="#999"
//       />
//       <TextInput
//         style={styles.input}
//         value={age}
//         onChangeText={setAge}
//         placeholder="Age"
//         placeholderTextColor="#999"
//         keyboardType="numeric"
//       />
//       <TextInput
//         style={styles.input}
//         value={nationality}
//         onChangeText={setNationality}
//         placeholder="Nationality"
//         placeholderTextColor="#999"
//       />
//       <TextInput
//         style={styles.input}
//         value={dob}
//         onChangeText={setDob}
//         placeholder="Date of Birth (DD/MM/YYYY)"
//         placeholderTextColor="#999"
//       />
//       {/* Gender Picker */}
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={gender}
//           onValueChange={(itemValue) => setGender(itemValue)}
//         >
//           <Picker.Item label="Select Gender" value="" />
//           <Picker.Item label="Male" value="male" />
//           <Picker.Item label="Female" value="female" />
//         </Picker>
//       </View>
//       <TextInput
//         style={styles.input}
//         value={phone}
//         onChangeText={setPhone}
//         placeholder="Phone Number"
//         placeholderTextColor="#999"
//         keyboardType="phone-pad"
//       />

//       {/* Predefined Places Selection */}
//       <Text style={styles.sectionTitle}>Choose Previous Visited Places (Optional):</Text>
//       <View style={styles.optionsContainer}>
//         {predefinedPlaces.map((place) => (
//           <TouchableOpacity
//             key={place}
//             style={[
//               styles.optionButton,
//               selectedPlaces.includes(place) && styles.selectedOptionButton,
//             ]}
//             onPress={() => togglePlaceSelection(place)}
//           >
//             <Text
//               style={[
//                 styles.optionButtonText,
//                 selectedPlaces.includes(place) && styles.selectedOptionButtonText,
//               ]}
//             >
//               {place}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Custom Place */}
//       <TextInput
//         style={styles.input}
//         value={customPlace}
//         onChangeText={setCustomPlace}
//         placeholder="Add Custom Place (Optional)"
//         placeholderTextColor="#999"
//       />

//       {/* Predefined Interests Selection */}
//       <Text style={styles.sectionTitle}>Choose Interests (Optional):</Text>
//       <View style={styles.optionsContainer}>
//         {predefinedInterests.map((interest) => (
//           <TouchableOpacity
//             key={interest}
//             style={[
//               styles.optionButton,
//               selectedInterests.includes(interest) && styles.selectedOptionButton,
//             ]}
//             onPress={() => toggleInterestSelection(interest)}
//           >
//             <Text
//               style={[
//                 styles.optionButtonText,
//                 selectedInterests.includes(interest) && styles.selectedOptionButtonText,
//               ]}
//             >
//               {interest}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save Profile</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }



// const styles = StyleSheet.create({
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     marginBottom: 15,
//     backgroundColor: '#fff',
//   },
//   container: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#f0f4f8',
//   },
//   title: {
//     fontSize: 24,
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
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     color: '#333',
//   },
//   optionsContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 15,
//   },
//   optionButton: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     margin: 5,
//     backgroundColor: '#ddd',
//     borderRadius: 8,
//   },
//   selectedOptionButton: {
//     backgroundColor: '#4A90E2',
//   },
//   optionButtonText: {
//     color: '#333',
//   },
//   selectedOptionButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
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
// });

import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function ProfileCompletionScreen({ route, navigation }) {
  const { uid } = route.params;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [isGenderModalVisible, setIsGenderModalVisible] = useState(false);
  const [isPlacesModalVisible, setIsPlacesModalVisible] = useState(false);
  const [isInterestsModalVisible, setIsInterestsModalVisible] = useState(false);

  const predefinedGenders = ['Male', 'Female'];
  const predefinedPlaces = [
   "Ansoo Lake",
    "Astola Island",
    "Attabad Lake",
    "Badshahi Mosque",
    "Baltoro Glacier",
    "Bhurban",
    "Bruti Waterfall Islamabad",
    "Concordia",
    "Deosai National Park",
    "Derawar Fort",
    "Dhanni Waterfall",
    "Emperor's Mosque",
    "Fairy Meadows",
    "Faisal Mosque",
    "Farphu Waterfall",
    "Gawadar",
    "Gojal Valley",
    "Gorakh Hill",
    "Gulpur Mahuli Waterfalls",
    "Hingol National Park",
    "Hunza Valley",
    "Indus Kohistan",
    "Jahaz Banda Kumrat Valley",
    "Kalam Valley",
    "Kalash",
    "Kanhatti Gardens",
    "Karambar Lake",
    "Katasraj Temple",
    "Khewra Salt Mine",
    "Kiwai Kaghan",
    "Lahore Fort",
    "Lake Saif-ul-Malook",
    "Lasbela Beach",
    "Mahodand Waterfall",
    "Malam Jabba",
    "Manthoka Waterfall",
    "Masjid Wazir Khan",
    "Matiltan",
    "Minar-e-Pakistan",
    "Mohatta Palace",
    "Mohenjo-daro",
    "Moola Chotok",
    "Naltar Lake",
    "Narh Waterfall",
    "Neela Sandh Waterfall",
    "Neelam Valley",
    "Noori de Than Waterfall",
    "Pakistan Air Force Museum",
    "Pakistan Monument",
    "Panjpeer Rocks",
    "Pattan",
    "Pir Sohawa",
    "Rama Lake",
    "Ratti Galli Waterfall",
    "Rawalakot",
    "Rohtas Fort",
    "Rush Lake",
    "Sajjikot Waterfall",
    "Satpara Lake",
    "Shalamar Bagh",
    "Shangrila Resort",
    "Shumber Waterfalls",
    "Skardu",
    "Sonmiani Beach",
    "Taxila Museum",
    "Thal Desert",
    "The Lahore Museum",
    "Umbrella Waterfall",
    "West Bay Beach"
  ];
  const predefinedInterests = [
    'Nature',
    'Mountainous',
    'National Park',
    'Museum',
    'Fort',
    'Hill Station',
    'Coastal',
    'City Attractions',
    'Valley',
    'Waterfall',
    'Temple',
    'Desert',
    'Resort',
  ];

  const handleSave = async () => {
    if (!name || !age || !nationality || !gender || !phone) {
      Alert.alert('Error', 'All fields except "Places" and "Interests" are required.');
      return;
    }

    try {
      await firestore().collection('users').doc(uid).set({
        uid,
        name,
        age,
        nationality,
        dob,
        gender,
        email,
        phone,
        places: selectedPlaces,
        interests: selectedInterests,
      });

      Alert.alert('Success', 'Profile completed successfully!');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error saving user data:', error.message);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    }
  };

  const toggleModal = (setModalVisible) => {
    setModalVisible((prev) => !prev);
  };

  const selectOption = (option, selectedList, setSelectedList) => {
    if (selectedList.includes(option)) {
      setSelectedList(selectedList.filter((item) => item !== option));
    } else {
      setSelectedList([...selectedList, option]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete Your Profile</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        placeholderTextColor="#999"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={nationality}
        onChangeText={setNationality}
        placeholder="Nationality"
        placeholderTextColor="#999"
      />
      {/* <TextInput
        style={styles.input}
        value={dob}
        onChangeText={setDob}
        placeholder="Date of Birth (DD/MM/YYYY)"
        placeholderTextColor="#999"
      /> */}

      {/* Gender Modal Trigger */}
      <TouchableOpacity style={styles.input} onPress={() => toggleModal(setIsGenderModalVisible)}>
        <Text style={{ color: gender ? '#333' : '#999' }}>
          {gender || 'Select Gender'}
        </Text>
      </TouchableOpacity>

      {/* Gender Modal */}
      <Modal
        visible={isGenderModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => toggleModal(setIsGenderModalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {predefinedGenders.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.pill,
                  gender === item && styles.selectedPill,
                ]}
                onPress={() => {
                  setGender(item);
                  toggleModal(setIsGenderModalVisible);
                }}
              >
                <Text
                  style={[
                    styles.pillText,
                    gender === item && styles.selectedPillText,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => toggleModal(setIsGenderModalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Places Modal Trigger */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => toggleModal(setIsPlacesModalVisible)}
      >
        <Text style={{ color: selectedPlaces.length > 0 ? '#333' : '#999' }}>
          {selectedPlaces.length > 0
            ? `Places Visited (${selectedPlaces.length})`
            : 'Select Places Visited'}
        </Text>
      </TouchableOpacity>

      {/* Places Modal */}
      <Modal
        visible={isPlacesModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => toggleModal(setIsPlacesModalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Places Visited</Text>
            <ScrollView>
              {predefinedPlaces.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.pill,
                    selectedPlaces.includes(item) && styles.selectedPill,
                  ]}
                  onPress={() =>
                    selectOption(item, selectedPlaces, setSelectedPlaces)
                  }
                >
                  <Text
                    style={[
                      styles.pillText,
                      selectedPlaces.includes(item) && styles.selectedPillText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => toggleModal(setIsPlacesModalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Interests Modal Trigger */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => toggleModal(setIsInterestsModalVisible)}
      >
        <Text style={{ color: selectedInterests.length > 0 ? '#333' : '#999' }}>
          {selectedInterests.length > 0
            ? `Interests Selected (${selectedInterests.length})`
            : 'Select Interests'}
        </Text>
      </TouchableOpacity>

      {/* Interests Modal */}
      <Modal
        visible={isInterestsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => toggleModal(setIsInterestsModalVisible)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Interests</Text>
            <ScrollView>
              {predefinedInterests.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.pill,
                    selectedInterests.includes(item) && styles.selectedPill,
                  ]}
                  onPress={() =>
                    selectOption(item, selectedInterests, setSelectedInterests)
                  }
                >
                  <Text
                    style={[
                      styles.pillText,
                      selectedInterests.includes(item) && styles.selectedPillText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => toggleModal(setIsInterestsModalVisible)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
        keyboardType="email-address"
      /> */}
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Updated styling for pill-shaped options
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    margin: 5,
  },
  selectedPill: {
    backgroundColor: '#4A90E2',
  },
  pillText: {
    color: '#333',
    fontSize: 14,
    textAlign: 'center',
  },
  selectedPillText: {
    color: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 24,
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
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    height:'80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalOption: {
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  modalOptionText: {
    fontSize: 18,
    color: '#333',
  },
  closeButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
