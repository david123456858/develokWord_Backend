import bcrypt from 'bcryptjs'
export const encryptPassWord = async(pass:string)=>{
    const sal = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass,sal)
    return hash
}
export const comparePassWord = async (pass:string, hash:string)=>{
    return await bcrypt.compare(pass, hash)
}