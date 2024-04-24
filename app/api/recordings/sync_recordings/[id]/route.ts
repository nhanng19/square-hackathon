import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params } : { params: { id: string } }) { 
    const userId = params.id;
    
}