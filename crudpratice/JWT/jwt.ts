import jwt from "jsonwebtoken"
const secret=process.env.JWT_SECRET!;

export function generateToken(payload:any){
   return jwt.sign(payload,secret,{expiresIn:"1d"})
}
export function verfiyToken(token:any){
    return jwt.verify(token,secret)
}