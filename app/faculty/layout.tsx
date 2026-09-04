import RoleLayout from "@/components/layout/role-layout";

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return <RoleLayout allowedRoles={["faculty"]} role="faculty">{children}</RoleLayout>;
}
