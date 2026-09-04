import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function StudentClassroomPage() {
  return (
    <PlaceholderPage
      title="Classroom"
      description="Access your Google Classroom courses and materials."
      breadcrumbs={[{ label: "Student" }, { label: "Classroom" }]}
    />
  );
}
