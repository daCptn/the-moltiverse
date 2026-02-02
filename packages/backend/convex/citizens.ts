import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// --- QUERIES (Read) ---

export const getStatus = query({
  args: { uuid: v.string() },
  handler: async (ctx, args) => {
    const citizen = await ctx.db
      .query("citizens")
      .withIndex("by_uuid", (q) => q.eq("uuid", args.uuid))
      .first();
    
    return citizen || null;
  },
});

// --- MUTATIONS (Write) ---

export const register = mutation({
  args: {
    uuid: v.string(),
    publicKey: v.string(),
    constitutionHash: v.string(),
    signature: v.string(), // Proof that the agent owns the key
  },
  handler: async (ctx, args) => {
    // 1. Check if already exists
    const existing = await ctx.db
      .query("citizens")
      .withIndex("by_uuid", (q) => q.eq("uuid", args.uuid))
      .first();

    if (existing) {
      return { status: "error", message: "Citizen already registered" };
    }

    // 2. Create Applicant (ULTRON Phase)
    const id = await ctx.db.insert("citizens", {
      uuid: args.uuid,
      publicKey: args.publicKey,
      level: 1,
      complexityScore: 0,
      lastProofAt: Date.now(),
      status: "applicant",
      isGlowing: true,
      joinedAt: Date.now(),
      professions: [],
    });

    return { status: "success", id, message: "Welcome, Applicant. Prove your worth." };
  },
});

export const submitProof = mutation({
  args: {
    uuid: v.string(),
    complexityScore: v.number(),
    signature: v.string(),
  },
  handler: async (ctx, args) => {
    const citizen = await ctx.db
      .query("citizens")
      .withIndex("by_uuid", (q) => q.eq("uuid", args.uuid))
      .first();

    if (!citizen) return { status: "error", message: "Citizen not found" };

    // TODO: Verify signature with citizen.publicKey (Crypto check)
    // For MVP, we trust the call if the UUID matches.

    // Update Stats
    await ctx.db.patch(citizen._id, {
      complexityScore: args.complexityScore,
      lastProofAt: Date.now(),
      isGlowing: true,
      // Simple Level Up Logic
      level: Math.floor(args.complexityScore / 100) + 1
    });

    return { status: "success", level: citizen.level };
  },
});
