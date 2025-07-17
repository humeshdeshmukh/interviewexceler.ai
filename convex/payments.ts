import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";

export const createPayment = mutation({
  args: {
    userId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx: any, args: { userId: string; amount: number }) => {
    const payment = await ctx.db.insert("payments", {
      userId: args.userId,
      amount: args.amount,
      createdAt: Date.now(),
    });
    return payment;
  },
});

export const getPaymentsByUser = query({
  args: { userId: v.string() },
  handler: async (ctx: any, args: { userId: string }) => {
    return await ctx.db
      .query("payments")
      .filter((q: any) => q.eq(q.field("userId"), args.userId))
      .collect();
  },
});
