import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiLayers, FiZap, FiImage, FiEdit } from 'react-icons/fi';

// Tutorial content component
const TutorialSection: React.FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
        {icon && <span className="mr-3">{icon}</span>}
        {title}
      </h2>
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </div>
  );
};

// Tip component
const Tip: React.FC<{
  type: 'success' | 'warning';
  children: React.ReactNode;
}> = ({ type, children }) => {
  return (
    <div className={`p-4 rounded-md mb-6 ${
      type === 'success' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-yellow-50 border-l-4 border-yellow-500'
    }`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === 'success' ? (
            <FiCheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <FiAlertCircle className="h-5 w-5 text-yellow-500" />
          )}
        </div>
        <div className="ml-3">
          <div className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-yellow-800'}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Code block component
const CodeBlock: React.FC<{
  language?: string;
  children: string;
}> = ({ language = 'plaintext', children }) => {
  return (
    <div className="bg-gray-800 rounded-md overflow-hidden mb-6">
      <div className="px-4 py-2 text-xs text-gray-400 bg-gray-900 border-b border-gray-800">
        {language}
      </div>
      <pre className="p-4 text-sm overflow-x-auto text-gray-200">
        <code>{children}</code>
      </pre>
    </div>
  );
};

// Step component
const Step: React.FC<{
  number: number;
  title: string;
  children: React.ReactNode;
}> = ({ number, title, children }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-2">
        <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3">
          {number}
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="ml-11 text-gray-700">
        {children}
      </div>
    </div>
  );
};

const AdvancedTextReplacementTutorial: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-primary-200 uppercase tracking-wider font-semibold text-sm mb-2">Advanced Tutorial</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mastering Advanced Text Replacement</h1>
            <p className="text-lg text-primary-100">
              Learn how to use Nano-Banana's enhanced text replacement capabilities to handle complex fonts, 
              challenging backgrounds, and multi-layer text with pixel-perfect accuracy.
            </p>
            <div className="mt-8 flex items-center text-sm">
              <span className="text-primary-200">Difficulty:</span>
              <div className="ml-2 flex space-x-1">
                <div className="w-4 h-1 rounded-full bg-white opacity-100"></div>
                <div className="w-4 h-1 rounded-full bg-white opacity-100"></div>
                <div className="w-4 h-1 rounded-full bg-white opacity-60"></div>
              </div>
              <span className="ml-2 text-white">Intermediate</span>
              <span className="mx-4 text-primary-300">|</span>
              <span className="text-primary-200">Reading time:</span>
              <span className="ml-2 text-white">15 minutes</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p>
              Our recent updates have significantly improved Nano-Banana's text replacement capabilities,
              increasing accuracy from 95% to 98% and adding special handling for artistic fonts and complex backgrounds.
              In this tutorial, we'll show you how to leverage these enhancements to achieve perfect text replacements
              in challenging scenarios.
            </p>
            <p>
              Whether you're working with ornate fonts, multi-layered text effects, or busy backgrounds,
              our new algorithms can handle the task with unprecedented precision. Let's dive in!
            </p>
          </div>
          
          {/* What's New Section */}
          <TutorialSection
            title="What's New in Text Replacement"
            icon={<FiZap className="text-primary-600" />}
          >
            <p>
              Before we get started with practical examples, let's review the key improvements in our latest update:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Enhanced Font Detection:</strong> Our new neural font matching system can identify and replicate even the most complex artistic fonts with 98% accuracy.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Advanced Background Preservation:</strong> The system now builds a detailed 3D model of the background texture to ensure perfect integration of new text.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Multi-Layer Handling:</strong> Text with shadows, glows, and other effects is now processed as separate layers for perfect preservation of all effects.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Subpixel Rendering:</strong> New text is rendered with advanced subpixel techniques to eliminate jagged edges and maintain crispness.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Smart Workflows:</strong> Our system now automatically detects optimal parameters for each specific image, reducing the need for manual adjustments.
                </span>
              </li>
            </ul>
            
            <div className="relative w-full h-64 my-8">
              <Image 
                src="/images/tutorials/text-replacement-comparison.jpg" 
                alt="Comparison of old vs new text replacement technology" 
                fill
                className="object-contain"
              />
            </div>
          </TutorialSection>
          
          {/* Working with Artistic Fonts */}
          <TutorialSection
            title="Working with Artistic Fonts"
            icon={<FiEdit className="text-primary-600" />}
          >
            <p>
              Artistic and decorative fonts have always been challenging for AI image editors. 
              Our enhanced algorithm now handles these complex cases with remarkable accuracy.
            </p>
            
            <Step number={1} title="Identify the Font Type">
              <p>
                When replacing artistic fonts, it helps to identify the general style for better results:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Calligraphic or script fonts</li>
                <li>3D or embossed text</li>
                <li>Vintage or distressed typography</li>
                <li>Hand-drawn or brush lettering</li>
                <li>Ornate or decorative display fonts</li>
              </ul>
              <p className="mt-3">
                The system will detect this automatically, but providing hints in your prompt can help.
              </p>
            </Step>
            
            <Step number={2} title="Craft a Specific Prompt">
              <p>
                For artistic fonts, include specific details in your prompt:
              </p>
              <CodeBlock>
{`Replace "SUMMER SALE" with "FALL COLLECTION" while preserving the gold embossed style, 
the shadow effect, and the slight curve of the text. Keep the same size and positioning.`}
              </CodeBlock>
              <p className="mt-3">
                The more specific your description, the better the results.
              </p>
            </Step>
            
            <Step number={3} title="Use Smart Workflow Option">
              <p>
                Our new Smart Workflow feature is especially helpful for artistic fonts:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Upload your image in the generator</li>
                <li>Select "Text Replacement" mode</li>
                <li>Ensure the "Smart Workflow" toggle is enabled</li>
                <li>Enter your replacement prompt</li>
              </ol>
              <p className="mt-3">
                The system will automatically detect font attributes and optimize parameters.
              </p>
            </Step>
            
            <div className="relative w-full h-80 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/artistic-font-example.jpg" 
                alt="Example of artistic font replacement" 
                fill
                className="object-contain"
              />
            </div>
            
            <Tip type="success">
              For highly ornate fonts, try the "maintain exact character spacing" option in the advanced settings. This helps preserve the intricate spacing often found in decorative typography.
            </Tip>
          </TutorialSection>
          
          {/* Complex Background Preservation */}
          <TutorialSection
            title="Complex Background Preservation"
            icon={<FiImage className="text-primary-600" />}
          >
            <p>
              Replacing text on complex backgrounds—like textured surfaces, gradients, or busy patterns—has been
              significantly improved with our new background preservation technology.
            </p>
            
            <Step number={1} title="Analyze the Background">
              <p>
                Before proceeding, consider the type of background you're working with:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Textured (wood, fabric, concrete, etc.)</li>
                <li>Patterned (repeating designs)</li>
                <li>Gradient or multi-colored</li>
                <li>Photographic with details behind the text</li>
                <li>Noisy or grainy surfaces</li>
              </ul>
            </Step>
            
            <Step number={2} title="Use Background-Aware Prompts">
              <p>
                Specify how you want the background handled:
              </p>
              <CodeBlock>
{`Replace "LIMITED OFFER" with "EXCLUSIVE DEAL" while preserving the marble texture 
background completely intact. Ensure the new text blends naturally with the veins 
and color variations in the marble.`}
              </CodeBlock>
            </Step>
            
            <Step number={3} title="Adjust Preservation Strength">
              <p>
                In the advanced settings panel, you can now control background preservation strength:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>High (90-100%):</strong> Maximum preservation, best for very detailed backgrounds</li>
                <li><strong>Medium (70-89%):</strong> Balanced approach, suitable for most cases</li>
                <li><strong>Low (50-69%):</strong> More focus on text quality, slight background simplification</li>
              </ul>
              <p className="mt-3">
                For most complex backgrounds, a setting of 90% or higher is recommended.
              </p>
            </Step>
            
            <div className="relative w-full h-80 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/complex-background-example.jpg" 
                alt="Example of text replacement on complex background" 
                fill
                className="object-contain"
              />
            </div>
            
            <Tip type="warning">
              When working with extremely busy backgrounds, try enabling the "Local Contrast Enhancement" option. This helps maintain the distinction between the text and background, especially with low-contrast scenarios.
            </Tip>
          </TutorialSection>
          
          {/* Multi-Layer Text Effects */}
          <TutorialSection
            title="Multi-Layer Text Effects"
            icon={<FiLayers className="text-primary-600" />}
          >
            <p>
              One of the most significant improvements is our ability to handle text with multiple effects 
              like shadows, glows, outlines, and 3D extrusions.
            </p>
            
            <Step number={1} title="Identify All Text Layers">
              <p>
                Before replacing multi-layered text, identify the components:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>Main text fill color and texture</li>
                <li>Outline or stroke effects</li>
                <li>Drop shadows or inner shadows</li>
                <li>Glow effects</li>
                <li>3D extrusion or perspective effects</li>
              </ul>
            </Step>
            
            <Step number={2} title="Enable Layer Detection">
              <p>
                Make sure to enable the new Layer Detection feature:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>In the Text Replacement panel, click "Advanced Options"</li>
                <li>Toggle on "Multi-Layer Detection"</li>
                <li>Optionally adjust the "Layer Sensitivity" slider (higher values detect subtler effects)</li>
              </ol>
            </Step>
            
            <Step number={3} title="Use Comprehensive Prompts">
              <p>
                Be detailed in describing the text effects you want to preserve:
              </p>
              <CodeBlock>
{`Replace "GAME OVER" with "LEVEL UP" while maintaining the blue metallic 3D text 
effect, the 8px red outline, the yellow inner glow, and the 45-degree drop shadow. 
Preserve exact depth and lighting angles.`}
              </CodeBlock>
            </Step>
            
            <div className="relative w-full h-80 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/multi-layer-text-example.jpg" 
                alt="Example of multi-layer text replacement" 
                fill
                className="object-contain"
              />
            </div>
            
            <Tip type="success">
              For complex multi-layer text, try using the "Generate Reference" feature first. This creates a technical analysis of the text effects that you can review and modify before proceeding with the replacement.
            </Tip>
          </TutorialSection>
          
          {/* Advanced Techniques */}
          <TutorialSection
            title="Advanced Techniques"
            icon={<FiZap className="text-primary-600" />}
          >
            <p>
              For the most challenging cases, here are some advanced techniques that leverage our latest features:
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Region-Based Text Replacement</h3>
            <p>
              When you need to replace text in multiple areas with different styles:
            </p>
            <ol className="list-decimal ml-6 space-y-1 mb-4">
              <li>Enable "Multi-Region Editing" in Advanced Settings</li>
              <li>Use the region selection tool to mark each text area</li>
              <li>Provide specific replacement text for each region</li>
              <li>Set "Global Consistency" to maintain relationships between regions</li>
            </ol>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Style Transfer Between Images</h3>
            <p>
              To copy text style from one image to another:
            </p>
            <ol className="list-decimal ml-6 space-y-1 mb-4">
              <li>Upload both source (style) and target images</li>
              <li>Use the "Extract Font Style" tool on the source image</li>
              <li>Apply the extracted style to your text replacement operation</li>
              <li>Fine-tune parameters as needed</li>
            </ol>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Language-Aware Replacement</h3>
            <p>
              For replacing text with different languages:
            </p>
            <ol className="list-decimal ml-6 space-y-1 mb-4">
              <li>Enable "Script Adaptation" in the language settings</li>
              <li>Specify both source and target languages</li>
              <li>Use "Maintain Layout" to preserve the overall text arrangement</li>
              <li>Adjust "Character Density" for languages with different space requirements</li>
            </ol>
            
            <div className="relative w-full h-64 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/advanced-techniques-example.jpg" 
                alt="Advanced text replacement techniques" 
                fill
                className="object-contain"
              />
            </div>
          </TutorialSection>
          
          {/* Common Issues and Solutions */}
          <TutorialSection
            title="Troubleshooting Common Issues"
            icon={<FiAlertCircle className="text-yellow-500" />}
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-2">Mismatched Font Weight</h3>
                <p className="mb-2">
                  If the replacement text appears too bold or too thin compared to the original:
                </p>
                <ul className="list-disc ml-6">
                  <li>Use the "Font Weight Adjustment" slider in Advanced Settings</li>
                  <li>Explicitly mention the desired weight in your prompt: "maintain the thin/light/bold weight of the original font"</li>
                  <li>Try the "Exact Weight Matching" option for precision control</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Background Bleeding Through Text</h3>
                <p className="mb-2">
                  If the background pattern appears to bleed through your new text:
                </p>
                <ul className="list-disc ml-6">
                  <li>Increase the "Text Opacity" setting to 100%</li>
                  <li>Enable "Enhanced Text Contrast"</li>
                  <li>Use "Background Isolation" mode to create a cleaner separation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Inconsistent Effect Depth</h3>
                <p className="mb-2">
                  If 3D effects or shadows don't match the original depth:
                </p>
                <ul className="list-disc ml-6">
                  <li>Use the new "Effect Depth" control to fine-tune</li>
                  <li>Specify exact measurements in your prompt: "maintain exactly 5px drop shadow"</li>
                  <li>Try "Perspective Matching" mode for 3D text</li>
                </ul>
              </div>
            </div>
          </TutorialSection>
          
          {/* Conclusion */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p>
              With these advanced techniques and our newly enhanced text replacement system, you can now handle even
              the most challenging text editing scenarios with confidence. The improvements in font matching, background
              preservation, and multi-layer handling represent a significant leap forward in AI-powered text replacement.
            </p>
            <p>
              We encourage you to experiment with these features and push the boundaries of what's possible. Remember
              to start with simple cases before tackling more complex ones, and don't hesitate to use the Smart Workflow
              option to let the system optimize parameters for you.
            </p>
          </div>
          
          {/* Next Steps */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex">
                <FiArrowRight className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <Link href="/tutorials/multi-region-editing" className="text-primary-600 hover:text-primary-800">
                  Learn about Multi-Region Editing for complex compositions
                </Link>
              </li>
              <li className="flex">
                <FiArrowRight className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <Link href="/tutorials/scene-transformation" className="text-primary-600 hover:text-primary-800">
                  Explore our improved Scene Transformation techniques
                </Link>
              </li>
              <li className="flex">
                <FiArrowRight className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <Link href="/examples/enhanced-features" className="text-primary-600 hover:text-primary-800">
                  View more examples of enhanced features in action
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to try advanced text replacement?</h2>
            <p className="text-lg text-primary-100 mb-8">
              Put your new knowledge to work and experience the power of our enhanced text replacement system.
            </p>
            <Link href="/try-generator" className="btn bg-white text-primary-900 hover:bg-primary-50 px-8 py-3 rounded-md font-medium inline-block">
              Try It Now
            </Link>
          </div>
        </div>
      </div>
      
      {/* Schema.org article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TechArticle',
            'headline': 'Mastering Advanced Text Replacement with Nano-Banana AI',
            'description': 'Learn how to use Nano-Banana\'s enhanced text replacement capabilities to handle complex fonts, challenging backgrounds, and multi-layer text with pixel-perfect accuracy.',
            'image': 'https://nano-banana.run/images/tutorials/text-replacement-comparison.jpg',
            'datePublished': '2025-08-14',
            'dateModified': '2025-08-14',
            'author': {
              '@type': 'Organization',
              'name': 'Nano-Banana Team'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Nano-Banana',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://nano-banana.run/logo.png'
              }
            },
            'articleSection': 'Tutorial',
            'articleBody': 'This tutorial covers advanced text replacement techniques using Nano-Banana\'s enhanced AI capabilities, including handling artistic fonts, complex backgrounds, and multi-layer text effects.',
            'keywords': 'text replacement AI, Nano-Banana tutorial, AI image editing, artistic font replacement, complex background preservation, multi-layer text editing'
          })
        }}
      />
    </Layout>
  );
};

export default AdvancedTextReplacementTutorial;
