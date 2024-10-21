import Result from '@/interface/ApiResponseInterfaces';
import { API_KEY } from '@/config';
const axios = require('axios').default;

export default async function getNews(keyword: string): Promise<Result | null> {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: encodeURIComponent(keyword),
        language: 'en',
        pageSize: 20,
      },
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}