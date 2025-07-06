import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Pressable, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import ImageMap from './ImageMap'; // Import your static image map

// Sample image map for each place (customize this with your own images)


const FavoritePlacesScreen = ({ navigation }) => {
  const [favoritePlaces, setFavoritePlaces] = useState([]); // State for storing favorite places
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [placesDetails, setPlacesDetails] = useState([]); // State to store detailed place data
  const userId = auth().currentUser.uid;

  // Fetch favorite places and related place details from Firestore
  useEffect(() => {
    const fetchFavoritePlaces = async () => {
      try {
        // Fetch the user's favorite places
        const favoritePlacesCollection = await firestore()
          .collection('favorite_places')
          .doc(userId)
          .get();

        if (favoritePlacesCollection.exists) {
          const favoritePlaceIds = favoritePlacesCollection.data().favorites || [];
          
          // Fetch detailed information for each favorite place from the 'places' collection
          const placesDataPromises = favoritePlaceIds.map(async (placeId) => {
            const placeSnapshot = await firestore().collection('places').doc(placeId.id).get();
            
            if (placeSnapshot.exists) {
              return { id: placeSnapshot.id, ...placeSnapshot.data() };
            }
          });

          const placesData = await Promise.all(placesDataPromises);
          setPlacesDetails(placesData);
          
        } else {
          setPlacesDetails([]);
        }
      } catch (error) {
        console.error("Error fetching favorite places: ", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritePlaces();
  }, [userId]);

  const handleFavoriteRemove = async (id) => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Please login to manage your favorites');
        return;
      }

      const userRef = firestore().collection('favorite_places').doc(currentUser.uid);

      const userDoc = await userRef.get();
      const userFavorites = userDoc.exists ? userDoc.data().favorites || [] : [];

      // Remove the place from favorites
      const updatedFavorites = userFavorites.filter(fav => fav.id !== id);

      // Update the Firestore document with the updated favorites array
      await userRef.set({ favorites: updatedFavorites }, { merge: true });

      // Update local state
      setPlacesDetails(prevPlaces => prevPlaces.filter(place => place.id !== id));

    } catch (error) {
      console.error('Error removing favorite:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  // Render Each Place
  const renderPlace = ({ item }) => {
    // Retrieve image URL from the imageMap using place name (_key) 
    const placeImage = ImageMap[item._key] || 'https://example.com/images/default.jpg'; // Default image if not found

    return (
      <Pressable onPress={() => navigation.navigate('LocationPage', { place: item })}>
        <View style={styles.card}>
          {/* Display image fetched from the imageMap */}
          <Image source={ImageMap[item.image] } style={styles.image} />
          <View style={styles.containerSet}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item._key}</Text>
              <Text style={styles.subtitle}>{item.district}</Text>
              <Text style={styles.locationRating}>⭐ {item.Ratings || 'N/A'} </Text>
            </View>
            <Pressable style={styles.favbtn} onPress={() => handleFavoriteRemove(item.id)}>
              <Icon name="heart" size={30} color="white" />
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  // Handle loading and error states
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Places</Text>
      <FlatList
        data={placesDetails}
        keyExtractor={(item) => item.id}
        renderItem={renderPlace}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

// Styles for Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
  favbtn: {
    marginTop: 10,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'hotpink',
    height: 55,
    width: 55,
    borderRadius: 7,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,  // Optional, for rounded corners
    borderTopRightRadius: 12, // Optional, for rounded corners
  },
  textContainer: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  containerSet: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationRating: {
    fontSize: 12,
    color: '#f39c12',
    marginTop: 5,
  },
});

export default FavoritePlacesScreen;
