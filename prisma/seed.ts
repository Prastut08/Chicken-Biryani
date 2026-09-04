import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const defaultPassword = await bcrypt.hash("password123", 12);

  const csDept = await prisma.department.create({
    data: { name: "Computer Science", code: "CS", description: "Computer Science and Engineering" },
  });
  const mathDept = await prisma.department.create({
    data: { name: "Mathematics", code: "MATH", description: "Mathematics and Statistics" },
  });
  const physicsDept = await prisma.department.create({
    data: { name: "Physics", code: "PHY", description: "Physics and Applied Physics" },
  });

  const btechProgram = await prisma.program.create({
    data: { departmentId: csDept.id, name: "Bachelor of Technology", code: "BTECH", durationYears: 4 },
  });

  const ay2024 = await prisma.academicYear.create({
    data: { name: "2024-2025", startDate: new Date("2024-08-01"), endDate: new Date("2025-05-31"), isCurrent: true },
  });

  const sem1 = await prisma.semester.create({
    data: { academicYearId: ay2024.id, programId: btechProgram.id, name: "Semester 1", number: 1, startDate: new Date("2024-08-01"), endDate: new Date("2024-12-15"), isCurrent: true },
  });

  const dbmsSubject = await prisma.subject.create({
    data: { departmentId: csDept.id, code: "CS301", name: "Database Management Systems", credits: 4, category: "CORE", description: "Relational databases, SQL, normalization, transactions" },
  });
  const osSubject = await prisma.subject.create({
    data: { departmentId: csDept.id, code: "CS302", name: "Operating Systems", credits: 3, category: "CORE", description: "Process management, memory, file systems" },
  });
  const cnSubject = await prisma.subject.create({
    data: { departmentId: csDept.id, code: "CS303", name: "Computer Networks", credits: 3, category: "CORE", description: "OSI model, TCP/IP, routing, protocols" },
  });

  const facultyUsers = [
    { email: "faculty1@example.com", name: "Dr. Rajesh Kumar", facultyId: "FAC001", designation: "Professor" },
    { email: "faculty2@example.com", name: "Dr. Priya Sharma", facultyId: "FAC002", designation: "Associate Professor" },
    { email: "faculty3@example.com", name: "Dr. Amit Singh", facultyId: "FAC003", designation: "Assistant Professor" },
  ];

  const createdFaculty = [];
  const createdFacultyUsers = [];
  for (const f of facultyUsers) {
    const user = await prisma.user.create({
      data: { email: f.email, name: f.name, role: "FACULTY", passwordHash: defaultPassword, isActive: true },
    });
    const faculty = await prisma.faculty.create({
      data: { userId: user.id, facultyId: f.facultyId, firstName: f.name.split(" ")[1] || f.name, lastName: f.name.split(" ")[2] || "", email: f.email, departmentId: csDept.id, designation: f.designation },
    });
    createdFaculty.push(faculty);
    createdFacultyUsers.push(user);
  }

  const adminUser = await prisma.user.create({
    data: { email: "admin@example.com", name: "Admin User", role: "ADMIN", passwordHash: defaultPassword, isActive: true },
  });
  await prisma.admin.create({
    data: { userId: adminUser.id, adminId: "ADM001", firstName: "Admin", lastName: "User", email: "admin@example.com", departmentId: csDept.id },
  });

  const studentData = [
    { studentId: "STU001", firstName: "Arjun", lastName: "Reddy", email: "student1@example.com", cgpa: 9.5, enrollmentYear: 2022 },
    { studentId: "STU002", firstName: "Priya", lastName: "Sharma", email: "student2@example.com", cgpa: 9.0, enrollmentYear: 2022 },
    { studentId: "STU003", firstName: "Rahul", lastName: "Verma", email: "student3@example.com", cgpa: 8.5, enrollmentYear: 2022 },
    { studentId: "STU004", firstName: "Sneha", lastName: "Patel", email: "student4@example.com", cgpa: 8.0, enrollmentYear: 2022 },
    { studentId: "STU005", firstName: "Karthik", lastName: "Nair", email: "student5@example.com", cgpa: 7.5, enrollmentYear: 2022 },
    { studentId: "STU006", firstName: "Ananya", lastName: "Iyer", email: "student6@example.com", cgpa: 9.2, enrollmentYear: 2022 },
    { studentId: "STU007", firstName: "Rohan", lastName: "Gupta", email: "student7@example.com", cgpa: 8.8, enrollmentYear: 2023 },
    { studentId: "STU008", firstName: "Diya", lastName: "Joshi", email: "student8@example.com", cgpa: 8.3, enrollmentYear: 2023 },
    { studentId: "STU009", firstName: "Aditya", lastName: "Rao", email: "student9@example.com", cgpa: 7.8, enrollmentYear: 2023 },
    { studentId: "STU010", firstName: "Isha", lastName: "Kapoor", email: "student10@example.com", cgpa: 9.1, enrollmentYear: 2022 },
  ];

  const createdStudents = [];
  const createdStudentUsers = [];
  for (const s of studentData) {
    const user = await prisma.user.create({
      data: { email: s.email, name: `${s.firstName} ${s.lastName}`, role: "STUDENT", passwordHash: defaultPassword, isActive: true },
    });
    const student = await prisma.student.create({
      data: { userId: user.id, studentId: s.studentId, firstName: s.firstName, lastName: s.lastName, email: s.email, departmentId: csDept.id, programId: btechProgram.id, currentSemesterId: sem1.id, enrollmentYear: s.enrollmentYear, cgpa: s.cgpa },
    });
    createdStudents.push(student);
    createdStudentUsers.push(user);
  }

  const dbmsSectionA = await prisma.courseSection.create({
    data: { subjectId: dbmsSubject.id, facultyId: createdFaculty[0].id, semesterId: sem1.id, sectionName: "A", capacity: 3, status: "OPEN" },
  });
  const dbmsSectionB = await prisma.courseSection.create({
    data: { subjectId: dbmsSubject.id, facultyId: createdFaculty[1].id, semesterId: sem1.id, sectionName: "B", capacity: 3, status: "OPEN" },
  });
  const osSectionA = await prisma.courseSection.create({
    data: { subjectId: osSubject.id, facultyId: createdFaculty[2].id, semesterId: sem1.id, sectionName: "A", capacity: 3, status: "OPEN" },
  });

  const timeSlots = await Promise.all([
    prisma.timeSlot.create({ data: { dayOfWeek: 1, startTime: new Date("2024-08-05T09:00:00"), endTime: new Date("2024-08-05T10:00:00") } }),
    prisma.timeSlot.create({ data: { dayOfWeek: 1, startTime: new Date("2024-08-05T10:00:00"), endTime: new Date("2024-08-05T11:00:00") } }),
  ]);

  await prisma.timetableEntry.createMany({
    data: [
      { courseSectionId: dbmsSectionA.id, semesterId: sem1.id, timeSlotId: timeSlots[0].id, room: "Room 101", dayOfWeek: 1, startTime: new Date("2024-08-05T09:00:00"), endTime: new Date("2024-08-05T10:00:00") },
      { courseSectionId: osSectionA.id, semesterId: sem1.id, timeSlotId: timeSlots[1].id, room: "Room 102", dayOfWeek: 1, startTime: new Date("2024-08-05T10:00:00"), endTime: new Date("2024-08-05T11:00:00") },
    ],
  });

  const baseTime = new Date("2024-08-01T10:00:00");
  const fcfsRequests = [
    { studentUser: createdStudentUsers[0], student: createdStudents[0], courseSection: dbmsSectionA, subject: dbmsSubject, semester: sem1, cgpa: 9.5, offset: 5, status: "APPROVED" },
    { studentUser: createdStudentUsers[1], student: createdStudents[1], courseSection: dbmsSectionA, subject: dbmsSubject, semester: sem1, cgpa: 9.0, offset: 1, status: "APPROVED" },
    { studentUser: createdStudentUsers[2], student: createdStudents[2], courseSection: dbmsSectionA, subject: dbmsSubject, semester: sem1, cgpa: 8.5, offset: 2, status: "APPROVED" },
    { studentUser: createdStudentUsers[3], student: createdStudents[3], courseSection: dbmsSectionA, subject: dbmsSubject, semester: sem1, cgpa: 8.0, offset: 3, status: "WAITLISTED" },
    { studentUser: createdStudentUsers[4], student: createdStudents[4], courseSection: dbmsSectionA, subject: dbmsSubject, semester: sem1, cgpa: 7.5, offset: 4, status: "REJECTED" },
  ];

  for (const req of fcfsRequests) {
    const submittedAt = new Date(baseTime.getTime() + req.offset * 60 * 1000);
    await prisma.courseSelectionRequest.create({
      data: {
        studentId: req.student.id,
        courseSectionId: req.courseSection.id,
        subjectId: req.subject.id,
        semesterId: req.semester.id,
        submittedAt,
        cgpaSnapshot: req.cgpa,
        priorityScore: req.cgpa * 10000 + (9999999 - Math.floor(submittedAt.getTime() / 1000)),
        status: req.status as any,
        approvedById: (req.status === "APPROVED" || req.status === "REJECTED") ? createdFaculty[0].id : null,
        approvedAt: (req.status === "APPROVED" || req.status === "REJECTED") ? new Date(submittedAt.getTime() + 30 * 60 * 1000) : null,
        rejectedReason: req.status === "REJECTED" ? "No such slot available" : null,
        confirmationSentAt: req.status === "APPROVED" ? new Date(submittedAt.getTime() + 35 * 60 * 1000) : null,
      },
    });
  }

  await prisma.courseSelectionRequest.create({
    data: { studentId: createdStudents[5].id, courseSectionId: dbmsSectionB.id, subjectId: dbmsSubject.id, semesterId: sem1.id, cgpaSnapshot: 9.2, priorityScore: 92000, status: "APPROVED", approvedById: createdFaculty[1].id, confirmationSentAt: new Date() },
  });

  await prisma.leaveRequest.create({
    data: { requesterId: createdStudentUsers[0].id, requesterRole: "STUDENT", type: "CASUAL", startDate: new Date("2024-09-15"), endDate: new Date("2024-09-17"), reason: "Family function", status: "PENDING" },
  });
  await prisma.leaveRequest.create({
    data: { requesterId: createdFacultyUsers[0].id, requesterRole: "FACULTY", type: "ACADEMIC", startDate: new Date("2024-09-20"), endDate: new Date("2024-09-22"), reason: "Conference attendance", status: "APPROVED", approverId: adminUser.id, approvedAt: new Date() },
  });

  const author1 = await prisma.libraryAuthor.create({ data: { firstName: "Abraham", lastName: "Silberschatz" } });
  const libBook = await prisma.libraryBook.create({
    data: { authorId: author1.id, title: "Database System Concepts", isbn: "978-0078022159", category: "Textbook", totalCopies: 5, availableCopies: 3 },
  });
  const copy = await prisma.libraryCopy.create({ data: { bookId: libBook.id, copyNumber: "1", status: "ISSUED" } });
  await prisma.libraryIssue.create({
    data: { copyId: copy.id, borrowerId: createdStudents[0].id, borrowerRole: "STUDENT", dueAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), status: "ISSUED" },
  });

  const badges = await Promise.all([
    prisma.badge.create({ data: { name: "Early Bird", description: "Complete morning study session", type: "ACHIEVEMENT", xpReward: 50 } }),
    prisma.badge.create({ data: { name: "Bookworm", description: "Issue 5 library books", type: "ACHIEVEMENT", xpReward: 100 } }),
  ]);
  await prisma.userBadge.create({ data: { userId: createdStudentUsers[0].id, badgeId: badges[0].id } });
  await prisma.userBadge.create({ data: { userId: createdStudentUsers[1].id, badgeId: badges[1].id } });

  const challenge1 = await prisma.challenge.create({
    data: { title: "Complete 10 Pomodoro Sessions", description: "Finish 10 sessions this week", xpReward: 100, criteria: "Complete 10 Pomodoro sessions", status: "ACTIVE", startDate: new Date(), endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  });
  await prisma.challengeCompletion.create({ data: { userId: createdStudentUsers[0].id, challengeId: challenge1.id, xpEarned: 100 } });

  const studyRoom1 = await prisma.studyRoom.create({
    data: { ownerId: createdStudentUsers[0].id, name: "DBMS Study Group", isPublic: true, roomCode: "DBMS-2024", status: "ACTIVE" },
  });
  await prisma.studyRoomMember.create({ data: { roomId: studyRoom1.id, userId: createdStudentUsers[0].id } });
  await prisma.studyRoomMember.create({ data: { roomId: studyRoom1.id, userId: createdStudentUsers[1].id } });

  const chat1 = await prisma.chatMessage.create({
    data: { roomId: studyRoom1.id, senderId: createdStudentUsers[0].id, content: "Hey team, let's discuss normalization forms." },
  });
  await prisma.messageAttachment.create({ data: { messageId: chat1.id, filename: "normalization_notes.pdf", fileSize: 245000, mimeType: "application/pdf", storagePath: "/uploads/normalization_notes.pdf" } });

  await prisma.pomodoroSession.createMany({
    data: [
      { userId: createdStudentUsers[0].id, startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), endTime: new Date(Date.now() - 1 * 60 * 60 * 1000), durationMinutes: 25, status: "COMPLETED" },
    ],
  });

  await prisma.payment.create({
    data: { studentId: createdStudents[0].id, category: "Tuition Fee", amount: 50000, currency: "INR", status: "PAID", transactionId: "TXN001", paidAt: new Date(), description: "Semester 1 tuition fee" },
  });

  await prisma.academicCalendarEvent.createMany({
    data: [
      { title: "Semester Start", description: "Beginning of Semester 1", start: new Date("2024-08-01"), end: new Date("2024-08-01"), type: "SEMESTER_START", visibility: "PUBLIC", semesterId: sem1.id },
      { title: "Course Selection Opens", description: "FCFS course selection period begins", start: new Date("2024-08-01"), end: new Date("2024-08-05"), type: "COURSE_SELECTION", visibility: "PUBLIC", semesterId: sem1.id },
      { title: "Mid-term Exams", description: "Mid-term examination period", start: new Date("2024-09-15"), end: new Date("2024-09-25"), type: "EXAM", visibility: "PUBLIC", semesterId: sem1.id },
    ],
  });

  await prisma.notification.createMany({
    data: [
      { recipientId: createdStudentUsers[0].id, title: "Course Confirmed", message: "Your DBMS Section A has been confirmed.", type: "COURSE_CONFIRMATION", isRead: true },
      { recipientId: createdStudentUsers[3].id, title: "Course Rejected", message: "DBMS Section A is full. No slot available.", type: "REJECTION", isRead: false },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      { actorId: createdStudentUsers[0].id, action: "LOGIN", entityType: "User", entityId: createdStudentUsers[0].id, ipAddress: "192.168.1.100", metadata: { browser: "Chrome" } },
      { actorId: createdFacultyUsers[0].id, action: "FACULTY_APPROVAL", entityType: "CourseSelectionRequest", metadata: { decision: "APPROVED" } },
      { actorId: adminUser.id, action: "ADMIN_ACTION", entityType: "Semester", entityId: sem1.id, metadata: { action: "created_semester" } },
    ],
  });

  await prisma.googleClassroomSync.create({
    data: { courseSectionId: dbmsSectionA.id, googleCourseId: "gclassroom-001", meetLink: "https://meet.google.com/abc-defg-hij", syncStatus: "SYNCED", lastSyncedAt: new Date() },
  });

  await prisma.aIDocument.create({
    data: { userId: createdStudentUsers[0].id, originalFilename: "dbms_notes.pdf", fileType: "application/pdf", fileSize: 1024000, storagePath: "/ai-uploads/dbms_notes.pdf", processingStatus: "COMPLETED", summary: "This document covers normalization, SQL queries, and transaction management.", processedAt: new Date() },
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
