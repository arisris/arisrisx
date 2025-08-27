const encoder = new TextEncoder();
const decoder = new TextDecoder();
// small is fast
const INTERATIONS = 100;

// Helper function to convert ArrayBuffer to Base64 (URL-safe)
function arrayBufferToBase64Url(buffer: ArrayBufferLike) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, "-") // Replace '+' with '-'
    .replace(/\//g, "_") // Replace '/' with '_'
    .replace(/=/g, ""); // Remove padding '='
}

// Helper function to convert Base64 (URL-safe) to ArrayBuffer
function base64UrlToArrayBuffer(base64Url: string) {
  // Add padding back if necessary
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding)
    .replace(/-/g, "+") // Replace '-' with '+'
    .replace(/_/g, "/"); // Replace '_' with '/'
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export async function encryptString(plaintext: string, password: string) {
  try {
    // Generate random salt (16 bytes)
    const salt = crypto.getRandomValues(new Uint8Array(16));

    // Generate random initialization vector (12 bytes for AES-GCM)
    const iv = crypto.getRandomValues(new Uint8Array(12));

    // Prepare key derivation parameters
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    // Derive encryption key
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: INTERATIONS,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"],
    );

    // Encrypt the plaintext
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(plaintext),
    );

    // Combine and convert to URL-safe Base64 strings
    const saltB64 = arrayBufferToBase64Url(salt);
    const ivB64 = arrayBufferToBase64Url(iv);
    const ciphertextB64 = arrayBufferToBase64Url(ciphertext);

    // Combine into a single URL-safe string
    return `${saltB64}.${ivB64}.${ciphertextB64}`;
  } catch (e) {
    throw new Error(`Encoding failed: ${(e as Error).message}`);
  }
}

export async function decryptString(encodedString: string, password: string) {
  try {
    // Split encoded components
    const [saltB64, ivB64, ciphertextB64] = encodedString.split(".");
    if (!saltB64 || !ivB64 || !ciphertextB64) {
      throw new Error("Invalid encoded string format");
    }

    // Convert from URL-safe Base64 to ArrayBuffers
    const salt = base64UrlToArrayBuffer(saltB64);
    const iv = base64UrlToArrayBuffer(ivB64);
    const ciphertext = base64UrlToArrayBuffer(ciphertextB64);

    // Prepare key derivation parameters
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      { name: "PBKDF2" },
      false,
      ["deriveKey"],
    );

    // Derive encryption key
    const key = await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: INTERATIONS,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["decrypt"],
    );

    // Decrypt the ciphertext
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext,
    );

    return decoder.decode(decrypted);
  } catch (e) {
    throw new Error(`Decoding failed: ${(e as Error).message}`);
  }
}
