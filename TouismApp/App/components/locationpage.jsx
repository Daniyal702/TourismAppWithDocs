import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { incrementCategoryClick, getClickCounts, addInterestIfMissing } from './services/FirestoreService';
import { inferUserInterest } from './services/AIService';
import ImageMap from './ImageMap'; // Import the static image map

const DynamicLocationPage = ({ navigation }) => {
  const route = useRoute();
  const { place } = route.params; // Get the location data dynamically passed
  const [isFavorite, setIsFavorite] = useState(false);

  const [similarPlaces, setSimilarPlaces] = useState([]);


  const handleLocationClick = async (place) => {
  const category = place.category;
  await incrementCategoryClick(category);   // Increment this category's click count

  console.log(`User clicked on category: ${category}`);
};

const runInterestInference = async () => {
  const clickCounts = await getClickCounts();
  
  // console.log(clickCounts)
  if (!clickCounts) return;

  const categoryOrder = ["Beach", "Mountainous", "Museum", "Nature", "Shopping", "Mosque", "Park", "Temple", "Amusement", "Historic", "Cafe", "Restaurant", "Resort"];
  const clickCountsArray = categoryOrder.map(cat => clickCounts[cat] || 0);
  console.log('Sending click counts:', clickCountsArray);

  const totalClicks = Object.values(clickCounts).reduce((a, b) => a + b, 0);
  console.log('Total clicks:', totalClicks);

  if (totalClicks % 3 === 0 && totalClicks !== 0) {  // every 3 clicks
    const inferredCategory = await inferUserInterest(clickCountsArray);
    console.log('Inferred category:', inferredCategory);
    
    if (inferredCategory) {
      await addInterestIfMissing(inferredCategory);
      console.log(`New interest inferred: ${inferredCategory}`);
    }
  }
};

const handleVisitPlace = async (item) => {
  await navigation.push('LocationPage', { place: item });
  await handleLocationClick(place);
  await runInterestInference();
  
};


useEffect(() => {
  const checkIfFavorite = async () => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const userDoc = await firestore()
        .collection('favorite_places')
        .doc(currentUser.uid)
        .get();

      if (userDoc.exists) {
        const favorites = userDoc.data().favorites || [];
        const isPlaceFavorite = favorites.some((fav) => fav.place === place._key);
        setIsFavorite(isPlaceFavorite);
      }
    }
  };

  checkIfFavorite();
  fetchSimilarPlaces();
}, [place._key]);

// fetch similar places based on category
const fetchSimilarPlaces = async () => {
  try {
    if (!place.category) {
      console.log('No Category found for this place.');
      return;
    }

    const snapshot = await firestore()
      .collection('places')
      .where('category', '==', place.category)
      .limit(6)
      .get();

    const placesArray = snapshot.docs
      .map((doc) => doc.data())
      .filter((p) => p._key !== place._key);

    setSimilarPlaces(placesArray);
  } catch (error) {
    console.error('Error fetching similar places:', error);
  }
};


  useEffect(() => {
    // Check if the place is already in the user's favorites
    const checkIfFavorite = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const userDoc = await firestore()
          .collection('favorite_places')
          .doc(currentUser.uid) // Use the current user's UID
          .get();

        if (userDoc.exists) {
          const favorites = userDoc.data().favorites || [];
          const isPlaceFavorite = favorites.some((fav) => fav.place === place._key); // Check if this place is in favorites
          setIsFavorite(isPlaceFavorite);
        }
      }
    };

    checkIfFavorite();
  }, [place._key]);

  const handleFavoriteToggle = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Please login to add to favorites');
        return;
      }

      const userRef = firestore().collection('favorite_places').doc(currentUser.uid);

      const userDoc = await userRef.get();
      const userFavorites = userDoc.exists ? userDoc.data().favorites || [] : [];

      let updatedFavorites;

      if (isFavorite) {
        // Remove from favorites
        updatedFavorites = userFavorites.filter((fav) => fav.place !== place._key);
      } else {
        // Add to favorites (structure it as an object with the "place" key)
        updatedFavorites = [...userFavorites, { id: place.id, place: place._key }];
      }

      // Update the Firestore document with the updated favorites array
      await userRef.set({ favorites: updatedFavorites }, { merge: true });

      // Update local state
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  // Dynamically map the image (use Firestore path or fallback to local ImageMap)
  const imageSource = ImageMap[place.image] || ImageMap['default.jpg'];

  return (
    <ScrollView style={styles.container}>
      <Image source={imageSource} style={styles.locationImage} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{place._key}</Text>
        {/* <Text style={styles.price}>$100/person</Text> */}

        <View style={styles.detailsRow}>
          {/* <Text style={styles.detailText}>100 KM</Text> */}
          <Text style={styles.detailRating}>⭐ {place.Ratings} </Text>
          {/* <Text style={styles.detailText}>3+</Text> */}
        </View>

        <View style={styles.func}>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('TripCreation', { place: place })}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </Pressable>

          {/* Favorite Button */}
          <Pressable style={styles.favbtn} onPress={handleFavoriteToggle}>
            <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={30} color="white" />
          </Pressable>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{place.Desc}</Text>
        
      </View>
      <Text style={styles.similarTitle}>Similar Places</Text>
<ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.similarContainer}>
  {similarPlaces.map((item, index) => (
    <Pressable
      key={index}
      onPress={() =>{ handleVisitPlace(item)}} 
      style={styles.similarCard}
    >
      <Image
        source={ImageMap[item.image] || ImageMap['default.jpg']}
        style={styles.similarImage}
      />
      <Text style={styles.similarName}>{item._key}</Text>
    </Pressable>
  ))}
</ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  similarTitle: {
  fontSize: 20,
  color: 'black',
  fontWeight: 'bold',
  marginVertical: 15,
},
similarContainer: {
  marginVertical: 10,
},
similarCard: {
  marginRight: 15,
  width: 150,
  borderRadius: 10,
  backgroundColor: '#f2f2f2',
  overflow: 'hidden',
},
similarImage: {
  width: '100%',
  height: 100,
},
similarName: {
  fontSize: 16,
  color: 'black',
  textAlign: 'center',
  paddingVertical: 5,
},

  detailRating: {
    fontSize: 20,
    color: '#f39c12',
    marginTop: 5,
  },
  func: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favbtn: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'hotpink',
    height: 55,
    width: 55,
    borderRadius: 7,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
  },
  locationImage: {
    width: '100%',
    height: 420,
    borderRadius: 15,
    marginTop: 20,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'black',
    marginVertical: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  detailText: {
    color: 'black',
    fontSize: 16,
  },
  descriptionTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  descriptionText: {
    color: 'black',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1f1f1f',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    width: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DynamicLocationPage;
