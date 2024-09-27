import {genSalt, compare, hash} from 'bcrypt-ts';
/**
 * Generates a hash from a given password, using ten salt rounds
 * @param password - password to hash  
 * @returns - a string
 */
export const generatePasswordHash = async (password: string):Promise<string>=> {
    const salt = await genSalt(10);
    return await hash(password, salt);
};


/**
 *  Compares a password against a given hash
 * @param password - password to compare
 * @param hash - hash to compare
 * @returns - boolean
 */
export const checkPassword = async(password: string, hash: string): Promise<boolean> => {
   
    return compare(password, hash);
};