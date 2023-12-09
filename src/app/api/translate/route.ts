import { TranslateBody } from "@/types/types";
import { OpenAIStream } from "@/utils";
import { NextResponse } from "next/server";

export const runtime = {
  runtime: "edge",
};

export const POST = async (req: Request): Promise<Response> => {
  try {
    const { inputLanguage, outputLanguage, inputCode, model, apiKey } =
      (await req.json()) as TranslateBody;

    const stream = await OpenAIStream(
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey
    );

    return new NextResponse(stream);
  } catch (error) {
    console.error(error);
    return new NextResponse("Error", { status: 500 });
  }
};
