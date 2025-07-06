import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { firestore } from '../config/firestoreConfig';
import Modal from 'react-native-modal';
import ImageMap from './ImageMap'; // Import your static image map

export default function AllPlacesPage({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Default');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  // Define categories
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

  // Define sort options
  const sortOptions = [
    { label: 'Default', value: 'Default' },
    { label: 'Name (A-Z)', value: 'NameAsc' },
    { label: 'Name (Z-A)', value: 'NameDesc' },
    { label: 'Rating (High to Low)', value: 'RatingDesc' },
    { label: 'Rating (Low to High)', value: 'RatingAsc' },
  ];

  // Fetch places from Firestore
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('places')
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const place = { id: doc.id, ...doc.data() };

          // Map image path to ImageMap entry or fallback to default
          place.imageSource = ImageMap[place.image] || ImageMap['default.jpg'];
          data.push(place);
        });
        setPlaces(data);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  // Filter places by category and search query
  const filteredPlaces = places.filter((place) => {
    const matchesSearchQuery =
      place._key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || place.category === selectedCategory;

    return matchesSearchQuery && matchesCategory;
  });

  // Sort places based on selected sort option
  const sortedPlaces = [...filteredPlaces].sort((a, b) => {
    if (sortOption === 'NameAsc') {
      return a._key.localeCompare(b._key);
    } else if (sortOption === 'NameDesc') {
      return b._key.localeCompare(a._key);
    } else if (sortOption === 'RatingDesc') {
      return b.Ratings - a.Ratings;
    } else if (sortOption === 'RatingAsc') {
      return a.Ratings - b.Ratings;
    }
    return 0;
  });

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // Component for each place card
  function LocationCard({ place }) {
    return (
      <View style={styles.card}>
        <Pressable onPress={() => navigation.navigate('LocationPage', { place: place })}>
          <Image
            source={place.imageSource} // Use preprocessed image source
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.locationName}>{place._key}</Text>
            <Text style={styles.locationDistrict}>{place.district}</Text>
            <Text style={styles.locationRating}>⭐ {place.Ratings} </Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search places..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Filter Button */}
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setFilterModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filter & Sort</Text>
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        isVisible={isFilterModalVisible}
        onBackdropPress={() => setFilterModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filter & Sort</Text>

          {/* Categories */}
          <Text style={styles.modalSubtitle}>Category</Text>
          <View style={styles.categories}>
            {categories.map((category) => (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategory,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Sort Options */}
          <Text style={styles.modalSubtitle}>Sort By</Text>
          {sortOptions.map((option) => (
            <Pressable
              key={option.value}
              onPress={() => setSortOption(option.value)}
              style={[
                styles.sortOption,
                sortOption === option.value && styles.selectedSortOption,
              ]}
            >
              <Text
                style={[
                  styles.sortOptionText,
                  sortOption === option.value && styles.selectedSortOptionText,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          ))}

          {/* Apply Button */}
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setFilterModalVisible(false)}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* List of Places */}
      <FlatList
        data={sortedPlaces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <LocationCard place={item} />}
        showsVerticalScrollIndicator={false}
        numColumns={2} // Two cards per row
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 10,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#fff',
    elevation: 2,
  },
  filterButton: {
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  categoryButton: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  selectedCategory: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#fff',
  },
  sortOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedSortOption: {
    backgroundColor: '#007bff',
  },
  sortOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedSortOptionText: {
    color: '#fff',
  },
  applyButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    marginHorizontal: 5,
    width: '48%',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  locationDistrict: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  locationRating: {
    fontSize: 12,
    color: '#f39c12',
  },
});
