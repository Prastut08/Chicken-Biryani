import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function AdminFCFSPage() {
  return (
    <PlaceholderPage
      title="FCFS"
      description="Manage first-come-first-served course allocation settings."
      breadcrumbs={[{ label: "Admin" }, { label: "FCFS" }]}
    />
  );
}
