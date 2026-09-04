import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function AdminFacultyPage() {
  return (
    <PlaceholderPage
      title="Faculty"
      description="Manage faculty accounts and assignments."
      breadcrumbs={[{ label: "Admin" }, { label: "Faculty" }]}
    />
  );
}
