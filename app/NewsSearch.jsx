import { FC, useState } from "react";
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
});
const fetchData = async (query) => {
    const url = `https://newsapi.org/v2/everything?q=${query}&from=2025-01-16&sortBy=popularity&apiKey=<API_KEY>`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch');   // TODO - error handling
    }
    const results = await response.json();
    if (results.status !== 'ok') {
        throw new Error(`Search returning unexpected status: ${results.status}`);
    }
    return results;
};

const SearchResults = ({loading, error, results}) => {
    if (loading) {
        return <ActivityIndicator />;
    }
    if (error) {
        return <Text>An error occurred: {JSON.stringify(error)}</Text>
    }
    if (!results) {
        return null;
    }

    const Article = ({article}) => {
        return (
            <View style={{borderWidth: 1, backgroundColor: 'white' }}>
                <Text>{article.title}</Text>
                <Text>{article.content}</Text>
                <Text>{article.url}</Text>
                <Text>{article.urlToImage}</Text>
            </View>
        );
    }

    return (
        <View>
            <Text>Results found: {results.totalResults}</Text>
            <ScrollView>
                {results.articles.map((article, idx) => <Article key={`${idx}-${article.url}`} article={article} />)}
            </ScrollView>
        </View>
    );
    
};

const NewsSearch = () => {
    const [queryText, setQueryText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);
    const search = async () => {
        try {
            setLoading(true);
            const results = await fetchData(queryText);
            setResults(results);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{flex: 1, marginTop: 20, paddingHorizontal: 20}}>
            <TextInput style={styles.input} placeholder="Search for news articles..." onChangeText={setQueryText} value={queryText} />
            <Button onPress={search} title="Search" />
            <SearchResults loading={loading} error={error} results={results} />
        </View>
    )
};

export default NewsSearch;
