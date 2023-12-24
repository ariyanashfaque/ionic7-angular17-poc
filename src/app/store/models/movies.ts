export interface ApiResult {
  page: number;
  results: Results[];
  total_pages: number;
  total_results: number;
}

export interface Results {
  id: number;
  adult: boolean;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_title: string;
}
