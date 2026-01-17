// AES-256-GCM encryption for TOTP secrets
// Uses Web Crypto API available in Deno

const ALGORITHM = 'AES-GCM'
const KEY_LENGTH = 256

/**
 * Get the encryption key from environment variable
 */
function getEncryptionKey(): Uint8Array {
  const keyHex = Deno.env.get('ENCRYPTION_KEY')
  if (!keyHex) {
    throw new Error('ENCRYPTION_KEY environment variable not set')
  }

  // Convert hex string to Uint8Array
  const keyArray = new Uint8Array(keyHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))

  if (keyArray.length !== 32) {
    throw new Error('ENCRYPTION_KEY must be 32 bytes (64 hex characters)')
  }

  return keyArray
}

/**
 * Import the encryption key for use with Web Crypto API
 */
async function importKey(): Promise<CryptoKey> {
  const keyData = getEncryptionKey()

  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: ALGORITHM },
    false,
    ['encrypt', 'decrypt']
  )
}

/**
 * Encrypt a string using AES-256-GCM
 * @param plaintext - The text to encrypt
 * @returns Base64-encoded ciphertext:iv format
 */
export async function encrypt(plaintext: string): Promise<string> {
  try {
    const key = await importKey()

    // Generate a random 12-byte IV for GCM
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Encode the plaintext as Uint8Array
    const encoder = new TextEncoder()
    const data = encoder.encode(plaintext)

    // Encrypt the data
    const ciphertext = await crypto.subtle.encrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      data
    )

    // Convert to base64 for storage
    const ciphertextArray = new Uint8Array(ciphertext)
    const ciphertextBase64 = btoa(String.fromCharCode(...ciphertextArray))
    const ivBase64 = btoa(String.fromCharCode(...iv))

    // Return format: ciphertext:iv
    return `${ciphertextBase64}:${ivBase64}`
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Failed to encrypt data')
  }
}

/**
 * Decrypt a string using AES-256-GCM
 * @param encryptedData - Base64-encoded ciphertext:iv format
 * @returns Decrypted plaintext
 */
export async function decrypt(encryptedData: string): Promise<string> {
  try {
    const key = await importKey()

    // Split the encrypted data into ciphertext and IV
    const [ciphertextBase64, ivBase64] = encryptedData.split(':')

    if (!ciphertextBase64 || !ivBase64) {
      throw new Error('Invalid encrypted data format')
    }

    // Decode from base64
    const ciphertext = Uint8Array.from(atob(ciphertextBase64), c => c.charCodeAt(0))
    const iv = Uint8Array.from(atob(ivBase64), c => c.charCodeAt(0))

    // Decrypt the data
    const decrypted = await crypto.subtle.decrypt(
      {
        name: ALGORITHM,
        iv: iv,
      },
      key,
      ciphertext
    )

    // Decode the decrypted data
    const decoder = new TextDecoder()
    return decoder.decode(decrypted)
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Failed to decrypt data')
  }
}

/**
 * Test the encryption/decryption functions
 */
export async function testEncryption(): Promise<boolean> {
  try {
    const testData = 'test-secret-key'
    const encrypted = await encrypt(testData)
    const decrypted = await decrypt(encrypted)
    return testData === decrypted
  } catch {
    return false
  }
}
