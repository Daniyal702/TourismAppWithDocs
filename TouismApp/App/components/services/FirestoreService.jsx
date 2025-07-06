import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

// increment category click count
export const incrementCategoryClick = async (category) => {
  const currentUser = auth().currentUser;
  if (!currentUser) return;

  const userRef = firestore().collection('users').doc(currentUser.uid);

  const userDoc = await userRef.get();
  const clickCounts = userDoc.exists ? userDoc.data().clickCounts || {} : {};

  // Increment this category's count
  clickCounts[category] = (clickCounts[category] || 0) + 1;

  await userRef.set({ clickCounts }, { merge: true });
};

// get click counts
export const getClickCounts = async () => {
  const currentUser = auth().currentUser;
  if (!currentUser) return null;

  const userDoc = await firestore().collection('users').doc(currentUser.uid).get();
  return userDoc.exists ? userDoc.data().clickCounts || {} : {};
};

// add new interest if missing
export const addInterestIfMissing = async (newInterest) => {
  const currentUser = auth().currentUser;
  if (!currentUser) return;

  const userRef = firestore().collection('users').doc(currentUser.uid);
  const userDoc = await userRef.get();

  const existingInterests = userDoc.exists ? userDoc.data().interests || [] : [];

  if (!existingInterests.includes(newInterest)) {
    const updatedInterests = [...existingInterests, newInterest];
    await userRef.set({ interests: updatedInterests }, { merge: true });
  }
};
