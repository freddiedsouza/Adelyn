/*
 ============================================================================
  CLINIC PRICING  —  this is the only file you edit to change prices.
 ============================================================================
  • All amounts are whole Indian Rupees. No paise, no "₹", no commas.
      1500  ✅        ₹1,500  ❌        1500.00  ❌
  • `base` is the standard single IN-PERSON session price.
  • Each entry in `rules` changes the price when a booking condition matches:
      kind: "mode"       match: "virtual"      → price for virtual sessions
      kind: "visitType"  match: "follow-up"    → price for follow-up sessions
      kind: "package"    sessions: 6           → per-session price in a 6-pack
      kind: "promo"      match: "WELCOME10"    → discount when that code is typed
  • effect:
      { type: "setPerSession", amount: 1200 }  → fixed per-session price
      { type: "addFlat",       amount: -200 }  → add / subtract rupees
      { type: "percent",       percent: -10 }  → percentage off (use a minus)
  • After editing, redeploy the site (or push to the connected repo) for the
    change to go live.
 ============================================================================
*/
import type { ServicePricing } from "@/types/pricing";

export const servicePricing: Record<string, ServicePricing> = {
  "musculoskeletal-joint-pain": {
    base: 1500,
    unit: "session",
    rules: [
      {
        id: "virtual",
        label: "Virtual session",
        kind: "mode",
        match: "virtual",
        effect: { type: "setPerSession", amount: 1200 },
      },
      {
        id: "follow-up",
        label: "Follow-up session",
        kind: "visitType",
        match: "follow-up",
        effect: { type: "setPerSession", amount: 1200 },
      },
      {
        id: "pack-6",
        label: "Block of 6 sessions",
        kind: "package",
        sessions: 6,
        effect: { type: "setPerSession", amount: 1300 },
      },
      {
        id: "welcome10",
        label: "WELCOME10 — 10% off",
        kind: "promo",
        match: "WELCOME10",
        effect: { type: "percent", percent: -10 },
      },
    ],
  },

  "post-surgical-recovery": {
    base: 1800,
    unit: "session",
    rules: [
      {
        id: "follow-up",
        label: "Follow-up session",
        kind: "visitType",
        match: "follow-up",
        effect: { type: "setPerSession", amount: 1500 },
      },
      {
        id: "pack-8",
        label: "Block of 8 sessions",
        kind: "package",
        sessions: 8,
        effect: { type: "setPerSession", amount: 1600 },
      },
      {
        id: "welcome10",
        label: "WELCOME10 — 10% off",
        kind: "promo",
        match: "WELCOME10",
        effect: { type: "percent", percent: -10 },
      },
    ],
  },

  "sports-injury-management": {
    base: 1600,
    unit: "session",
    rules: [
      {
        id: "virtual",
        label: "Virtual session",
        kind: "mode",
        match: "virtual",
        effect: { type: "setPerSession", amount: 1300 },
      },
      {
        id: "follow-up",
        label: "Follow-up session",
        kind: "visitType",
        match: "follow-up",
        effect: { type: "setPerSession", amount: 1300 },
      },
      {
        id: "pack-6",
        label: "Block of 6 sessions",
        kind: "package",
        sessions: 6,
        effect: { type: "setPerSession", amount: 1400 },
      },
      {
        id: "welcome10",
        label: "WELCOME10 — 10% off",
        kind: "promo",
        match: "WELCOME10",
        effect: { type: "percent", percent: -10 },
      },
    ],
  },

  "chronic-back-neck-pain": {
    base: 1500,
    unit: "session",
    rules: [
      {
        id: "virtual",
        label: "Virtual session",
        kind: "mode",
        match: "virtual",
        effect: { type: "setPerSession", amount: 1200 },
      },
      {
        id: "follow-up",
        label: "Follow-up session",
        kind: "visitType",
        match: "follow-up",
        effect: { type: "setPerSession", amount: 1200 },
      },
      {
        id: "pack-6",
        label: "Block of 6 sessions",
        kind: "package",
        sessions: 6,
        effect: { type: "setPerSession", amount: 1300 },
      },
      {
        id: "welcome10",
        label: "WELCOME10 — 10% off",
        kind: "promo",
        match: "WELCOME10",
        effect: { type: "percent", percent: -10 },
      },
    ],
  },

  "ergonomic-postural-correction": {
    base: 1200,
    unit: "consultation",
    rules: [
      {
        id: "virtual",
        label: "Virtual consultation",
        kind: "mode",
        match: "virtual",
        effect: { type: "setPerSession", amount: 1000 },
      },
      {
        id: "welcome10",
        label: "WELCOME10 — 10% off",
        kind: "promo",
        match: "WELCOME10",
        effect: { type: "percent", percent: -10 },
      },
    ],
  },
};
