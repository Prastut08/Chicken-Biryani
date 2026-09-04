import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function StudentLibraryPage() {
  return (
    <PlaceholderPage
      title="Library"
      description="Browse books, manage issues, and explore resources."
      breadcrumbs={[{ label: "Student" }, { label: "Library" }]}
    />
  );
}
