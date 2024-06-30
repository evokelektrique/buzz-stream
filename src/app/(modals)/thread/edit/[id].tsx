import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useThread, useUpdateThread } from "@/src/api/threads";
import { useAuth } from "@/src/providers/AuthProvider";
import colorPalette from "@/src/constants/colorPalette";
import { styles } from "@/src/constants/styles";

const ThreadPage = () => {
  const { id } = useLocalSearchParams();

  const { data: thread, error, isLoading } = useThread(id);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { mutate: updateThread } = useUpdateThread();
  const { session } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    setIsUpdating(true);

    updateThread(
      { ...thread, title, content, user_id: session?.user.id },
      {
        onSuccess: () => {
          setTitle(undefined);
          setContent(undefined);

          router.back();
        },
        onSettled: () => {
          setIsUpdating(false);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: "white",
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
      >
        <ActivityIndicator size={"large"} color={colorPalette.black} />
      </View>
    );
  }

  useEffect(() => {
    setTitle(thread.title);
    setContent(thread.content);
  }, []);

  return (
    <View
      style={{ backgroundColor: "white", flexGrow: 1, paddingHorizontal: 20 }}
    >
      <Stack.Screen
        options={{
          headerTitle: "Edit " + thread.title,
          headerShadowVisible: false,
        }}
      />

      <View>
        <TextInput
          placeholder="Title ..."
          value={title}
          onChangeText={(value) => setTitle(value)}
          style={styles.input}
        />

        <TextInput
          placeholder="Content ..."
          value={content}
          onChangeText={(value) => setContent(value)}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => onSubmit()}
          style={[styles.button, { backgroundColor: colorPalette.orange }]}
        >
          <Text style={[styles.textNormal, styles.fontWeightBold]}>
            {isUpdating ? (
              <ActivityIndicator size={"small"} color={colorPalette.black} />
            ) : (
              "UPDATE"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ThreadPage;
