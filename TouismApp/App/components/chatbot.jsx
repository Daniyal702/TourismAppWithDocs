

import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ChatbotScreen = () => {
  const navigation = useNavigation();

  const fetchPlaceDataAndNavigate = async (placeName) => {
    try {
      const snapshot = await firestore()
        .collection('places')
        .where('_key', '==', placeName)
        .get();

      if (!snapshot.empty) {
        const placeData = snapshot.docs[0].data();
        navigation.navigate('LocationPage', { place: placeData });
      } else {
        console.log(`Place "${placeName}" not found in Firestore.`);
      }
    } catch (error) {
      console.error('Error fetching place data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          uri: 'https://cdn.botpress.cloud/webchat/v3.0/shareable.html?configUrl=https://files.bpcontent.cloud/2025/06/24/11/20250624113305-2WJ4LBJ0.json',
        }}
        style={{ flex: 1 }}
        startInLoadingState
        renderLoading={() => <ActivityIndicator size="large" color="#634433" />}
        onShouldStartLoadWithRequest={(event) => {
          console.log('WebView attempted to load:', event.url);

          if (event.url.startsWith('https://myapp.com/open/place/')) {
            const placeName = decodeURIComponent(event.url.split('/open/place/')[1]);
            console.log('Intercepted place navigation for:', placeName);
            fetchPlaceDataAndNavigate(placeName);
            return false;
          }

          return true;
        }}
      />
    </View>
  );
};

export default ChatbotScreen;

const styles = StyleSheet.create({});


