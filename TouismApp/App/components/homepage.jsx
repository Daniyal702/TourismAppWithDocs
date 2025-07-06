

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from './navbar';
import auth from '@react-native-firebase/auth';
import LocationList from './locationlist';
import ImageMap from './ImageMap'; // Import the static image map


const HomePage = ({ navigation }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 Replace with your actual user id
  const userId = auth().currentUser.uid;

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(`http://192.168.2.105:8000/recommend/${userId}`);
      const json = await response.json();
      const recommendationsWithImageUri = json.recommendations.map(item => ({
        ...item,
        imageUri: ImageMap[item.image]
      }));
      setRecommendations(recommendationsWithImageUri);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setLoading(false);
    }
  };

  const renderRecommendationCard = ({ item }) => (
    <Pressable style={styles.card} onPress={() => navigation.navigate('LocationPage', { place: item})}>
      <Image source={item.imageUri }  style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item._key}</Text>
      <Text style={styles.cardSubtitle}>{item.category}</Text>
    </Pressable>
  );

  return (
    <View style={styles.main}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Discover interesting places</Text>
          <Pressable onPress={() => navigation.navigate('Profile')}>
            <Icon name="person-circle-outline" size={40} color="black" />
          </Pressable>
        </View>
        {/* Popular Locations */}
        <Text style={styles.sectionTitle}>Popular locations</Text>
        <LocationList navigation={navigation} />
        

        {/* AI Recommendations */}
        <Text style={styles.sectionTitle}>Recommendations for you</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          
          <FlatList
          
            data={recommendations}
            renderItem={renderRecommendationCard}
            keyExtractor={(item) => item._key}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </ScrollView>
        
      <Navbar navigation={navigation} style={styles.nav} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  main: {
    height: 860,
    margin: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'black',
  },
  card: {
    width: 150,
    marginRight: 15,
  },
  cardImage: {
    width: '100%',
    height: 130,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'grey',
  },
});

export default HomePage;
