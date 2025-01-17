import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewsSearch from "./NewsSearch/NewsSearch";
import { FC } from "react";

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  titleText: {
    fontSize: 30,
  }
});

const Title: FC = () => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>News Search</Text>
    </View>
  );
}

const App: FC = () => {
  return (
    <SafeAreaView style={styles.app}>
      <Title />
      <NewsSearch />
    </SafeAreaView>
  );
}

export default App;
