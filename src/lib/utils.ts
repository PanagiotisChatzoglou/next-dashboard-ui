import { auth } from "@clerk/nextjs/server";
let role: string | undefined;
let currentUserId: string | null;

const getRole = async () => {
  const { sessionClaims } = await auth();
  role = await (sessionClaims?.metadata as { role?: string })?.role;
  return role;
};

export const getRoleValue = async () => {
  if (!role) {
    await getRole();
  }
  return role;
};
const getCurrentUserId = async () => {
  const { userId } = await auth();
  currentUserId = userId;
  return currentUserId;
};

export const getIdValue = async () => {
  if (!currentUserId) {
    await getCurrentUserId();
  }
  return currentUserId;
};
