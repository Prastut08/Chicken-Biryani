import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function FacultyProfilePage() {
  return (
    <PlaceholderPage
      title="Profile"
      description="View and manage your faculty profile."
      breadcrumbs={[{ label: "Faculty" }, { label: "Profile" }]}
    />
  );
}
