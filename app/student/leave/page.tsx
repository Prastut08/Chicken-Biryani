import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function StudentLeavePage() {
  return (
    <PlaceholderPage
      title="Leave"
      description="Submit and track leave requests."
      breadcrumbs={[{ label: "Student" }, { label: "Leave" }]}
    />
  );
}
