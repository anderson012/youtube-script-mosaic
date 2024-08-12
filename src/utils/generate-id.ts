import generateUUID from "./generate-uuid";

export default function generateRandomId(prefix?: string): string {
  const uuid = generateUUID();
  return prefix ? `${prefix}-${uuid}` : uuid;
}
