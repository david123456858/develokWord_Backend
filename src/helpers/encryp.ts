import bcrypt from 'bcryptjs'
export const encryptPassWord = async (pass: string): Promise<string> => {
  const sal = await bcrypt.genSalt(0)
  const hash = await bcrypt.hash(pass, sal)
  console.log(hash)
  return hash
}
export const comparePassWord = async (pass: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(pass, hash)
}
