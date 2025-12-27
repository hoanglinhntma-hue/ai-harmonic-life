export type DemoRole = "student" | "teacher";

export type DemoSession = {
  role: DemoRole;
  classCode: string;
  nickname: string;
  createdAtISO: string;
};

export type DemoTask = {
  id: string;
  module: 1 | 2 | 3 | 4 | 5;
  title: string;
  level: "Dễ" | "Vừa" | "Khó";
};

export type DemoAttempt = {
  id: string;
  taskId: string;
  score: number; // 0..10
  note: string;
  submittedAtISO: string;
};

export const DEMO_CLASS = {
  code: "DEMO11",
  name: "11A – Dao động quanh ta",
};

export const DEMO_TASKS: DemoTask[] = [
  { id: "t1", module: 1, title: "Kéo A, ω, φ và quan sát x(t), v(t), a(t)", level: "Dễ" },
  { id: "t2", module: 2, title: "Nhập x(t)=2cos(5t+π/3) và giải mã tham số", level: "Dễ" },
  { id: "t3", module: 3, title: "Chọn hiện tượng 'Dòng điện xoay chiều' và mô hình hóa", level: "Vừa" },
  { id: "t4", module: 4, title: "Hỏi: Khi nào v cực đại? (Socrates)", level: "Vừa" },
  { id: "t5", module: 5, title: "Nhiệm vụ: điều chỉnh để chu kỳ đúng yêu cầu", level: "Khó" },
];

// 10 lượt làm bài mẫu để trang thống kê “đẹp”
export const DEMO_ATTEMPTS: DemoAttempt[] = Array.from({ length: 10 }).map((_, i) => {
  const task = DEMO_TASKS[i % DEMO_TASKS.length];
  const score = 6 + ((i * 7) % 5); // 6..10
  return {
    id: `a${i + 1}`,
    taskId: task.id,
    score,
    note:
      score >= 9
        ? "Rất tốt: nắm được quan hệ pha và cực trị."
        : score >= 7
        ? "Tốt: cần chú ý dấu của gia tốc và vị trí cân bằng."
        : "Cần ôn: điều kiện để v cực đại và ý nghĩa của φ.",
    submittedAtISO: new Date(Date.now() - (10 - i) * 86400000).toISOString(),
  };
});

export const LS_KEY_SESSION = "ahl_demo_session_v1";
export const LS_KEY_ATTEMPTS = "ahl_demo_attempts_v1";