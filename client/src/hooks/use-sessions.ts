import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type SessionInput } from "@shared/routes";

// Logic for tracking game sessions if needed by backend
export function useCreateSession() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: SessionInput) => {
      const res = await fetch(api.sessions.create.path, {
        method: api.sessions.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        throw new Error("Failed to create session");
      }
      
      return api.sessions.create.responses[201].parse(await res.json());
    },
    // No query key to invalidate as we don't have a list endpoint yet
    // but good practice to have the hook ready
  });
}
