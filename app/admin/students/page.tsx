import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function AdminStudentsPage() {
  return (
    <PlaceholderPage
      title="Students"
      description="Manage student accounts and academic records."
      breadcrumbs={[{ label: "Admin" }, { label: "Students" }]}
    />
  );
}
