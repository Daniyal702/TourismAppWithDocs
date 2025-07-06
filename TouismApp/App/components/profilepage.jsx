


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfilePage = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth().currentUser; // Get the logged-in user
        if (currentUser) {
          const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
          setUserData(userDoc.data()); // Set fetched data to state
        }
      } catch (error) {
        console.log('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Firebase logout
      navigation.navigate('Login'); // Navigate back to Login screen
    } catch (error) {
      console.log('Logout Error:', error.message);
    }
  };

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.head}>
        <Pressable onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Icon name="arrow-back" size={20}></Icon>
          <Text style={styles.menuText}>Back</Text>
        </Pressable>
        <Pressable>
          <Icon name="camera" size={40} color="black"></Icon>
        </Pressable>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: userData?.profilePicture || 'https://via.placeholder.com/100' }} // Default if no profile picture
        />
        <Text style={styles.profileName}>{userData?.name || 'User Name'}</Text>
        <Text style={styles.profileEmail}>{userData?.email || 'user@example.com'}</Text>
      </View>

      

      {/* Menu Options */}
      <ScrollView style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("MyProfile", { userData })}>
          <Text style={styles.menuText}>My Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BookingList')}>
          <Text style={styles.menuText}>My Records</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Invite a Friend</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Help</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  head: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff', // White background
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd', // Grey placeholder for image
  },
  profileName: {
    color: '#000', // Black text for the name
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    color: '#666', // Grey text for email
    fontSize: 16,
    marginBottom: 10,
  },
  additionalInfoContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  menuContainer: {
    marginTop: 20,
    flex: 1,
  },
  menuItem: {
    backgroundColor: '#f0f0f0', // Light grey background for menu items
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  menuText: {
    color: '#000', // Black text for menu options
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#ff4d4d', // Red background for the logout button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff', // White text for the logout button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
