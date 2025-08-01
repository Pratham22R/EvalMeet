import { v } from "convex/values";
import { mutation , query} from "./_generated/server";

export const syncUser = mutation({
    args:{
        clerkId: v.string(),
        email: v.string(),
        name: v.string(),
        image: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db.query("users").filter(q => q.eq(q.field("clerkId"), args.clerkId)).first();
        if (existingUser) {
            return existingUser; 
        }
        return await ctx.db.insert("users", {
            ...args,
            role:"interviewer",
        });
    }
})

export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("User is not authenticated");

    const users = await ctx.db.query("users").collect();

    return users;
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    return user;
  },
});