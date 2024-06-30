import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";

export const useThreadList = () => {
  return useQuery({
    queryKey: ["threads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads")
        .select("*, profiles (*)")
        .order("created_at", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useThread = (id: any) => {
  return useQuery({
    queryKey: ["threads", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threads")
        .select("*, profiles(*)")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useInsertThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newThread } = await supabase
        .from("threads")
        .insert({
          title: data.title,
          content: data.content,
          user_id: data.user_id,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return newThread;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
    async onError(error) {
      Alert.alert(error.message);
    },
  });
};

export const useUpdateThread = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  const user_id = session?.user.id;

  return useMutation({
    async mutationFn({ id, ...data }: any) {
      const { error, data: newThread } = await supabase
        .from("threads")
        .update({
          title: data.title,
          content: data.content,
        })
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return newThread;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      await queryClient.invalidateQueries({ queryKey: ["threads", id] });
    },
    async onError(error) {
      console.log(error);
    },
  });
};

export const useRemoveThread = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: any) {
      await supabase.from("threads").delete().eq("id", id);
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
};
