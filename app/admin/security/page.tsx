import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function AdminSecurityPage() {
  return (
    <PlaceholderPage
      title="Security"
      description="Audit logs, security events, and access monitoring."
      breadcrumbs={[{ label: "Admin" }, { label: "Security" }]}
    />
  );
}
