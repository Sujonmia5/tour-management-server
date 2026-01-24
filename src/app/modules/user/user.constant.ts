const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
  SUPER_ADMIN: "super_admin",
} as const;

const allowedFields = ["name", "phone", "address"] as string[];

export { USER_ROLES, allowedFields };
