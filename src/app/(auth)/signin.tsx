import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import { styles } from "@/src/constants/styles";
import colorPalette from "@/src/constants/colorPalette";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signInWithPassword = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert("Error", error.message);
    }

    setIsLoading(false);
  };

  return (
    <View style={[styles.wrapper, styles.wrapperOrange]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 50,
          gap: 5,
        }}
      >
        <Image
          source={require("@/assets/images/logos/logo-black-32x32.png")}
          width={256}
          height={256}
          style={{ maxWidth: 60, objectFit: "contain" }}
        />
        <Text
          style={{
            fontFamily: "DMSans",
            fontWeight: "bold",
            fontSize: 32,
            color: colorPalette.black,
          }}
        >
          BUZZ STREAM
        </Text>
      </View>

      <View style={{ marginBottom: 8 }}>
        <TextInput
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Password"
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
          style={styles.input}
        />
      </View>

      <TouchableOpacity
        disabled={isLoading}
        onPress={signInWithPassword}
        style={[styles.button, { backgroundColor: colorPalette.white }]}
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
            "Sign In"
          )}
        </Text>
      </TouchableOpacity>

      <View
        style={{
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            top: 20,
            height: 2,
            backgroundColor: colorPalette.black,
            width: "100%",
          }}
        ></View>
        <View
          style={{
            zIndex: 2,
            marginTop: 10,
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              styles.textNormal,
              styles.fontWeightBold,
              {
                backgroundColor: colorPalette.orange,
                textAlign: "center",
                paddingHorizontal: 10,
              },
            ]}
          >
            OR
          </Text>
        </View>
      </View>

      <Link
        href={"(auth)/signup"}
        style={[
          styles.button,
          styles.textNormal,
          styles.fontWeightBold,
          {
            textTransform: "uppercase",
            backgroundColor: colorPalette.darkOrange,
          },
        ]}
      >
        Create Account
      </Link>
    </View>
  );
};

export default SignIn;
