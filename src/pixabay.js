import axios from 'axios';

export async function fetchPhotos(termSearch, page) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '36783014-3ac2be553b32ec8827c640700',
        q: termSearch,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
}
