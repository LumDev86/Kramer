import { v4 as uuidv4 } from "uuid";

export const generateSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

export const removeSessionId = () => {
  localStorage.removeItem("sessionId");
};
