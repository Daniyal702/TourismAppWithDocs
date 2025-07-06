import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from './components/welcome';
import Signup from './components/signup';
import Signin from './components/signin';
import Homepage from './components/homepage';
import AllPlacesPage from './components/Search';
import ProfilePage from './components/profilepage';
import DynamicLocationPage from './components/locationpage';
import FavoritePlacesScreen from './components/favplaces';
import ForgotPasswordScreen from './components/resetpassword';
import ProfileCompletionScreen from './components/profilecompletion';
import MyProfilePage from './components/myprofile';
import TripCreationScreen from './components/TripCreationScreen';
import UserBookingsScreen from './components/Bookinglist';
import PaymentScreen from './components/payment';
import ChatbotScreen from './components/chatbot';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Welcome'
        screenOptions={{
            headerShown:false,}}
      >
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name='BookingList' component={UserBookingsScreen} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="MyProfile" component={MyProfilePage}/>
        <Stack.Screen name="LocationPage" component={DynamicLocationPage} />
        <Stack.Screen name="ForgetPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Fav" component={FavoritePlacesScreen} />
        <Stack.Screen name="ProfileCompletion" component={ProfileCompletionScreen}/>
        <Stack.Screen name="TripCreation" component={TripCreationScreen}/>
        {/* <Stack.Screen name="Booking" component={BookingFlowScreen}/> */}
        <Stack.Screen name="AllPlacesPage" component={AllPlacesPage} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="Chatbot"       component={ChatbotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

