import {
  DEMO_ATTEMPTS,
  DEMO_CLASS,
  DemoRole,
  DemoSession,
  LS_KEY_ATTEMPTS,
  LS_KEY_SESSION,
} from "./demo";

export function getSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(LS_KEY_SESSION);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

export function setDemoSession(role: DemoRole) {
  const session: DemoSession =
    role === "student"
      ? {
          role,
          classCode: DEMO_CLASS.code,
          nickname: "HS_Demo",
          createdAtISO: new Date().toISOString(),
        }
      : {
          role,
          classCode: DEMO_CLASS.code,
          nickname: "GV_Demo",
          createdAtISO: new Date().toISOString(),
        };

  localStorage.setItem(LS_KEY_SESSION, JSON.stringify(session));

  // seed attempts khi demo lần đầu
  if (!localStorage.getItem(LS_KEY_ATTEMPTS)) {
    localStorage.setItem(LS_KEY_ATTEMPTS, JSON.stringify(DEMO_ATTEMPTS));
  }
  return session;
}

export function clearDemo() {
  localStorage.removeItem(LS_KEY_SESSION);
  localStorage.removeItem(LS_KEY_ATTEMPTS);
}