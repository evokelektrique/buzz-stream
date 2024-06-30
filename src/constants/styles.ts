import { StyleSheet } from "react-native";
import colorPalette from "./colorPalette";

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: colorPalette.black,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontFamily: "DMSans",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    backgroundColor: colorPalette.white,
    borderBottomWidth: 4,
  },
  button: {
    textTransform: "uppercase",
    marginTop: 10,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    borderColor: colorPalette.black,
    borderWidth: 1,
    borderBottomWidth: 4,
    height: 50,
    justifyContent: "center",
    verticalAlign: "middle",
    textAlign: "center",
  },
  textTitle: {
    fontFamily: "DMSans",
    fontSize: 28,
    fontWeight: "bold",
  },
  textNormal: {
    fontFamily: "DMSans",
    fontSize: 16,
    fontWeight: "500",
  },
  textSmall: {
    fontFamily: "DMSans",
    fontSize: 14,
    fontWeight: "500",
  },
  fontWeightBold: {
    fontWeight: "bold",
  },
  fontWeightNormal: {
    fontWeight: "normal",
  },
  fontWeightLight: {
    fontWeight: "light",
  },
  wrapper: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  wrapperOrange: {
    backgroundColor: colorPalette.orange,
  },
});
