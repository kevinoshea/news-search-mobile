import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import fetchNewsArticles from './FetchNewsArticles';
import SearchResults from './SearchResults';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        paddingHorizontal: 20,
    },
    searchBar: {
        width: 350,
        height: 40,
        borderWidth: 1,
        padding: 10,
    },
});

/**
 * Main News Search component containing the search bar and results.
 */
const NewsSearch = () => {
    const [queryText, setQueryText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [results, setResults] = useState(null);

    const search = async () => {
        try {
            setLoading(true);
            const results = await fetchNewsArticles(queryText);
            setResults(results);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const SearchBar = () => {
        const placeholder = "Search for news articles...";
        return (
            <TextInput
                style={styles.searchBar}
                placeholder={placeholder}
                onChangeText={setQueryText}
                onSubmitEditing={search}
                value={queryText} />
        );
    }

    return (
        <View style={styles.container}>
            <SearchBar />
            <Button disabled={queryText.length < 3} onPress={search} title="Search" />
            <SearchResults loading={loading} error={error} results={results} />
        </View>
    )
};

export default NewsSearch;
