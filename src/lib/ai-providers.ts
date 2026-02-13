/**
 * Unified AI provider interface
 * Supports both Gemini and Groq AI providers with client-side API calls
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import type { AIProvider } from "./api-key-storage";

export interface AIResponse {
    text: string;
    provider: AIProvider;
}

export interface AIOptions {
    temperature?: number;
    maxTokens?: number;
    model?: string;
}

/**
 * Generate AI response using Gemini
 */
async function generateWithGemini(
    prompt: string,
    apiKey: string,
    options: AIOptions = {}
): Promise<string> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: options.model || "gemini-1.5-flash"
        });

        const generationConfig = {
            temperature: options.temperature ?? 0.7,
            maxOutputTokens: options.maxTokens ?? 2048,
        };

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            generationConfig,
        });

        const response = result.response;
        const text = response.text();

        if (!text) {
            throw new Error('No response generated from Gemini');
        }

        return text;
    } catch (error) {
        console.error('Gemini AI Error:', error);

        if (error instanceof Error) {
            // Check for common Gemini API errors
            if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
                throw new Error('Invalid Gemini API key. Please check your API key in settings.');
            }
            if (error.message.includes('quota') || error.message.includes('RESOURCE_EXHAUSTED')) {
                throw new Error('Gemini API quota exceeded. Please check your API usage.');
            }
            throw new Error(`Gemini error: ${error.message}`);
        }

        throw new Error('Failed to generate response with Gemini AI');
    }
}

/**
 * Generate AI response using Groq
 */
async function generateWithGroq(
    prompt: string,
    apiKey: string,
    options: AIOptions = {}
): Promise<string> {
    try {
        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: "https://api.groq.com/openai/v1",
            dangerouslyAllowBrowser: true, // Required for client-side usage
        });

        const completion = await client.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: options.model || "llama-3.3-70b-versatile",
            temperature: options.temperature ?? 0.7,
            max_tokens: options.maxTokens ?? 2048,
        });

        const text = completion.choices[0]?.message?.content;

        if (!text) {
            throw new Error('No response generated from Groq');
        }

        return text;
    } catch (error) {
        console.error('Groq AI Error:', error);

        if (error instanceof Error) {
            // Check for common Groq API errors
            if (error.message.includes('Incorrect API key') || error.message.includes('invalid_api_key')) {
                throw new Error('Invalid Groq API key. Please check your API key in settings.');
            }
            if (error.message.includes('rate_limit') || error.message.includes('quota')) {
                throw new Error('Groq API rate limit exceeded. Please try again later.');
            }
            throw new Error(`Groq error: ${error.message}`);
        }

        throw new Error('Failed to generate response with Groq AI');
    }
}

/**
 * Generate AI response using the specified provider
 */
export async function generateAIResponse(
    provider: AIProvider,
    apiKey: string,
    prompt: string,
    options: AIOptions = {}
): Promise<AIResponse> {
    if (!apiKey || apiKey.trim().length === 0) {
        throw new Error(`No API key provided for ${provider}`);
    }

    let text: string;

    if (provider === 'gemini') {
        text = await generateWithGemini(prompt, apiKey, options);
    } else {
        text = await generateWithGroq(prompt, apiKey, options);
    }

    return {
        text,
        provider,
    };
}

/**
 * Get available models for a provider
 */
export function getAvailableModels(provider: AIProvider): string[] {
    if (provider === 'gemini') {
        return [
            'gemini-1.5-flash',
            'gemini-1.5-pro',
            'gemini-pro',
        ];
    } else {
        return [
            'llama-3.3-70b-versatile',
            'llama-3.1-70b-versatile',
            'mixtral-8x7b-32768',
            'gemma-7b-it',
        ];
    }
}

/**
 * Get provider display name
 */
export function getProviderName(provider: AIProvider): string {
    return provider === 'gemini' ? 'Google Gemini' : 'Groq';
}

/**
 * Get provider API key signup URL
 */
export function getProviderSignupURL(provider: AIProvider): string {
    return provider === 'gemini'
        ? 'https://aistudio.google.com/app/apikey'
        : 'https://console.groq.com/keys';
}
