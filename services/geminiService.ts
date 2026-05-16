
import { GoogleGenAI } from "@google/genai";
import { Perspective, AspectRatio } from "../types";
import { PERSPECTIVE_PROMPTS } from "../constants";

export const generatePerspectiveImage = async (
  base64Image: string,
  perspective: Perspective,
  aspectRatio: AspectRatio
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelName = 'gemini-2.5-flash-image';
  
  const prompt = `Based on the attached scene image, generate a new image from a ${perspective}. 
  Description: ${PERSPECTIVE_PROMPTS[perspective]}. 
  Maintain the visual style, lighting, and core elements of the original scene but drastically shift the camera perspective as described.`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Image.split(',')[1],
            mimeType: 'image/png'
          }
        },
        {
          text: prompt
        }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any
      }
    }
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data returned from AI");
};
