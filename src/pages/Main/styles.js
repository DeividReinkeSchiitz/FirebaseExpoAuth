import { StyleSheet } from "react-native";
import Color from "../../components/Colors";

const styles = StyleSheet.create({
  socialView: {
    flexDirection: "row"
  },
  container: {
    flex: 1,
    backgroundColor: Color.pretoFraco,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "stretch"
  },
  viewInput: {
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    height: 50,
    borderWidth: 2,
    borderColor: Color.azulMarinho,
    borderRadius: 15,
    padding: 10
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: Color.azulMarinho,
    paddingLeft: 30
  },
  title: {
    color: Color.azulMarinho,
    textAlign: "center",
    fontSize: 48,
    marginBottom: 20,
    position: "relative"
  },
  button: {
    margin: 10,
    backgroundColor: Color.azulMarinho,
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginHorizontal: 15
  },
  buttonText: {
    color: "#fff",
    fontSize: 20
  }
});

export default styles;
