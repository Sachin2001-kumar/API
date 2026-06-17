import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const allUsers = await db.select().from(users);

  return NextResponse.json(allUsers);
}

export async function POST(req:Request) {
    try{
        const body=await req.json()
        if (!body.name || !body.email || !body.descrption){
            return NextResponse.json({message:"Please Enter the Name, email and Descrption"},{status:400})
        }
        const newuser= await db.insert(users).values({
            name:body.name,
            email:body.email,
            descrption:body.descrption
        }).returning()

        return NextResponse.json({message:"Successfully post"}, {status:200})
    }catch(error:any){
        NextResponse.json({message:"Error"},{status:404})
    }

}