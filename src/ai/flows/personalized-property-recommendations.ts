'use server';

/**
 * @fileOverview Provides personalized property recommendations based on user preferences.
 *
 * - `getPropertyRecommendations` -  A function that takes user preferences and returns property recommendations.
 * - `PropertyRecommendationInput` - The input type for the `getPropertyRecommendations` function.
 * - `PropertyRecommendationOutput` - The return type for the `getPropertyRecommendations` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PropertyRecommendationInputSchema = z.object({
  location: z.string().describe('The preferred location for the property.'),
  maxRent: z.number().describe('The maximum rent the student is willing to pay.'),
  desiredAmenities: z.array(z.string()).describe('A list of desired amenities (e.g., parking, gym, laundry).'),
});
export type PropertyRecommendationInput = z.infer<typeof PropertyRecommendationInputSchema>;

const PropertyRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      propertyId: z.string().describe('The unique identifier for the property.'),
      propertyName: z.string().describe('The name of the property.'),
      rent: z.number().describe('The monthly rent for the property.'),
      address: z.string().describe('The address of the property.'),
      amenities: z.array(z.string()).describe('A list of amenities offered by the property.'),
      contactInformation: z.string().describe('The contact information for the property owner.'),
      matchScore: z.number().describe('A score indicating how well the property matches the user preferences (0-1).'),
    })
  ).describe('A list of recommended properties based on the user preferences.'),
});
export type PropertyRecommendationOutput = z.infer<typeof PropertyRecommendationOutputSchema>;

export async function getPropertyRecommendations(input: PropertyRecommendationInput): Promise<PropertyRecommendationOutput> {
  return propertyRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'propertyRecommendationPrompt',
  input: {schema: PropertyRecommendationInputSchema},
  output: {schema: PropertyRecommendationOutputSchema},
  prompt: `You are a helpful AI assistant that provides personalized property recommendations to students based on their preferences.

  The student is looking for a property in the following location: {{{location}}}.
  Their maximum rent is {{{maxRent}}}.
  They desire the following amenities: {{#each desiredAmenities}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}.

  Based on these preferences, provide a list of recommended properties.  Each property should include propertyId, propertyName, rent, address, a list of amenities, contactInformation, and a matchScore (0-1).
  The matchScore represents how well the property aligns with the student's preferences.
  The response MUST be valid JSON.
  Make sure the rent is less than or equal to the maxRent provided in the user preferences.
  `,
});

const propertyRecommendationFlow = ai.defineFlow(
  {
    name: 'propertyRecommendationFlow',
    inputSchema: PropertyRecommendationInputSchema,
    outputSchema: PropertyRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
