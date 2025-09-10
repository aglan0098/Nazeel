// src/utils/extractPermissions.ts
export function extractPermissions(
  decodedToken: Record<string, any>
): string[] {
  const permissions: string[] = [];

  Object.entries(decodedToken).forEach(([_, value]) => {
    if (!value) return;

    if (typeof value === "string" && value.startsWith("Permission.")) {
      permissions.push(value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (typeof item === "string" && item.startsWith("Permission.")) {
          permissions.push(item);
        }
      });
    }
  });

  return [...new Set(permissions)];
}
