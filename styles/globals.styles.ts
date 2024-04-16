import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  rowContainer: {
    display: "flex",
    flexDirection: "row",
  },
  cardContainer: {
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    padding: 10,
  },
  flex1: {
    flex: 1,
  },
  width100: {
    width: "100%",
  },
});
