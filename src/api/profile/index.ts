import { supabase } from "@/src/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProfile = (id: any) => {
  return useQuery({
    queryKey: ["profiles", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({ id, ...data }: any) {
      const { error, data: newProfile } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(error.message);
      }

      return newProfile;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["threads"] });
      await queryClient.invalidateQueries({ queryKey: ["profiles", id] });
    },
    async onError(error) {
      console.log(error);
    },
  });
};
