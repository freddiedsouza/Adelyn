export type ServiceIconId =
  | "joint"
  | "recovery"
  | "sports"
  | "spine"
  | "posture";

export interface ClinicalService {
  /** URL-safe identifier, used for booking deep-links (`/book?service=<id>`). */
  id: string;
  /** Public-facing service name. */
  title: string;
  /** Detailed description of what the programme involves. */
  description: string;
  /** Typical length of a single session, e.g. "45 mins". */
  sessionDuration: string;
  /** Human-readable price / rate indicator, e.g. "From QAR 250 / session". */
  rateIndicator: string;
  /** Conditions this service commonly treats. */
  targetConditions: string[];
  /** Icon identifier resolved by the Services component. */
  icon: ServiceIconId;
}
