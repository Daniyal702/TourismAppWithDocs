import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
} from 'react-native';
import { firestore } from '../config/firestoreConfig';
import ImageMap from './ImageMap'; // Import the static image map

export default function LocationList({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('places')
      .orderBy('Ratings', 'desc') // Fetch top 20 places
      .limit(20)
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const place = { id: doc.id, ...doc.data() };

          // Map image path using ImageMap or fallback to default image
          place.imageSource = ImageMap[place.image] || ImageMap['default.jpg'];
          data.push(place);
        });
        setPlaces(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  function Categories({ setSelectedCategory }) {
    const categories = [
      'All',
      'Lake',
      'Nature',
      'City Attractions',
      'Mountainous',
      'Hill Station',
      'Waterfall',
      'National Park',
      'Fort',
      'Coastal',
      'Valley',
      'Temple',
      'Mine',
      'Monument',
      'Museum',
      'Resort',
      'Desert',
    ];

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category ? styles.selectedCategory : null,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category ? styles.selectedCategoryText : null,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  function LocationCard({ place }) {
    return (
      <View style={styles.card}>
        <Pressable onPress={() => navigation.navigate('LocationPage', { place: place })}>
          <Image
            source={place.imageSource} // Use the image source from Firestore
            style={styles.cardImage}
          />
          <Text style={styles.locationName}>{place._key}</Text>
          <Text style={styles.locationDistrict}>{place.district}</Text>
          <Text style={styles.locationRating}>⭐ {place.Ratings} / 5</Text>
        </Pressable>
      </View>
    );
  }

  const filteredPlaces =
    selectedCategory === 'All'
      ? places
      : places.filter((place) => place.category === selectedCategory);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render Scrollable Categories */}
      <Categories setSelectedCategory={setSelectedCategory} />

      {/* Render Places */}
      <FlatList
        horizontal
        data={filteredPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LocationCard place={item} />}
        showsHorizontalScrollIndicator={false}
      />

      {/* See More Button */}
      <TouchableOpacity
        style={styles.seeMoreButton}
        onPress={() => navigation.navigate('AllPlacesPage')}
      >
        <Text style={styles.seeMoreButtonText}>See More</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryScroll: {
    marginBottom: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    width: 200,
    alignItems: 'center',
  },
  cardImage: {
    width: 190,
    height: 120,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  locationDistrict: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  locationRating: {
    fontSize: 12,
    color: '#f39c12',
    marginTop: 5,
    textAlign: 'center',
  },
  seeMoreButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  seeMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

