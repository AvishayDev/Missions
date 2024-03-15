import "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import { store } from "./redux/app/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}
