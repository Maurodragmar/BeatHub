import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius vero pariatur quo necessitatibus, veniam harum cumque dignissimos odit! Recusandae labore culpa tenetur harum provident earum obcaecati excepturi porro vitae odit.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
