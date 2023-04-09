import axios from 'axios';

export default async function search(userInput, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?key=34966156-3ff247f14ff72df962e5ede09&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  return response.data;
}
