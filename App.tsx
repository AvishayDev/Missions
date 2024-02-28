import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home';
import About from './pages/About';
import Missions from './pages/Missions';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Very cool!</Text>
      <Home/>
      <About/>
      <Missions/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
