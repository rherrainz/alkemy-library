import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err){
                reject(err)
            }
            else{
                bcrypt.hash(password, salt, (error, hash) => {
                    if(error){
                        reject(error)
                    }
                    else{
                        resolve(hash)
                    }
                });
            }
        });
    });
}

const comparePassword = async(userInputPassword, storedHashedPassword) => {
    try {
        const result = await bcrypt.compare(userInputPassword, storedHashedPassword);
        return result;
    } catch (error) {
        return false;
    }
}

export const PasswordUtil = ( hashPassword, comparePassword ) 