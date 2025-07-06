import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const RecommendationsScreen = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const user = auth().currentUser;
      if (user) {
        const recs = await getRecommendations(user.uid);
        setRecommendations(recs);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <View>
      <Text>Recommended Places:</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.place}
        renderItem={({ item }) => (
          <View>
            <Text>{item.place}</Text>
            <Text>Predicted Rating: {item.predicted_rating.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
};
