export async function fetchSuggestionsFromHuggingFace(prompt: string, apiKey: string): Promise<string[]> {
  const model = 'mistralai/Mistral-7B-Instruct-v0.2';
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: `${prompt}\n\nSuggest three brief continuations separated by \n---\n`,
      parameters: {
        max_new_tokens: 48,
        temperature: 0.8,
        return_full_text: false,
      },
    }),
  });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  try {
    const raw = data?.[0]?.generated_text || '';
    const parts = raw.split('\n---\n').map((s: string) => s.trim()).filter(Boolean);
    return parts.slice(0, 3);
  } catch (e) {
    return [];
  }
}

