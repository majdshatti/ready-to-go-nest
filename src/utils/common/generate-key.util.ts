import { randomBytes } from "crypto"

/**
 * 
 * @param digits 
 */
export const generateKey = (digits: number = 16) => {
    return randomBytes(digits).toString('hex');
}