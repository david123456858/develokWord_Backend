import bcrypt from 'bcryptjs'
export const encryptPassWord = async (pass: string): Promise<string | undefined> => {
  try {
    if (pass === null) {
      console.log('No esta llegando nada')
      return pass
    }
    const sal = await bcrypt.genSalt(0)
    const hash: string = await bcrypt.hash(pass, sal)

    return hash
  } catch (error) {
    console.log(error)
  }
}
export const comparePassWord = async (pass: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(pass, hash)
}
