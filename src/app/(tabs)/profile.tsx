import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { Redirect } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { useProfile, useUpdateProfile } from "@/src/api/profile";
import colorPalette from "@/src/constants/colorPalette";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/src/constants/styles";

const Profile = () => {
  const { session, loading, profile } = useAuth();
  const { mutate: updateProfile } = useUpdateProfile();
  const { data: newProfile, error } = useProfile(session?.user.id);
  const [fullName, setFullName] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setFullName(newProfile?.full_name ?? "");
  }, []);

  const onSubmit = () => {
    setIsLoading(true);

    const data = { ...newProfile, full_name: fullName };

    updateProfile(data, {
      onError: (error) => {
        Alert.alert(error.message);
      },
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

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
        <ActivityIndicator size={"large"} color={colorPalette.black} />
      </SafeAreaView>
    );
  }

  if (!session) {
    return <Redirect href={"/(auth)/signin"} />;
  }

  return (
    <View
      style={{ backgroundColor: "white", flexGrow: 1, paddingHorizontal: 20 }}
    >
      <View style={{ marginBottom: 10 }}>
        <TextInput
          placeholder="Enter your full name"
          value={fullName}
          onChangeText={(value) => setFullName(value)}
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colorPalette.orange }]}
          onPress={onSubmit}
        >
          <Text
            style={[
              styles.textNormal,
              styles.fontWeightBold,
              { textTransform: "uppercase" },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator size={"small"} color={colorPalette.black} />
            ) : (
              "UPDATE PROFILE"
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colorPalette.lightRed }]}
        onPress={() => supabase.auth.signOut()}
      >
        <Text
          style={[
            styles.textNormal,
            styles.fontWeightBold,
            { textTransform: "uppercase" },
          ]}
        >
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
