export const ROLES = ["OWNER_ADMIN", "INVESTOR", "MANAGER", "EMPLOYEE"] as const;
export type Role = (typeof ROLES)[number];

export const permissions = {
  dashboard: ["OWNER_ADMIN", "INVESTOR", "MANAGER", "EMPLOYEE"],
  properties: ["OWNER_ADMIN", "MANAGER"],
  suppliers: ["OWNER_ADMIN", "MANAGER"],
  costs: ["OWNER_ADMIN", "INVESTOR", "MANAGER"],
  customers: ["OWNER_ADMIN", "MANAGER", "EMPLOYEE"],
  orders: ["OWNER_ADMIN", "MANAGER", "EMPLOYEE"],
  research: ["OWNER_ADMIN", "INVESTOR", "MANAGER"],
  scenarios: ["OWNER_ADMIN", "INVESTOR", "MANAGER"],
  deliveries: ["OWNER_ADMIN", "MANAGER", "EMPLOYEE"],
  team: ["OWNER_ADMIN"],
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof permissions;

export function can(role: Role, permission: Permission) {
  return (permissions[permission] as readonly Role[]).includes(role);
}
