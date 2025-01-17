import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    articleContainer: {
        borderWidth: 1,
        backgroundColor: 'white',
        marginVertical: 5
    },
    articleHeader: {
        borderWidth: 1,
        backgroundColor: 'blue',
        padding: 5
    },
    articleTitle: {
        color: 'white'
    },
    articleBody: {
        padding: 5
    }
});

/**
 * Component for displaying all results from the search, including handling loading/error states, etc.
 */
const SearchResults = ({loading, error, results}) => {
    if (loading) {
        return <ActivityIndicator />;
    }
    if (error) {
        console.error(error);
        return <Text>An error occurred: {error}</Text>
    }
    if (!results) {
        return null;
    }

    const Article = ({article}) => {
        return (
            <View style={styles.articleContainer}>
                <View style={styles.articleHeader}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                </View>
                <View style={styles.articleBody}>
                    <Text>{article.content}</Text>
                </View>
            </View>
        );
    }
    // TODO: stack navigator to open the article to see the contents, use: article.url

    return (
        <View>
            <Text>Results found: {results.totalResults}</Text>
            <ScrollView>
                {results.articles.map((article, idx) => <Article key={`${idx}-${article.url}`} article={article} />)}
            </ScrollView>
        </View>
    );
};

export default SearchResults;
