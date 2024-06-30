import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { useInsertThread } from "@/src/api/threads";
import colorPalette from "@/src/constants/colorPalette";
import { styles } from "@/src/constants/styles";

const New = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: insertThread } = useInsertThread();
  const { session } = useAuth();
  const router = useRouter();

  const onSubmit = async () => {
    setIsLoading(true);

    const data = {
      title,
      content,
      user_id: session?.user.id,
    };

    insertThread(data, {
      onSuccess: () => {
        router.back();
      },
      onSettled: () => {
        setIsLoading(false);
        setTitle(undefined);
        setContent(undefined);
      },
    });
  };

  return (
    <View
      style={{ backgroundColor: "white", flexGrow: 1, paddingHorizontal: 20 }}
    >
      <TextInput
        placeholder="Enter Title"
        value={title}
        onChangeText={(value) => setTitle(value)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Content"
        value={content}
        onChangeText={(value) => setContent(value)}
        style={styles.input}
      />

      <TouchableOpacity
        onPress={() => onSubmit()}
        style={[styles.button, { backgroundColor: colorPalette.orange }]}
      >
        <Text style={[styles.textNormal, styles.fontWeightBold]}>
          {isLoading ? (
            <ActivityIndicator size={"small"} color={colorPalette.black} />
          ) : (
            "PUBLISH"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default New;
