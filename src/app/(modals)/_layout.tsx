import React from "react";
import { Redirect, Stack } from "expo-router";
import { styles } from "@/src/constants/styles";

const ModalsLayout = () => {
  return (
    <Stack screenOptions={{ presentation: "modal" }}>
      <Stack.Screen
        name="thread/[id]"
        options={{
          title: "",
          headerTitleAlign: "center",
          headerTitleStyle: [
            styles.textTitle,
            styles.fontWeightBold
          ]
        }}
      />
    </Stack>
  );
};

export default ModalsLayout;
