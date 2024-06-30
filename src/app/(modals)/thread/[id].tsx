import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRemoveThread, useThread } from "@/src/api/threads";
import {
  IconClock,
  IconEdit,
  IconPencil,
  IconTimeDuration0,
  IconTrash,
  IconUser,
} from "@tabler/icons-react-native";
import { useAuth } from "@/src/providers/AuthProvider";
import { SafeAreaView } from "react-native-safe-area-context";
import colorPalette from "@/src/constants/colorPalette";
import { styles } from "@/src/constants/styles";

const ThreadPage = () => {
  const { id } = useLocalSearchParams();

  const { data: thread, error, isLoading } = useThread(id);
  const { mutate: removeThread } = useRemoveThread();
  const { session } = useAuth();
  const router = useRouter();
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const onSubmitRemove = (id: any) => {
    setIsRemoving(true);
    removeThread(thread.id, {
      onSettled: () => {
        setIsRemoving(false);
        router.back();
      },
    });
  };

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

  return (
    <View
      style={{ backgroundColor: "white", flexGrow: 1, paddingHorizontal: 20 }}
    >
      <Stack.Screen
        options={{
          headerTitle: thread.title ?? "",
          headerShadowVisible: false,
          headerTitleStyle: [styles.textTitle],
        }}
      />
      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 5,
          padding: 10,
          borderColor: "black",
          borderWidth: 1,
          borderBottomWidth: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              gap: 5,
            }}
          >
            <Text style={[styles.textSmall, styles.fontWeightBold]}>
              {thread.profiles.full_name ?? "-"}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginBottom: 10,
              gap: 5,
            }}
          >
            <Text style={[styles.textSmall, styles.fontWeightBold]}>
              {new Date(thread.created_at).toLocaleDateString("en-US")}
            </Text>
            <IconClock color={"black"} size={20} />
          </View>
        </View>

        <Text style={[styles.textTitle, styles.fontWeightBold]}>
          {thread.content}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        {thread.user_id === session?.user.id && (
          <Link
            href={{
              pathname: "thread/edit/[id]",
              params: { id: thread.id },
            }}
          >
            <IconEdit color={"black"} size={20} />
          </Link>
        )}

        {thread.user_id === session?.user.id && (
          <TouchableOpacity onPress={() => onSubmitRemove(thread.id)}>
            {isRemoving ? (
              <ActivityIndicator size={"small"} color={colorPalette.black} />
            ) : (
              <IconTrash color={"black"} size={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ThreadPage;
