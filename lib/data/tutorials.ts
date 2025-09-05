export interface Tutorial {
  title: string;
  description: string;
  slug: string;
  readTime: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
  author?: string;
  tags?: string[];
  content?: string;
  category?: string;
  videoUrl?: string;
  priority?: number; // For ordering by user value
}

export const tutorialsData: Tutorial[] = [
  {
    title: 'How to Access Nano Banana - Complete Guide',
    description: 'Step-by-step guide to accessing Nano Banana on Google AI Studio, LMarena, and Gemini. Learn which platform works best for your needs.',
    slug: 'getting-started',
    readTime: 3,
    difficulty: 'Beginner',
    date: '2025-09-05',
    author: 'Nano Banana Team',
    tags: ['access', 'getting-started', 'platforms', 'google-ai-studio', 'lmarena', 'gemini'],
    category: 'Getting Started',
    priority: 1,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder - will be replaced with actual video
    content: `
      <h2>How to Access Nano Banana</h2>
      <p>Nano Banana is Google's latest AI image editing model, available through multiple platforms. Here's how to access it based on your needs.</p>
      
      <h3>Method 1: Google AI Studio (Recommended)</h3>
      <p>Google AI Studio offers the most complete Nano Banana experience:</p>
      <ol>
        <li>Visit <a href="https://aistudio.google.com" target="_blank">aistudio.google.com</a></li>
        <li>Sign in with your Google account</li>
        <li>Look for "Nano Banana" in the model selection</li>
        <li>Upload your image and start editing</li>
      </ol>
      
      <h3>Method 2: LMarena (Community Platform)</h3>
      <p>LMarena provides an easy-to-use interface for testing Nano Banana:</p>
      <ol>
        <li>Go to <a href="https://lmarena.ai" target="_blank">lmarena.ai</a></li>
        <li>Search for "Nano Banana" in the models list</li>
        <li>Upload your image and experiment with prompts</li>
      </ol>
      
      <h3>Method 3: Gemini Integration</h3>
      <p>Use Nano Banana through Gemini's conversational interface:</p>
      <ol>
        <li>Visit <a href="https://gemini.google.com" target="_blank">gemini.google.com</a></li>
        <li>Upload an image and ask Gemini to edit it</li>
        <li>Gemini will use Nano Banana for image transformations</li>
      </ol>
      
      <h3>Which Platform Should You Choose?</h3>
      <ul>
        <li><strong>Google AI Studio:</strong> Best for professional use and full features</li>
        <li><strong>LMarena:</strong> Great for testing and experimentation</li>
        <li><strong>Gemini:</strong> Perfect for casual users and natural language editing</li>
      </ul>
    `
  },
  {
    title: 'Nano Banana Prompt Engineering - Best Practices',
    description: 'Learn how to write effective prompts for Nano Banana to get the best results. Includes examples and common mistakes to avoid.',
    slug: 'prompt-engineering',
    readTime: 4,
    difficulty: 'Beginner',
    date: '2025-09-05',
    author: 'Nano Banana Team',
    tags: ['prompt-engineering', 'prompts', 'best-practices', 'examples'],
    category: 'Techniques',
    priority: 2,
    content: `
      <h2>Nano Banana Prompt Engineering</h2>
      <p>Writing effective prompts is crucial for getting great results with Nano Banana. Here are the proven techniques that work best.</p>
      
      <h3>Basic Prompt Structure</h3>
      <p>Follow this structure for consistent results:</p>
      <ol>
        <li><strong>Action:</strong> What you want to do (replace, add, remove, change)</li>
        <li><strong>Subject:</strong> What specific element to modify</li>
        <li><strong>Details:</strong> Style, color, size, or other specifications</li>
        <li><strong>Context:</strong> Maintain the overall scene or mood</li>
      </ol>
      
      <h3>Effective Prompt Examples</h3>
      <ul>
        <li><strong>Text Replacement:</strong> "Replace the text 'Welcome' with 'Hello World' in the same font style and color"</li>
        <li><strong>Object Addition:</strong> "Add a red sports car in the parking lot, maintaining the same lighting and perspective"</li>
        <li><strong>Style Change:</strong> "Change the building from modern to Victorian style while keeping the same size and position"</li>
      </ul>
      
      <h3>Common Mistakes to Avoid</h3>
      <ul>
        <li>Being too vague ("make it better")</li>
        <li>Conflicting instructions ("make it bigger but keep the same size")</li>
        <li>Ignoring context and lighting</li>
        <li>Not specifying important details like colors or styles</li>
      </ul>
      
      <h3>Advanced Techniques</h3>
      <ul>
        <li><strong>Negative Prompts:</strong> Specify what you don't want ("no text, no people")</li>
        <li><strong>Style References:</strong> "in the style of [artist name]" or "photorealistic"</li>
        <li><strong>Technical Specs:</strong> "4K resolution", "professional lighting"</li>
      </ul>
    `
  },
  {
    title: 'Text Replacement in Images - Complete Guide',
    description: 'Master text replacement with Nano Banana. Learn to change text while maintaining natural fonts, colors, and layouts.',
    slug: 'text-replacement',
    readTime: 3,
    difficulty: 'Beginner',
    date: '2025-09-05',
    author: 'Nano Banana Team',
    tags: ['text-replacement', 'editing', 'fonts', 'signs', 'logos'],
    category: 'Features',
    priority: 3,
    content: `
      <h2>Text Replacement with Nano Banana</h2>
      <p>Text replacement is one of Nano Banana's most popular features. Learn how to change text in images while maintaining natural appearance.</p>
      
      <h3>Basic Text Replacement</h3>
      <p>For simple text changes, use this format:</p>
      <blockquote>
        "Replace '[old text]' with '[new text]' in the same font style and color"
      </blockquote>
      
      <h3>Advanced Text Replacement</h3>
      <p>For more complex changes, be specific about:</p>
      <ul>
        <li><strong>Font Style:</strong> "bold", "italic", "serif", "sans-serif"</li>
        <li><strong>Color:</strong> "red", "blue", "white", "black"</li>
        <li><strong>Size:</strong> "larger", "smaller", "same size"</li>
        <li><strong>Position:</strong> "center", "left-aligned", "right-aligned"</li>
      </ul>
      
      <h3>Common Use Cases</h3>
      <ul>
        <li><strong>Business Signs:</strong> Update store names, hours, or contact info</li>
        <li><strong>Product Labels:</strong> Change product names or descriptions</li>
        <li><strong>Social Media:</strong> Update captions or text overlays</li>
        <li><strong>Documents:</strong> Modify text in screenshots or scanned documents</li>
      </ul>
      
      <h3>Tips for Better Results</h3>
      <ul>
        <li>Be specific about the exact text to replace</li>
        <li>Mention the background context if relevant</li>
        <li>Consider the lighting and shadows on the text</li>
        <li>Test with different prompt variations</li>
      </ul>
    `
  },
  {
    title: 'Nano Banana Examples - Real Use Cases',
    description: 'See real examples of Nano Banana in action. Learn from successful projects and get inspiration for your own edits.',
    slug: 'examples',
    readTime: 5,
    difficulty: 'Beginner',
    date: '2025-09-05',
    author: 'Nano Banana Team',
    tags: ['examples', 'use-cases', 'inspiration', 'projects'],
    category: 'Examples',
    priority: 4,
    content: `
      <h2>Nano Banana Examples & Use Cases</h2>
      <p>Explore real-world examples of Nano Banana in action. These examples show the practical applications and creative possibilities.</p>
      
      <h3>Business & Marketing</h3>
      <ul>
        <li><strong>Store Sign Updates:</strong> Change business names, hours, or contact information</li>
        <li><strong>Product Photography:</strong> Update product labels, prices, or descriptions</li>
        <li><strong>Social Media:</strong> Create engaging posts with custom text overlays</li>
        <li><strong>Real Estate:</strong> Remove or add objects in property photos</li>
      </ul>
      
      <h3>Creative Projects</h3>
      <ul>
        <li><strong>Art Creation:</strong> Transform photos into different artistic styles</li>
        <li><strong>Scene Composition:</strong> Add or remove elements to create new scenes</li>
        <li><strong>Character Design:</strong> Modify clothing, accessories, or backgrounds</li>
        <li><strong>Historical Recreation:</strong> Update modern photos to look historical</li>
      </ul>
      
      <h3>Personal Use</h3>
      <ul>
        <li><strong>Photo Editing:</strong> Remove unwanted objects or people</li>
        <li><strong>Text Addition:</strong> Add captions or watermarks to photos</li>
        <li><strong>Background Changes:</strong> Replace backgrounds in portraits</li>
        <li><strong>Style Transfer:</strong> Apply artistic filters to personal photos</li>
      </ul>
      
      <h3>Professional Applications</h3>
      <ul>
        <li><strong>E-commerce:</strong> Create product variations and lifestyle shots</li>
        <li><strong>Architecture:</strong> Visualize design changes in existing spaces</li>
        <li><strong>Fashion:</strong> Create outfit variations and style concepts</li>
        <li><strong>Education:</strong> Create visual learning materials and presentations</li>
      </ul>
    `
  },
  {
    title: 'Nano Banana API - Developer Guide',
    description: 'Learn how to integrate Nano Banana into your applications using the API. Includes pricing, rate limits, and code examples.',
    slug: 'api-guide',
    readTime: 6,
    difficulty: 'Intermediate',
    date: '2025-09-05',
    author: 'Nano Banana Team',
    tags: ['api', 'developer', 'integration', 'pricing', 'code-examples'],
    category: 'Technical',
    priority: 5,
    content: `
      <h2>Nano Banana API Integration</h2>
      <p>Integrate Nano Banana into your applications using the official API. This guide covers everything developers need to know.</p>
      
      <h3>Getting Started</h3>
      <p>To use the Nano Banana API:</p>
      <ol>
        <li>Get your API key from Google AI Studio</li>
        <li>Set up authentication in your application</li>
        <li>Make your first API call</li>
        <li>Handle responses and errors</li>
      </ol>
      
      <h3>API Endpoints</h3>
      <ul>
        <li><strong>Image Edit:</strong> POST /v1/images/edit</li>
        <li><strong>Text Replacement:</strong> POST /v1/images/text-replace</li>
        <li><strong>Style Transfer:</strong> POST /v1/images/style-transfer</li>
        <li><strong>Object Removal:</strong> POST /v1/images/remove-object</li>
      </ul>
      
      <h3>Pricing & Limits</h3>
      <ul>
        <li><strong>Free Tier:</strong> 100 requests per month</li>
        <li><strong>Paid Plans:</strong> Starting at $10/month for 1,000 requests</li>
        <li><strong>Rate Limits:</strong> 10 requests per minute</li>
        <li><strong>File Size:</strong> Up to 10MB per image</li>
      </ul>
      
      <h3>Code Examples</h3>
      <p>Here's a basic example in Python:</p>
      <pre><code>import requests

def edit_image(image_path, prompt):
    url = "https://api.nanobanana.ai/v1/images/edit"
    headers = {"Authorization": "Bearer YOUR_API_KEY"}
    
    with open(image_path, 'rb') as f:
        files = {'image': f}
        data = {'prompt': prompt}
        response = requests.post(url, headers=headers, files=files, data=data)
    
    return response.json()</code></pre>
    `
  },
  {
    title: 'Nano Banana vs Other AI Tools - Comparison',
    description: 'Compare Nano Banana with other AI image editing tools. Learn about features, pricing, and which tool is best for your needs.',
    slug: 'comparison',
    readTime: 4,
    difficulty: 'Beginner',
    date: '2025-09-05',
    author: 'Nano Banana Team',
    tags: ['comparison', 'vs', 'alternatives', 'features', 'pricing'],
    category: 'Comparison',
    priority: 6,
    content: `
      <h2>Nano Banana vs Other AI Tools</h2>
      <p>How does Nano Banana compare to other AI image editing tools? Here's an honest comparison to help you choose the right tool.</p>
      
      <h3>Nano Banana vs Midjourney</h3>
      <ul>
        <li><strong>Nano Banana:</strong> Free tier, text replacement, scene editing</li>
        <li><strong>Midjourney:</strong> Paid only, better for pure generation, Discord-based</li>
        <li><strong>Winner:</strong> Nano Banana for editing, Midjourney for creation</li>
      </ul>
      
      <h3>Nano Banana vs DALL-E 3</h3>
      <ul>
        <li><strong>Nano Banana:</strong> Better at editing existing images</li>
        <li><strong>DALL-E 3:</strong> Better at generating new images from scratch</li>
        <li><strong>Winner:</strong> Depends on your use case</li>
      </ul>
      
      <h3>Nano Banana vs Adobe Firefly</h3>
      <ul>
        <li><strong>Nano Banana:</strong> Free, simple interface, good for beginners</li>
        <li><strong>Adobe Firefly:</strong> Professional features, integrated with Creative Suite</li>
        <li><strong>Winner:</strong> Nano Banana for casual users, Firefly for professionals</li>
      </ul>
      
      <h3>Key Advantages of Nano Banana</h3>
      <ul>
        <li>Completely free to use</li>
        <li>Excellent text replacement capabilities</li>
        <li>Easy to use interface</li>
        <li>No subscription required</li>
        <li>Good quality results</li>
      </ul>
      
      <h3>When to Choose Nano Banana</h3>
      <ul>
        <li>You need to edit existing images</li>
        <li>Text replacement is important</li>
        <li>You want a free solution</li>
        <li>You're a beginner to AI image editing</li>
        <li>You need quick, simple edits</li>
      </ul>
    `
  }
];

export const getTutorialBySlug = (slug: string): Tutorial | undefined => {
  return tutorialsData.find(tutorial => tutorial.slug === slug);
};

export const getTutorialsByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): Tutorial[] => {
  return tutorialsData.filter(tutorial => tutorial.difficulty === difficulty);
};

export const getRelatedTutorials = (currentSlug: string, limit: number = 3): Tutorial[] => {
  const currentTutorial = getTutorialBySlug(currentSlug);
  if (!currentTutorial) return [];
  
  return tutorialsData
    .filter(tutorial => tutorial.slug !== currentSlug)
    .filter(tutorial => tutorial.difficulty === currentTutorial.difficulty)
    .slice(0, limit);
};

export const getTutorialsByPriority = (): Tutorial[] => {
  return tutorialsData.sort((a, b) => (a.priority || 999) - (b.priority || 999));
};

export const getTutorialsByCategory = (category: string): Tutorial[] => {
  return tutorialsData.filter(tutorial => tutorial.category === category);
};
