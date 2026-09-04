import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function AdminSettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      description="Platform configuration and settings."
      breadcrumbs={[{ label: "Admin" }, { label: "Settings" }]}
    />
  );
}
