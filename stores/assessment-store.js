import { create } from 'zustand';

const mockAssessment = {
  id: "1",
  judul: "Leadership Assessment",
  materi: "Leadership Skills Evaluation",
  metodePelaksanaan: "online",
  linkOnline: "https://meet.google.com/abc-defg-hij",
  schedule: "2024-03-25T10:00:00Z",
  startTime: "10:00",
  endTime: "12:00",
  evaluators: [
    { id: 1, name: "Dr. John Smith", jabatan: "Senior Evaluator", avatar: "" },
    { id: 2, name: "Dr. Sarah Johnson", jabatan: "Lead Assessor", avatar: "" },
  ],
  status: "SCHEDULED",
};

export const useAssessmentStore = create((set) => ({
  assessment: mockAssessment,
  progress: 0,
  status: "Scheduled",
  attendanceConfirmed: false,
  attendanceType: "",
  questionnaireCompleted: false,
  pptUploaded: false,

  confirmAttendance: (type, reason) => set((state) => ({
    attendanceConfirmed: true,
    attendanceType: type,
    status: type === "tidak-hadir" ? "Canceled" : state.status,
    progress: type === "tidak-hadir" ? 100 : state.progress + 33,
  })),

  submitQuestionnaire: (answers) => set((state) => ({
    questionnaireCompleted: true,
    progress: state.progress + 33,
  })),

  uploadPPT: (file) => set((state) => ({
    pptUploaded: true,
    progress: state.progress + 34,
  })),
}));