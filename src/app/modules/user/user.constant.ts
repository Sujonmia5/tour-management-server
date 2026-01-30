const USER_ROLES = {
  USER: "user",
  GUIDE: "guide",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

const allowedFields = ["name", "phone", "address"] as string[];

export { USER_ROLES, allowedFields };
