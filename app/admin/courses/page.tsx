import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function AdminCoursesPage() {
  return (
    <PlaceholderPage
      title="Courses"
      description="Manage course offerings and sections."
      breadcrumbs={[{ label: "Admin" }, { label: "Courses" }]}
    />
  );
}
