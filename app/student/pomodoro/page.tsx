import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function StudentPomodoroPage() {
  return (
    <PlaceholderPage
      title="Pomodoro"
      description="Focus timer and productivity tracker."
      breadcrumbs={[{ label: "Student" }, { label: "Pomodoro" }]}
    />
  );
}
