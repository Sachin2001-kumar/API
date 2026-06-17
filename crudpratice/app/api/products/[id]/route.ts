import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET User By ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const getUser = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return NextResponse.json(getUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }
}

// DELETE User
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return NextResponse.json(
      {
        message: "Deleted Successfully",
        data: deletedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }
}

// UPDATE User
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();

    const updatedUser = await db
      .update(users)
      .set({
        name: body.name,
        email: body.email,
        descrption: body.description, 
      })
      .where(eq(users.id, id))
      .returning();

    return NextResponse.json(
      {
        message: "User updated successfully",
        data: updatedUser,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}