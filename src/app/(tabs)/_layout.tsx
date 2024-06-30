import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { IconList, IconPlus, IconUserCog } from "@tabler/icons-react-native";
import colorPalette from "@/src/constants/colorPalette";
import { styles } from "@/src/constants/styles";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarInactiveTintColor: colorPalette.white,
        tabBarActiveTintColor: colorPalette.darkOrange,
        tabBarShowLabel: false,
        headerShadowVisible: false,
        tabBarStyle: {
          bottom: 10,
          marginTop: 12,
          shadowColor: "transparent",
          backgroundColor: colorPalette.black,
          marginHorizontal: 10,
          borderRadius: 8,
          borderTopWidth: 0,
          borderColor: "black",
        },
        headerTitleStyle: [
          styles.textTitle,
          {
            textTransform: "uppercase",
          },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Buzz Stream",
          headerTitleAlign: "center",
          tabBarIcon: ({ size, color }) => (
            <IconList size={size} color={color} />
          ),
          headerTitle: (): any => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("@/assets/images/logos/logo-base-1200x1200.png")}
                  style={{ objectFit: "contain", maxWidth: 28 }}
                  width={28}
                  height={28}
                />
                <Text style={[styles.textTitle]}>BUZZSTREAM</Text>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="new"
        options={{
          title: "New",
          headerTitleAlign: "center",
          tabBarIcon: ({ size, color, focused }): any => {
            return (
              <View
                style={{
                  position: "absolute",
                  bottom: 20,
                  height: 60,
                  width: 60,
                  borderRadius: 8,
                  backgroundColor: focused
                    ? colorPalette.darkOrange
                    : colorPalette.gray,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconPlus color={colorPalette.white} size={size} />
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ size, color }) => (
            <IconUserCog size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
