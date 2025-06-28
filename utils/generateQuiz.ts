import {
  Alert,
} from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { jsonrepair } from "jsonrepair";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { toast } from 'burnt';
import { GEMINI_KEY } from '@env'


const gemini = new GoogleGenerativeAI(GEMINI_KEY)

async function getGeminiResponse(prompt: string) {
  try {
    const model = gemini.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const response = result.response.text()
    return response
  } catch (error: any) {
    console.error('Gemini Api error', error)
    return 'Error fetching response'
  }
}

export const generateQuizes = async ({ input }: { input: string }) => {
  try {
    const result = await getGeminiResponse(
      input +
      `
  Generate a quiz based on the above text.
  ONLY respond with a **JSON array** of questions with:
  - "question" (string),
  - "options" (array of 4 strings),
  - "answer" (string).

  If the context is unclear or irrelevant, ONLY return the string "ERROR_400" without quotes or formatting.
  Do NOT generate random questions that don’t match the context.
  `
    );

    if (result.trim() === 'ERROR_400') {
      toast({
        title: 'Invalid input. Please provide better context for quiz generation.',
        duration : 5000
      });
      return;
    }


    try {
      const parsedResult = jsonrepair(result);
      const actualData = JSON.parse(parsedResult)

      if (Array.isArray(actualData) && actualData.length > 0) {
        return actualData
      } else {
        toast({
          title: 'Unable to generate meaningful quiz questions. Try providing a clearer context.'
        })
      }
    } catch (error: any) {
      if (error.includes('400')) {
        toast({
          title: 'The AI could not generate valid quiz questions. Try again with a better input.'
        })
      }
    }
  } catch (error) {
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};