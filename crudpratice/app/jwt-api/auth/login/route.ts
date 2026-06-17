import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { generateToken } from "@/JWT/jwt";

export async function POST(req:Request){
    try{
        const body= await req.json();
        const {email,password}=body;

        // check the user 
        const user=await db.select().from(users).where(eq(users.email,email));
        if(user.length==0){
            return NextResponse.json({message:"User Doesn't exist Pls SignUp"},{status:400})
        }
    
   
    const founduser=user[0];
    const ismatch=await bcrypt.compare(password,founduser.descrption);
    if(!ismatch){
       return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }
    const token=generateToken({
        id:founduser.id,
        email:founduser.email
    })
     return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }


}