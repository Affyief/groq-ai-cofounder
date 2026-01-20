import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export const validateIdeaWithGroq = async (idea) => {
  try {
    const prompt = `You are an experienced startup consultant and business analyst. A user has submitted the following startup idea for validation:

"${idea}"

Please provide a comprehensive validation report with the following structure:

1. **Recommendation**: Provide a clear GO, NO-GO, or PROCEED WITH CAUTION recommendation.

2. **Summary**: A brief 2-3 sentence summary of the idea's viability.

3. **Target Audience**: Describe the ideal target audience for this idea in detail. Include demographics, psychographics, and specific characteristics.

4. **First Potential Customers**: Suggest specific types of early adopters or customer segments that would be most likely to try this product/service first.

5. **Key Risks**: List 3-5 major risks or challenges associated with this idea.

6. **Key Opportunities**: List 3-5 significant opportunities or advantages this idea might have.

7. **Market Insights**: Provide insights about the current market landscape, trends, and potential market size.

8. **Competitor Analysis**: Briefly analyze existing competitors or alternatives in this space.

9. **Recommended Next Steps**: Suggest 3-5 concrete action steps the entrepreneur should take if they decide to pursue this idea.

Please format your response as a JSON object with the following structure:
{
  "recommendation": "GO" | "NO-GO" | "PROCEED WITH CAUTION",
  "summary": "string",
  "targetAudience": "string",
  "firstCustomers": "string",
  "risks": ["string", "string", ...],
  "opportunities": ["string", "string", ...],
  "marketInsights": "string",
  "competitorAnalysis": "string",
  "recommendedNextSteps": ["string", "string", ...]
}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are an expert startup consultant who provides detailed, actionable business advice. Always respond with valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 0.7,
      max_tokens: 2048,
      response_format: { type: 'json_object' }
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '{}';
    const validationReport = JSON.parse(responseText);

    return validationReport;
  } catch (error) {
    console.error('Error calling GROQ API:', error);
    throw new Error('Failed to validate idea with GROQ API');
  }
};
