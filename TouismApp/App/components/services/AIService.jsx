import axios from 'axios';

// send click counts to AI backend and get predicted category
export const inferUserInterest = async (clickCountsArray) => {
  try {
    const response = await axios.post('http://192.168.2.105:8001/aiinterest', {
      click_counts: clickCountsArray
    });
     console.log('AI API Response:', response.data);
    const predictedCategory = response.data.predicted_category;
    return predictedCategory;
  } catch (error) {
    console.error('Error calling AI backend:', error);
    return null;
  }
};
