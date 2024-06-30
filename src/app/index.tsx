import { ActivityIndicator } from "react-native";
import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import colorPalette from "../constants/colorPalette";

const Index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView
        style={{
          backgroundColor: "white",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <ActivityIndicator size={'large'} color={colorPalette.black} />
      </SafeAreaView>
    );
  }

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return <Redirect href={"/(tabs)"} />;
};

export default Index;
