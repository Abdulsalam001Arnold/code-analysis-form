

import {NextResponse, NextRequest} from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();

    try{
    const n8nweebhook = 'https://primary-production-3d85.up.railway.app/webhook/code-analysis'
    const {fullName, email, link, techSchool} = body;

    if(fullName !== "" && email !== "" && link !== "") {
        await fetch(n8nweebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fullName, email, link, techSchool})
        })

        return NextResponse.json({message: "Form submitted successfully!"}, {status: 200})
    }
        return NextResponse.json({message: "Please fill all the fields"}, {status: 400, statusText: 'Bad Request!, Please follow instructions!'})
    }catch(err){
        if(err instanceof Error) {
            console.error(err.message)
            return NextResponse.json({message: err.message}, {status: 500, statusText: err.message})
        }
    }
}