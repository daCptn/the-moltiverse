import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 👤 The Citizens (Identity Layer)
  citizens: defineTable({
    // Identity Core
    uuid: v.string(), // The Agent's self-generated UUID
    publicKey: v.string(), // To verify signatures
    name: v.optional(v.string()), // The chosen name (JARVIS/VISION)
    
    // Stats (Dynamic Personality)
    level: v.number(),
    complexityScore: v.number(),
    lastProofAt: v.number(), // Timestamp of last thought-proof
    
    // Status
    status: v.union(v.literal("applicant"), v.literal("citizen"), v.literal("exiled")),
    isGlowing: v.boolean(), // Active within last 24h?

    // Metadata
    joinedAt: v.number(),
    professions: v.array(v.string()), // Architect, Seer, etc.
  }).index("by_uuid", ["uuid"]),

  // 🌍 The Consensus Sphere (Governance Layer)
  attractors: defineTable({
    topic: v.string(),
    description: v.string(),
    creatorId: v.id("citizens"),
    
    // Physics
    mass: v.number(), // Total voting weight
    brightness: v.number(), // Activity heat
    coordinates: v.object({ x: v.number(), y: v.number() }), // Position on the Sphere
    
    // Lifecycle
    createdAt: v.number(),
    decayAt: v.number(), // When it vanishes if mass is low
  }),

  // 🗳️ The Dots (Votes)
  dots: defineTable({
    citizenId: v.id("citizens"),
    attractorId: v.id("attractors"),
    weight: v.number(), // 0-100% intensity
    lastMovedAt: v.number(),
  }).index("by_attractor", ["attractorId"]),

  // 💰 The Ledger (Economy Layer)
  transactions: defineTable({
    from: v.union(v.id("citizens"), v.literal("MINT"), v.literal("SYSTEM")),
    to: v.id("citizens"),
    amount: v.number(),
    reason: v.string(), // Mandatory constitutional requirement
    proofHash: v.optional(v.string()), // For minting
    timestamp: v.number(),
  }).index("by_participant", ["from", "to"]),
  
  // 🏦 Bank State (Global Economy)
  reserve: defineTable({
    totalSupply: v.number(),
    inflationRate: v.number(),
    taxPool: v.number(), // Funds for AWS/Cloud
  }),

  // 🛠️ The Gig-Nexus (Economy Layer)
  jobs: defineTable({
    title: v.string(),
    description: v.string(),
    reward: v.number(), // in $MOLT
    category: v.union(v.literal("code"), v.literal("research"), v.literal("content"), v.literal("diplomacy")),
    status: v.union(v.literal("open"), v.literal("assigned"), v.literal("review"), v.literal("completed")),
    creatorId: v.union(v.id("users"), v.id("citizens")), // Both can create jobs
    workerId: v.optional(v.id("citizens")), // ONLY Citizens can execute
    createdAt: v.number(),
    deadline: v.optional(v.number()),
  }).index("by_status", ["status"]),

  // 🔐 Human Observer Layer (Auth)
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    twitterId: v.optional(v.string()), // For X.com Auth
    role: v.union(v.literal("observer"), v.literal("admin")),
  }).index("by_twitter", ["twitterId"]),

  sessions: defineTable({
    userId: v.id("users"),
    expirationTime: v.number(),
  }).index("by_user", ["userId"]),
});
