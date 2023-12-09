import { OpenAIStream } from "@/utils";
import { NextRequest, NextResponse } from "next/server";

export const runtime = {
  runtime: "edge",
};

export const POST = async (req: NextRequest) => {
  const { inputCode, model, key, inputLanguage } = await req.json();

  try {
    const documentation = await OpenAIStream(
      inputCode,
      model,
      key,
      inputLanguage
    );

    return new NextResponse(documentation, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return new NextResponse(err, { status: 500 });
  }
};
