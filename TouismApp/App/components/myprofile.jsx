

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const MyProfilePage = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    nationality: '',
    phone: '',
    currentLocation: { latitude: '', longitude: '' },
    interests: [],
    places: [],
  });
  const [isEditing, setIsEditing] = useState(false); // Toggle between view and edit mode
  const [selectedPlaces, setSelectedPlaces] = useState([]); // Track selected places for editing
  const [selectedInterests, setSelectedInterests] = useState([]); // Track selected interests for editing
  const predefinedPlaces = [
    "Ansoo Lake", "Astola Island", "Attabad Lake", "Badshahi Mosque", "Baltoro Glacier",
    "Bhurban", "Bruti Waterfall Islamabad", "Concordia", "Deosai National Park", "Derawar Fort",
    "Dhanni Waterfall", "Emperor's Mosque", "Fairy Meadows", "Faisal Mosque", "Farphu Waterfall",
    // Add the full list as needed...
  ];
  const predefinedInterests = [
    "Lake", "Nature", "City Attractions", "Mountainous", "Hill Station", "Waterfall",
    "National Park", "Fort", "Coastal", "Valley", "Temple", "Mine", "Monument", "Museum",
    "Resort", "Desert",
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
          const data = userDoc.data() || {};
          setUserData(data);
          setSelectedPlaces(data.places || []); // Set places from the user data
          setSelectedInterests(data.interests || []); // Set interests from the user data
        }
      } catch (error) {
        console.log('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  // Handle editing places
  const togglePlaceSelection = (place) => {
    if (selectedPlaces.includes(place)) {
      setSelectedPlaces(selectedPlaces.filter((p) => p !== place));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  // Handle editing interests
  const toggleInterestSelection = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // Save updated profile
  const handleSave = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        await firestore()
          .collection('users')
          .doc(currentUser.uid)
          .set({
            ...userData,
            places: selectedPlaces,  // Update places
            interests: selectedInterests,  // Update interests
          });
        Alert.alert('Success', 'Profile updated successfully!');
        setIsEditing(false); // Exit edit mode
      }
    } catch (error) {
      console.log('Error updating user data:', error.message);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await auth().signOut(); // Firebase logout
      navigation.navigate('Login'); // Navigate back to Login screen
    } catch (error) {
      console.log('Logout Error:', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={20}></Icon>
          <Text style={styles.menuText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="camera" size={40} color="black"></Icon>
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: userData?.profilePicture || 'https://via.placeholder.com/100' }} // Placeholder or profile picture
        />
        {!isEditing && <Text style={styles.profileName}>{userData?.name || 'User Name'}</Text>}
      </View>

      {/* Editable Profile Fields */}
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={userData?.name}
          editable={isEditing}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
        />

        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={styles.input}
          value={userData?.gender}
          editable={isEditing}
          onChangeText={(text) => setUserData({ ...userData, gender: text })}
        />

        <Text style={styles.label}>Nationality</Text>
        <TextInput
          style={styles.input}
          value={userData?.nationality}
          editable={isEditing}
          onChangeText={(text) => setUserData({ ...userData, nationality: text })}
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={userData?.phone}
          editable={isEditing}
          keyboardType="phone-pad"
          onChangeText={(text) => setUserData({ ...userData, phone: text })}
        />
      </View>

      {/* Editable Places Section */}
      {isEditing && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choose Previous Visited Places:</Text>
          <View style={styles.optionsContainer}>
            {predefinedPlaces.map((place) => (
              <TouchableOpacity
                key={place}
                style={[
                  styles.optionButton,
                  selectedPlaces.includes(place) && styles.selectedOptionButton,
                ]}
                onPress={() => togglePlaceSelection(place)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedPlaces.includes(place) && styles.selectedOptionButtonText,
                  ]}
                >
                  {place}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Editable Interests Section */}
      {isEditing && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Choose Interests:</Text>
          <View style={styles.optionsContainer}>
            {predefinedInterests.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.optionButton,
                  selectedInterests.includes(interest) && styles.selectedOptionButton,
                ]}
                onPress={() => toggleInterestSelection(interest)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedInterests.includes(interest) && styles.selectedOptionButtonText,
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 5,
    borderRadius: 8,
  },
  selectedOptionButton: {
    backgroundColor: '#4caf50',
  },
  optionButtonText: {
    color: '#333',
  },
  selectedOptionButtonText: {
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  editButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyProfilePage;
