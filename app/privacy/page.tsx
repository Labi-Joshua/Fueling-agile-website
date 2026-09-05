// Privacy Policy page, linked from the footer's legal row.
import type { Metadata } from "next";
import PrivacyPolicy from "@/components/ui/PrivacyPolicy";
import { privacyPolicyContent } from "@/data/mockContent";

export const metadata: Metadata = {
  title: "Privacy Policy — Fueling Agile Nigeria",
  description: "How Fueling Agile Solutions collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return <PrivacyPolicy content={privacyPolicyContent} />;
}
