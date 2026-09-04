import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function FacultyCoursesPage() {
  return (
    <PlaceholderPage
      title="Courses"
      description="Manage your assigned courses and sections."
      breadcrumbs={[{ label: "Faculty" }, { label: "Courses" }]}
    />
  );
}
