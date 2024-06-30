import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { IconArrowRight } from "@tabler/icons-react-native";
import { styles } from "../constants/styles";

const ThreadRow = ({ thread }: any) => {
  return (
    <Link
      style={{
        backgroundColor: "white",
        marginTop: 10,
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 4,
      }}
      href={{
        pathname: "/(modals)/thread/[id]",
        params: { id: thread.id },
      }}
    >
      <View>
        {thread.profiles.full_name && (
          <Text style={[styles.textSmall, styles.fontWeightBold]}>
            {thread.profiles.full_name}
          </Text>
        )}
        <Text style={[styles.textTitle]}>{thread.title}</Text>
      </View>
    </Link>
  );
};

export default ThreadRow;
