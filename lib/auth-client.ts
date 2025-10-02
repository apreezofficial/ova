import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";

export const authClient = {
  signIn: {
    email: async ({ email, password, callbackURL }: { email: string, password: string, callbackURL: string }) => {
      console.log("Attempting to sign in:", { email, password, callbackURL });
      return { data: { user: { id: "mock-user-id" } }, error: null };
    }
  },
  signUp: {
    email: async ({ email, password, options }: { email: string, password: string, options: { data: { full_name: string } } }) => {
      console.log("Attempting to sign up:", { email, password, fullName: options.data.full_name });
      return { data: { user: { id: "mock-new-user-id" } }, error: null };
    }
  }
};
