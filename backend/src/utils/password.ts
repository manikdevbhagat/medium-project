export async function hashPassword(
  password: string,
  providedSalt: string
): Promise<string> {
  const encoder = new TextEncoder();

  // Convert the provided salt (hex string) to Uint8Array
  const salt = new Uint8Array(
    providedSalt.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
  );

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits", "deriveKey"]
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const exportedKey = (await crypto.subtle.exportKey(
    "raw",
    key
  )) as ArrayBuffer;

  const hashBuffer = new Uint8Array(exportedKey);
  const hashArray = Array.from(hashBuffer);
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${providedSalt}:${hashHex}`;
}

export async function verifyPassword(
  storedHash: string,
  passwordAttempt: string,
  providedSalt: string
): Promise<boolean> {
  const [saltHex, originalHash] = storedHash.split(":");

  // Ensure providedSalt is converted to Uint8Array in hashPassword function
  const attemptHashWithSalt = await hashPassword(passwordAttempt, providedSalt);
  const [, attemptHash] = attemptHashWithSalt.split(":");

  return attemptHash === originalHash;
}
