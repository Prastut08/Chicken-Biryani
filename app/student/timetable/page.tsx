import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function StudentTimetablePage() {
  return (
    <PlaceholderPage
      title="Timetable"
      description="Your weekly class schedule."
      breadcrumbs={[{ label: "Student" }, { label: "Timetable" }]}
    />
  );
}
