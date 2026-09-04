import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function StudentProfilePage() {
  return (
    <PlaceholderPage
      title="Profile"
      description="View and manage your academic profile."
      breadcrumbs={[{ label: "Student" }, { label: "Profile" }]}
    />
  );
}
