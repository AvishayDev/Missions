import "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import AppNavigator from "./navigation/AppNavigator";
import { persistor, store } from "./redux/app/store";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { KeyboardAvoidingView } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
