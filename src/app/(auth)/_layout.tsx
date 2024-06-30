import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import colorPalette from "@/src/constants/colorPalette";
import { IconArrowLeft, IconArrowLeftBar, IconArrowLeftSquare, IconArrowLeftToArc } from "@tabler/icons-react-native";

const AuthLayout = () => {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={"/"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="signin"
        options={{
          title: "",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colorPalette.orange,
          },
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "Sign Up",
          headerTitleAlign: "center",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colorPalette.orange,
          },
          headerTitleStyle: {
            fontFamily: "DMSans",
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
