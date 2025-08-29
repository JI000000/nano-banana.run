// 使用内置fetch (Node.js 18+)

async function testOpenRouter() {
  const apiKey = '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';
  const model = 'google/gemini-2.5-flash-image-preview:free';
  
  console.log('Testing OpenRouter API...');
  console.log('Model:', model);
  
  try {
    // 测试1: 验证API密钥
    console.log('\n1. Testing API key validation...');
    const modelsResponse = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nano-banana.run',
        'X-Title': 'Nano Banana AI'
      }
    });
    
    console.log('Models response status:', modelsResponse.status);
    if (modelsResponse.ok) {
      const modelsData = await modelsResponse.json();
      console.log('Available models:', modelsData.data?.length || 0);
    }
    
    // 测试2: 尝试图像生成
    console.log('\n2. Testing image generation...');
    const payload = {
      model: model,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Generate an image: A beautiful sunset over mountains, digital art style'
            }
          ]
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    };
    
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://nano-banana.run',
        'X-Title': 'Nano Banana AI'
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      
      // 尝试提取图片URL
      const content = data.choices?.[0]?.message?.content;
      console.log('Content type:', typeof content);
      console.log('Content:', content);
      
      if (typeof content === 'string') {
        const urlMatch = content.match(/https?:\/\/[^\s]+\.(jpg|jpeg|png|webp|gif)/i);
        if (urlMatch) {
          console.log('Found image URL:', urlMatch[0]);
        } else {
          console.log('No image URL found in content');
        }
      }
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testOpenRouter();
