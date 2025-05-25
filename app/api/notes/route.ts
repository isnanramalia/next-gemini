import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(response.text);
// }

// main();

export async function POST(request: Request) {
  try{
    const {message} = await request.json();
    if(!message) {
      return NextResponse.json({error: "Message is required"}, {status: 400});

    }

    // sistem promot sgt penting guis, biar model nya bagus ya dr sinii, krn model nya sdh ada dmn2, tinggal gmn system prompt nya gmn
    const systemPrompt = `Kamu adalah asisten yang membantu pengguna untuk merangkum catatan. Jika catatan pengguna adalah sebagai berikut ${message} `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: systemPrompt,
      config: {
        maxOutputTokens: 100,
        temperature: 0.5, // controls the degree of randomness
      }
    });

    return NextResponse.json(
      {
        summary: response.text,
        message: "Summary generated successfully",
      },
      { status: 200 }
    )


  } catch (error) {
    if(error instanceof Error){
      return NextResponse.json({error: error.message}, {status: 500});
    }
  }

}