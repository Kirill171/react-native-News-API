export default interface Response {
  articles: Article[];
  status: string;
  totalResults: number;
}

interface Article {
  source: Source[],
  author: string,
  content: string,
  description: string,
  publishedAt: string,
  title: string,
  url: string,
  urlToImage: string,
}

interface Source {
  id: string,
  name: string,
}