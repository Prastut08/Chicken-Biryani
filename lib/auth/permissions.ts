export const permissions = {
  student: {
    label: "Student",
    description: "Access to student portal and academic tools",
    routes: ["/student"],
    permissions: [
      "view_own_profile",
      "view_own_academic_data",
      "select_courses",
      "view_own_timetable",
      "access_own_classroom",
      "submit_leave",
      "use_library",
      "use_summarizer",
      "use_pomodoro",
      "use_study_rooms",
      "participate_challenges",
    ] as const,
  },
  faculty: {
    label: "Faculty",
    description: "Access to faculty portal and course management",
    routes: ["/faculty"],
    permissions: [
      "view_own_profile",
      "view_assigned_courses",
      "view_own_timetable",
      "manage_classroom",
      "approve_course_requests",
      "submit_leave",
      "view_student_info",
    ] as const,
  },
  admin: {
    label: "Admin",
    description: "Full platform administration access",
    routes: ["/admin"],
    permissions: [
      "manage_students",
      "manage_faculty",
      "manage_departments",
      "manage_programs",
      "manage_subjects",
      "manage_course_sections",
      "manage_capacities",
      "manage_academic_structures",
      "manage_fcfs",
      "view_audit",
      "manage_payments",
      "manage_platform_settings",
    ] as const,
  },
} as const;

export type Role = keyof typeof permissions;
export type Permission = string;

const permissionSets: Record<Role, Set<string>> = {
  student: new Set(permissions.student.permissions),
  faculty: new Set(permissions.faculty.permissions),
  admin: new Set(permissions.admin.permissions),
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return permissionSets[role].has(permission);
}

export function canAccessRoute(role: Role, route: string): boolean {
  return permissions[role].routes.some((allowedRoute) => route.startsWith(allowedRoute));
}

export function getAllPermissionsForRole(role: Role): readonly string[] {
  return permissions[role].permissions;
}
