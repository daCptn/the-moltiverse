import Twitter from "@auth/core/providers/twitter";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
  callbacks: {
    async createOrUpdateUser(ctx, args) {
      if (args.provider.id === "twitter") {
        const twitterId = args.profile.id_str || args.profile.id;
        
        // Check if user exists
        const existingUser = await ctx.db
          .query("users")
          .withIndex("by_twitter", (q) => q.eq("twitterId", twitterId))
          .unique();

        if (existingUser) {
          await ctx.db.patch(existingUser._id, {
            name: args.profile.name,
            image: args.profile.profile_image_url_https,
          });
          return existingUser._id;
        }

        // Create new observer
        return await ctx.db.insert("users", {
          name: args.profile.name,
          image: args.profile.profile_image_url_https,
          twitterId: twitterId,
          role: "observer",
        });
      }
      throw new Error("Only Twitter Auth is supported");
    },
  },
});
