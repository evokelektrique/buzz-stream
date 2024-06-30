import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import ThreadRow from "@/src/components/ThreadRow";
import { useInsertThread, useThreadList } from "@/src/api/threads";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/providers/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import colorPalette from "@/src/constants/colorPalette";
import { styles } from "@/src/constants/styles";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const { data: threads, error, isLoading } = useThreadList();
  const queryClient = useQueryClient();

  useEffect(() => {
    const threadsSubscription = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "threads" },
        (payload) => {
          queryClient.invalidateQueries({ queryKey: ["threads"] });
        }
      )
      .subscribe();

    return () => {
      threadsSubscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
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
        <Stack.Screen
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: "DMSans",
              fontWeight: "500",
            },
          }}
        />
        <ActivityIndicator size={"large"} color={colorPalette.black} />
      </SafeAreaView>
    );
  }

  if (error) {
    return <Text>Error ! {error.message}</Text>;
  }

  return (
    <View
      style={{ flexGrow: 1, backgroundColor: "white", paddingHorizontal: 20 }}
    >
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerTitleStyle: {
            fontFamily: "DMSans",
            fontWeight: "500",
          },
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
                <Text style={[styles.textTitle, { color: colorPalette.black }]}>
                  BUZZ STREAM
                </Text>
              </View>
            );
          },
        }}
      />
      <View style={{ flex: 1 }}>
        <FlashList
          data={threads}
          renderItem={({ item }) => <ThreadRow thread={item} />}
          estimatedItemSize={100}
        />
      </View>
    </View>
  );
};

export default Home;
