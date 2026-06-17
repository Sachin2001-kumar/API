import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req:Request){
    try{
        const body= await req.json();
        const {name,email,descrption}=body;
        //check if user exist or not
        const existornot=db.select().from(users).where(eq(users.email,email))
         
        if ((await existornot).length>0){
            return NextResponse.json({message:"User Already exist"})
        }

        //Hash password
        const hashpassowrd=await bcrypt.hash(descrption,10);


        //Insert a new user
        const newuser= await db.insert(users).values({
            name,
            email,
            descrption:hashpassowrd
        }).returning()

   return NextResponse.json(newuser,{status:200})
    }catch(error){
        return NextResponse.json(error, {status:400})
    }
}