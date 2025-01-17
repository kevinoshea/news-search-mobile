

/**
 * Performs the REST API call for fetching news articles with the given query.
 * 
 * The <API_KEY> needs to be replaced with one that you can get by signing up at https://newsapi.org/docs/get-started
*/
const fetchNewsArticles = async (query) => {
    const url = `https://newsapi.org/v2/everything?q=${query}&from=2025-01-16&sortBy=popularity&apiKey=<API_KEY>`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch');
    }
    const results = await response.json();
    if (results.status !== 'ok') {
        throw new Error(`Search returning unexpected status: ${results.status}`);
    }
    return results;
};

export default fetchNewsArticles;
