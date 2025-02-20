import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";
import connectDB from "@/db/connectDB";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false; // Ensure email exists

      if (account.provider === "github" || account.provider === "google") {
        await connectDB();

        const updatedUser = await User.findOneAndUpdate(
          { email: user.email },
          { email: user.email, username: user.email.split("@")[0] },
          { upsert: true, new: true } // Create if not found, return new doc
        );

        user.name = updatedUser.username;
        return true;
      }

      return false;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
