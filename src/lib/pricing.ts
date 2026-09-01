import { servicePricing } from "@/data/pricing";
import { formatPrice } from "@/lib/currency";
import type {
  PriceContext,
  PriceRule,
  ResolvedPrice,
  ServicePricing,
} from "@/types/pricing";

const EMPTY_PRICING: ServicePricing = { base: 0, unit: "session", rules: [] };

export function getServicePricing(serviceId: string): ServicePricing {
  return servicePricing[serviceId] ?? EMPTY_PRICING;
}

/** Package rules available for a service, for a "single vs block" selector. */
export function getPackageRules(serviceId: string): PriceRule[] {
  return getServicePricing(serviceId).rules.filter(
    (rule) => rule.kind === "package",
  );
}

function applyEffect(price: number, rule: PriceRule): number {
  switch (rule.effect.type) {
    case "setPerSession":
      return rule.effect.amount;
    case "addFlat":
      return price + rule.effect.amount;
    case "percent":
      return price * (1 + rule.effect.percent / 100);
    default:
      return price;
  }
}

/**
 * Resolves the final price for a service given the booking conditions.
 * Order: mode & visit-type adjust the per-session price, a package then
 * overrides it and sets the session count, and a promo applies last.
 */
export function resolveServicePrice(
  serviceId: string,
  context: PriceContext = {},
): ResolvedPrice {
  const { base, unit, rules } = getServicePricing(serviceId);
  let perSession = base;
  let sessions = 1;
  const applied: string[] = [];

  for (const rule of rules) {
    if (rule.kind === "mode" && context.mode && rule.match === context.mode) {
      perSession = applyEffect(perSession, rule);
      applied.push(rule.label);
    }
    if (
      rule.kind === "visitType" &&
      context.visitType &&
      rule.match === context.visitType
    ) {
      perSession = applyEffect(perSession, rule);
      applied.push(rule.label);
    }
  }

  if (context.packageId) {
    const pkg = rules.find(
      (rule) => rule.kind === "package" && rule.id === context.packageId,
    );
    if (pkg?.sessions) {
      perSession = applyEffect(perSession, pkg);
      sessions = pkg.sessions;
      applied.push(pkg.label);
    }
  }

  if (context.promoCode) {
    const code = context.promoCode.trim().toUpperCase();
    const promo = rules.find(
      (rule) => rule.kind === "promo" && rule.match?.toUpperCase() === code,
    );
    if (promo) {
      perSession = applyEffect(perSession, promo);
      applied.push(promo.label);
    }
  }

  perSession = Math.max(0, Math.round(perSession));
  const total = perSession * sessions;
  const summary =
    sessions === 1
      ? `${formatPrice(perSession)} / ${unit}`
      : `${formatPrice(total)} for ${sessions} sessions (${formatPrice(
          perSession,
        )} / ${unit})`;

  return { perSession, sessions, total, unit, applied, summary };
}

/** Lowest single-session price across modes — for catalogue cards. */
export function priceFrom(serviceId: string): string {
  const pricing = getServicePricing(serviceId);
  const candidates = [
    resolveServicePrice(serviceId, {}).perSession,
    resolveServicePrice(serviceId, { mode: "in-person" }).perSession,
    resolveServicePrice(serviceId, { mode: "virtual" }).perSession,
  ];
  return `From ${formatPrice(Math.min(...candidates))} / ${pricing.unit}`;
}
