import { apiRequest } from "./api";

// true = use temporary mock data
// false = connect to backend API
const USE_MOCK_DATA = true;

const mockStudentData = {
  profile: {
    studentId: "S001",
    username: "Jia Yen",
  },

  volunteer: {
    progress: 60,
    totalHours: 20,
    ongoingProgramme: "UM Campus Cleanup & Recycling",
    organization: "Sukarelawan UM",
    completedCount: 6,

    hoursByMonth: [
      { month: "Jan", hours: 16 },
      { month: "Feb", hours: 8 },
      { month: "Mar", hours: 20 },
      { month: "Apr", hours: 15 },
      { month: "May", hours: 10 },
    ],

    records: [
      {
        id: 1,
        name: "Gotong-royong 1",
        organization: "Sukarelawan UM",
        date: "2026-11-10",
        hours: 4,
        icon: "🌳",
        status: "Completed",
      },
      {
        id: 2,
        name: "Blood Donation 1",
        organization: "Sukarelawan UM",
        date: "2026-10-25",
        hours: 3,
        icon: "🩸",
        status: "Completed",
      },
      {
        id: 3,
        name: "Blood Donation 2",
        organization: "Sukarelawan UM",
        date: "2026-10-12",
        hours: 3,
        icon: "🩸",
        status: "Completed",
      },
    ],
  },

  learning: {
    progress: 0,
    totalHours: 0,
    ongoingProgramme: null,
    organization: null,
    completedCount: 0,

    hoursByMonth: [
      { month: "Jan", hours: 0 },
      { month: "Feb", hours: 0 },
      { month: "Mar", hours: 0 },
      { month: "Apr", hours: 0 },
      { month: "May", hours: 0 },
    ],

    records: [],
  },
};

// Get current student's dashboard information
export const getStudentDashboardData = async () => {
  if (USE_MOCK_DATA) {
    return mockStudentData;
  }

  const [profile, volunteer, learning] = await Promise.all([
    apiRequest("/students/me"),
    apiRequest("/students/me/volunteering"),
    apiRequest("/students/me/learning"),
  ]);

  return {
    profile,
    volunteer,
    learning,
  };
};
