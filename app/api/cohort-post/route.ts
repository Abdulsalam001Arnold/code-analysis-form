

import {NextResponse, NextRequest} from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();

    try{
    const n8nweebhook = 'http://localhost:5678/webhook-test/cohort-post'
    const {cohortName, startDate, endDate, course} = body;

    if(cohortName !== "" && startDate !== "" && endDate !== "" && course !== "") {
        await fetch(n8nweebhook, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cohortName, startDate, endDate, course})
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