'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating property summaries.
 *
 * The flow takes a property description as input and returns a concise summary
 * highlighting key features and benefits for students.
 *
 * @fileOverview
 * - `generatePropertySummary`: A function that takes a property description and returns a summary.
 * - `PropertySummaryInput`: The input type for the `generatePropertySummary` function.
 * - `PropertySummaryOutput`: The output type for the `generatePropertySummary` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the property description.
const PropertySummaryInputSchema = z.object({
  description: z
    .string()    
    .describe('The detailed description of the property to be summarized.'),
  location: z
    .string()
    .describe('The location of the property to be summarized.'),
  maxRent: z
    .number()
    .describe('The maximum rent of the property to be summarized.'),
  facilities: z
    .string()
    .describe('The facilities of the property to be summarized.'),
  distanceFromCollege: z
    .number()
    .describe('The distance from college of the property to be summarized.'),
  roomType: z
    .string()
    .describe('The room type of the property to be summarized.'),
});

export type PropertySummaryInput = z.infer<typeof PropertySummaryInputSchema>;

// Define the output schema for the generated property summary.
const PropertySummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the property, highlighting key features and benefits for students.'
    ),
});

export type PropertySummaryOutput = z.infer<typeof PropertySummaryOutputSchema>;

// Exported function to generate the property summary
export async function generatePropertySummary(
  input: PropertySummaryInput
): Promise<PropertySummaryOutput> {
  return generatePropertySummaryFlow(input);
}

// Define the prompt for generating the property summary.
const propertySummaryPrompt = ai.definePrompt({
  name: 'propertySummaryPrompt',
  input: {schema: PropertySummaryInputSchema},
  output: {schema: PropertySummaryOutputSchema},
  prompt: `You are an AI assistant specializing in creating summaries of properties.

  Given the following property description, location, max rent, facilities, distance from college, and room type, create a concise summary that highlights the key features and benefits for students.

  Description: {{{description}}}
  Location: {{{location}}}
  Max Rent: {{{maxRent}}}
  Facilities: {{{facilities}}}
  Distance from College: {{{distanceFromCollege}}}
  Room Type: {{{roomType}}}
  
  Focus on aspects that would appeal to students, such as proximity to campus, available amenities, and affordability.
  The summary should be engaging and informative, allowing students to quickly assess if the property meets their needs.
  `, 
});

// Define the Genkit flow for generating property summaries.
const generatePropertySummaryFlow = ai.defineFlow(
  {
    name: 'generatePropertySummaryFlow',
    inputSchema: PropertySummaryInputSchema,
    outputSchema: PropertySummaryOutputSchema,
  },
  async input => {
    const {output} = await propertySummaryPrompt(input);
    return output!;
  }
);
