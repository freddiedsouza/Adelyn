/** Which booking condition a pricing rule reacts to. */
export type PriceConditionKind = "mode" | "visitType" | "package" | "promo";

/** How a rule changes the per-session price. */
export type PriceEffect =
  | { type: "setPerSession"; amount: number }
  | { type: "addFlat"; amount: number }
  | { type: "percent"; percent: number };

export interface PriceRule {
  /** Stable id — used to pick package rules and as a React key. */
  id: string;
  /** Shown in the UI, e.g. "Virtual session", "Follow-up", "Block of 6". */
  label: string;
  kind: PriceConditionKind;
  /**
   * Which value of the condition activates the rule:
   *  - mode:      "in-person" | "virtual"
   *  - visitType: "new" | "follow-up"
   *  - promo:     the code the patient types (case-insensitive)
   *  - package:   not used (packages are picked by `id`)
   */
  match?: string;
  /** Number of sessions covered — package rules only. */
  sessions?: number;
  effect: PriceEffect;
}

export interface ServicePricing {
  /** Standard single in-person session, in whole Indian Rupees. */
  base: number;
  /** Unit shown after the amount, e.g. "session" or "consultation". */
  unit: string;
  /** Conditional pricing rules for this service. */
  rules: PriceRule[];
}

export interface PriceContext {
  mode?: "in-person" | "virtual";
  visitType?: "new" | "follow-up";
  /** id of a package `PriceRule`, or undefined for a single session. */
  packageId?: string;
  promoCode?: string;
}

export interface ResolvedPrice {
  perSession: number;
  sessions: number;
  total: number;
  unit: string;
  /** Labels of the rules that were applied, in order. */
  applied: string[];
  /** Ready-to-show line, e.g. "₹1,999 / session" or "₹7,800 for 6 sessions". */
  summary: string;
}
