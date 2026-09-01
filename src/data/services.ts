import type { ClinicalService } from "@/types/service";

export const services: ClinicalService[] = [
  {
    id: "musculoskeletal-joint-pain",
    title: "Musculoskeletal & Joint Pain Rehabilitation",
    description:
      "Assessment-led treatment for painful, stiff, or unstable joints. Combines manual therapy, progressive loading, and targeted exercise to reduce pain and rebuild strength through a full range of motion.",
    sessionDuration: "45 mins",
    rateIndicator: "From QAR 250 / session",
    targetConditions: [
      "Osteoarthritis of the knee, hip, or shoulder",
      "Rotator cuff and shoulder impingement",
      "Tendinopathy (tennis elbow, Achilles, patellar)",
      "Recurrent ankle sprains and joint instability",
    ],
    icon: "joint",
  },
  {
    id: "post-surgical-recovery",
    title: "Post-Surgical Recovery & Mobility Restoration",
    description:
      "Structured rehabilitation after orthopaedic surgery, following surgeon protocols. Focuses on restoring movement, controlling swelling, and safely progressing weight-bearing and function week by week.",
    sessionDuration: "60 mins",
    rateIndicator: "From QAR 300 / session",
    targetConditions: [
      "ACL and knee ligament reconstruction",
      "Total knee or hip replacement",
      "Rotator cuff repair",
      "Spinal decompression or fusion",
    ],
    icon: "recovery",
  },
  {
    id: "sports-injury-management",
    title: "Sports Injury Management & Functional Retraining",
    description:
      "Acute and return-to-sport care for active patients. Includes injury diagnosis, load management, sport-specific movement retraining, and a graded plan to return to training with reduced re-injury risk.",
    sessionDuration: "45 mins",
    rateIndicator: "From QAR 275 / session",
    targetConditions: [
      "Hamstring, calf, and groin strains",
      "Runner's knee and shin splints",
      "Ligament sprains and muscle tears",
      "Overtraining and overuse injuries",
    ],
    icon: "sports",
  },
  {
    id: "chronic-back-neck-pain",
    title: "Chronic Back & Neck Pain Care",
    description:
      "Long-term management for persistent spinal pain. Blends hands-on treatment, graded activity, and education on pain science to improve daily function and reduce reliance on medication.",
    sessionDuration: "45 mins",
    rateIndicator: "From QAR 250 / session",
    targetConditions: [
      "Chronic low back pain",
      "Cervicogenic headaches and neck stiffness",
      "Sciatica and nerve-related leg pain",
      "Disc-related and postural back pain",
    ],
    icon: "spine",
  },
  {
    id: "ergonomic-postural-correction",
    title: "Ergonomic & Postural Correction Consultation",
    description:
      "Preventive consultation for desk-based and repetitive-strain discomfort. Covers workstation setup, movement habits, and a corrective exercise routine to offload strained tissues.",
    sessionDuration: "30 mins",
    rateIndicator: "From QAR 180 / consultation",
    targetConditions: [
      "Desk-work neck and shoulder tension",
      "Repetitive strain injury (RSI)",
      "Forward-head and rounded-shoulder posture",
      "Work-related lower back fatigue",
    ],
    icon: "posture",
  },
];
