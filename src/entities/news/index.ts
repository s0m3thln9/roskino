export { getNewsContract, getNewsItemContract, searchNewsContract } from './api/contracts';
export { newsApi, useSearchNewsQuery } from './api/newsApi';
export {
  NEWS_LOCALE,
  NEWS_PAGE_SIZE,
  NEWS_SEARCH_LIMIT,
  newsItemSchema,
  newsPreviewSchema,
  type NewsBlock,
  type NewsItem,
  type NewsList,
  type NewsPreview,
  type NewsSearchResult,
  type SearchNewsParams,
} from './model/schema';
export { NewsArticle } from './ui/NewsArticle';
export { NewsCard } from './ui/NewsCard';
