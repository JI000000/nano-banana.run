import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiLayers, FiZap, FiGrid, FiMove, FiMaximize } from 'react-icons/fi';

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

const MultiRegionEditingTutorial: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-primary-200 uppercase tracking-wider font-semibold text-sm mb-2">Advanced Tutorial</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Multi-Region Editing Mastery</h1>
            <p className="text-lg text-primary-100">
              Learn how to edit multiple areas of an image simultaneously with Nano-Banana's powerful 
              region-based editing system, maintaining perfect consistency between edits.
            </p>
            <div className="mt-8 flex items-center text-sm">
              <span className="text-primary-200">Difficulty:</span>
              <div className="ml-2 flex space-x-1">
                <div className="w-4 h-1 rounded-full bg-white opacity-100"></div>
                <div className="w-4 h-1 rounded-full bg-white opacity-100"></div>
                <div className="w-4 h-1 rounded-full bg-white opacity-100"></div>
              </div>
              <span className="ml-2 text-white">Advanced</span>
              <span className="mx-4 text-primary-300">|</span>
              <span className="text-primary-200">Reading time:</span>
              <span className="ml-2 text-white">18 minutes</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p>
              One of the most powerful new features in our latest update is the Multi-Region Editing system. 
              This advanced capability allows you to edit different parts of an image simultaneously with 
              different operations while maintaining perfect consistency across regions.
            </p>
            <p>
              In this tutorial, we'll explore how to leverage this feature for complex editing tasks that 
              previously would have required multiple separate operations and manual compositing. With 
              Multi-Region Editing, you can save up to 60% of your editing time on complex images.
            </p>
          </div>
          
          {/* What is Multi-Region Editing */}
          <TutorialSection
            title="Understanding Multi-Region Editing"
            icon={<FiGrid className="text-primary-600" />}
          >
            <p>
              Multi-Region Editing allows you to define different areas of an image and apply different 
              editing operations to each region, all in a single process. This creates a seamless result 
              with perfect transitions between regions.
            </p>
            
            <div className="relative w-full h-64 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/multi-region-concept.jpg" 
                alt="Diagram of multi-region editing concept" 
                fill
                className="object-contain"
              />
            </div>
            
            <p>Key benefits of Multi-Region Editing include:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Efficiency:</strong> Complete complex edits in a single operation instead of multiple steps
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Consistency:</strong> Automatic harmonization between regions for seamless results
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Precision:</strong> Apply exactly the right operation to each part of your image
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Intelligent Boundaries:</strong> Smart edge detection for natural transitions between regions
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Global Awareness:</strong> Each region "knows" about the others to maintain visual harmony
                </span>
              </li>
            </ul>
          </TutorialSection>
          
          {/* Setting Up Multi-Region Edits */}
          <TutorialSection
            title="Setting Up Multi-Region Edits"
            icon={<FiMove className="text-primary-600" />}
          >
            <p>
              Let's walk through the process of setting up a multi-region edit from start to finish.
            </p>
            
            <Step number={1} title="Enable Multi-Region Mode">
              <p>
                First, enable the Multi-Region Editing feature:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Upload your image in the generator interface</li>
                <li>Click on "Advanced Options" to expand the panel</li>
                <li>Find and toggle on "Multi-Region Editing"</li>
                <li>A new panel will appear with region controls</li>
              </ol>
            </Step>
            
            <Step number={2} title="Define Your Regions">
              <p>
                Now you'll need to define the different regions you want to edit:
              </p>
              <ol className="list-decimal ml-6 space-y-2">
                <li>Click "Add Region" to create your first region
                  <ul className="list-disc ml-6 mt-1">
                    <li>You'll see a selection tool appear</li>
                    <li>Choose the appropriate selection method:
                      <ul className="list-disc ml-6 mt-1">
                        <li><strong>Rectangle:</strong> For square/rectangular areas</li>
                        <li><strong>Ellipse:</strong> For circular/oval areas</li>
                        <li><strong>Polygon:</strong> For custom shapes with straight lines</li>
                        <li><strong>Freeform:</strong> For completely custom shapes</li>
                        <li><strong>Smart Select:</strong> For automatic object selection</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>Draw your selection on the image
                  <ul className="list-disc ml-6 mt-1">
                    <li>You can adjust the selection after drawing it</li>
                    <li>Use the handles to resize or reshape</li>
                    <li>Hold Shift for proportional resizing</li>
                  </ul>
                </li>
                <li>Name your region (e.g., "Sky", "Foreground", "Subject")
                  <ul className="list-disc ml-6 mt-1">
                    <li>Naming helps organize complex edits</li>
                    <li>Names are used in the prompt construction</li>
                  </ul>
                </li>
                <li>Repeat the process to add more regions
                  <ul className="list-disc ml-6 mt-1">
                    <li>You can create up to 5 regions in a single edit</li>
                    <li>Regions can overlap if needed</li>
                  </ul>
                </li>
              </ol>
              
              <div className="relative w-full h-64 my-6 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/region-selection.jpg" 
                  alt="Example of region selection interface" 
                  fill
                  className="object-contain"
                />
              </div>
            </Step>
            
            <Step number={3} title="Set Region Priorities">
              <p>
                For overlapping regions, you'll need to set priorities:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>In the regions panel, you'll see a list of your defined regions</li>
                <li>Drag to reorder them based on priority (top = highest priority)</li>
                <li>Higher priority regions will take precedence in overlapping areas</li>
                <li>You can also set specific blending modes for overlaps</li>
              </ul>
            </Step>
            
            <Step number={4} title="Set Global Parameters">
              <p>
                Configure how your regions will work together:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Harmony Level (0-100%):</strong> Higher values create more consistent results across regions</li>
                <li><strong>Boundary Treatment:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    <li><strong>Hard:</strong> Clear distinction between regions</li>
                    <li><strong>Soft:</strong> Gradual blending between regions</li>
                    <li><strong>Smart:</strong> AI-detected natural boundaries</li>
                  </ul>
                </li>
                <li><strong>Global Constraints:</strong> Aspects that should remain consistent across all regions (lighting, style, etc.)</li>
              </ul>
            </Step>
            
            <Tip type="success">
              When setting up regions, try to align region boundaries with natural edges in the image when possible. This creates more seamless transitions between edited areas.
            </Tip>
          </TutorialSection>
          
          {/* Creating Multi-Region Prompts */}
          <TutorialSection
            title="Creating Multi-Region Prompts"
            icon={<FiLayers className="text-primary-600" />}
          >
            <p>
              The key to successful multi-region editing is crafting effective prompts for each region
              while maintaining overall consistency.
            </p>
            
            <Step number={1} title="Structure Your Multi-Region Prompt">
              <p>
                Multi-region prompts follow a specific format:
              </p>
              <CodeBlock>
{`Region "Sky": Transform to a dramatic sunset sky with purple and orange clouds.
Region "Mountains": Change to snow-covered mountains with pine trees.
Region "Lake": Convert to a clear mountain lake reflecting the sunset.
Global: Maintain consistent lighting from the sunset and a cohesive color palette.`}
              </CodeBlock>
              <p className="mt-3">
                Note the three key components:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Region-specific instructions prefixed with the region name</li>
                <li>Clear, specific directions for each region</li>
                <li>Global instructions that apply across all regions</li>
              </ul>
            </Step>
            
            <Step number={2} title="Craft Region-Specific Prompts">
              <p>
                For each region, create a specific prompt that describes exactly what you want:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Be specific about the change:</strong> "Change the grassy field to a beach with fine white sand" rather than just "add a beach"</li>
                <li><strong>Include contextual awareness:</strong> "Make the mountains connect naturally with the beach in the foreground"</li>
                <li><strong>Specify style consistency:</strong> "Keep the same painting style as the rest of the image"</li>
                <li><strong>Note critical elements:</strong> "Preserve the position and appearance of the rocks while changing the surrounding water"</li>
              </ul>
            </Step>
            
            <Step number={3} title="Define Global Constraints">
              <p>
                The "Global" section is crucial for maintaining consistency:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Lighting consistency:</strong> "Maintain consistent directional lighting from the upper right across all regions"</li>
                <li><strong>Color harmony:</strong> "Use a cohesive cool blue-green color palette throughout"</li>
                <li><strong>Style uniformity:</strong> "Apply the same watercolor painting style to all regions"</li>
                <li><strong>Physical coherence:</strong> "Ensure natural transitions between regions with proper shadows and reflections"</li>
              </ul>
            </Step>
            
            <div className="relative w-full h-64 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/multi-region-prompt-example.jpg" 
                alt="Example of multi-region prompt interface" 
                fill
                className="object-contain"
              />
            </div>
            
            <Tip type="warning">
              When regions have interdependent elements (like water reflecting the sky), make sure to reference this relationship in both region prompts. For example: "Sky region: Create a sunset with clouds" and "Water region: Show clear reflections of the sunset sky above."
            </Tip>
          </TutorialSection>
          
          {/* Advanced Multi-Region Techniques */}
          <TutorialSection
            title="Advanced Multi-Region Techniques"
            icon={<FiMaximize className="text-primary-600" />}
          >
            <p>
              Now that you understand the basics, let's explore some advanced techniques for multi-region editing.
            </p>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Nested Regions</h3>
            <p>
              You can create regions within regions for more precise control:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Parent-Child Relationships:</strong> Define a large region, then create smaller sub-regions within it</li>
              <li><strong>Inheritance:</strong> Child regions inherit certain properties from parent regions</li>
              <li><strong>Override Controls:</strong> Specify which properties child regions should inherit vs. override</li>
            </ul>
            <p className="mt-3">
              Example of nested region prompt:
            </p>
            <CodeBlock>
{`Region "Landscape": Convert to a tropical beach scene.
  Region "Palm Trees": Within the landscape, add swaying palm trees with detailed fronds.
    Region "Coconuts": On the palm trees, add coconuts with brown husks.
Region "Sky": Change to clear blue with scattered clouds.
Global: Maintain consistent tropical afternoon lighting.`}
              </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Transition Regions</h3>
            <p>
              For complex edits, creating dedicated transition regions can improve blending:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Create narrow regions that overlap the boundaries between main regions</li>
              <li>Set these regions to "Transition" mode</li>
              <li>The system will use these regions to create optimal blending between main regions</li>
              <li>Particularly useful for challenging transitions like water-to-land or sky-to-mountains</li>
            </ul>
            <p className="mt-3">
              Example of transition region prompt:
            </p>
            <CodeBlock>
{`Region "Sky": Transform to sunset sky.
Region "Ocean": Change to tropical ocean with waves.
Region "Sky-Ocean Transition": Create a natural horizon line with the sunset reflecting on the water surface.
Global: Maintain consistent sunset lighting throughout the image.`}
              </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Masked Objects</h3>
            <p>
              You can use the Smart Selection tool to automatically mask complex objects:
            </p>
            <ol className="list-decimal ml-6 space-y-2">
              <li>Click "Smart Select" in the region tool panel</li>
              <li>Click on the object you want to select (e.g., a person, car, animal)</li>
              <li>The system will automatically create a precise mask around the object</li>
              <li>You can refine the mask if needed using the editing tools</li>
              <li>Set specific instructions for that object</li>
            </ol>
            <p className="mt-3">
              This is particularly useful for:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Changing clothing while keeping the person the same</li>
              <li>Modifying specific objects without affecting surroundings</li>
              <li>Creating "impossible" scenes with objects from different environments</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Style Transfer Between Regions</h3>
            <p>
              You can copy the style from one region to another:
            </p>
            <ol className="list-decimal ml-6 space-y-1">
              <li>Define your regions as normal</li>
              <li>In the region settings, click "Advanced Properties"</li>
              <li>For the target region, set "Style Reference" to the source region</li>
              <li>Adjust the "Style Transfer Strength" (0-100%)</li>
            </ol>
            <p className="mt-3">
              Example prompt using style references:
            </p>
            <CodeBlock>
{`Region "Painting": Keep this region with its impressionist painting style.
Region "Photograph": Transform this photograph to match the impressionist style of the "Painting" region while keeping the content recognizable.
Global: Create a seamless blend between the painting and the stylized photograph.`}
              </CodeBlock>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/smart-selection-example.jpg" 
                  alt="Example of smart object selection" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Smart object selection</p>
                </div>
              </div>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/style-transfer-example.jpg" 
                  alt="Style transfer between regions" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Style transfer between regions</p>
                </div>
              </div>
            </div>
          </TutorialSection>
          
          {/* Practical Examples */}
          <TutorialSection
            title="Practical Multi-Region Examples"
            icon={<FiZap className="text-primary-600" />}
          >
            <h3 className="text-xl font-semibold mb-4">Example 1: Product in Different Environments</h3>
            <p className="mb-4">
              For this example, we'll place a product in multiple different environments within the same image:
            </p>
            <div className="relative w-full h-64 my-6 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/product-environments-example.jpg" 
                alt="Product shown in multiple environments" 
                fill
                className="object-contain"
              />
            </div>
            <p className="mb-2">Regions setup:</p>
            <ol className="list-decimal ml-6 space-y-1 mb-4">
              <li>Region "Product": The product itself (using Smart Select)</li>
              <li>Region "Scene1": Top-left quadrant of the image</li>
              <li>Region "Scene2": Top-right quadrant</li>
              <li>Region "Scene3": Bottom-left quadrant</li>
              <li>Region "Scene4": Bottom-right quadrant</li>
            </ol>
            <p className="mb-2">Prompt:</p>
            <CodeBlock>
{`Region "Product": Maintain this water bottle exactly as is, with perfect preservation of the label, cap, and bottle shape.
Region "Scene1": Create a beach scene with golden sand and blue ocean waves.
Region "Scene2": Transform to a mountain hiking trail with pine trees and rocks.
Region "Scene3": Create a modern gym interior with exercise equipment.
Region "Scene4": Transform to a kitchen countertop with fresh fruits and vegetables.
Global: The water bottle should be properly integrated into each scene with consistent lighting and realistic shadows. Maintain the same size and angle of the bottle across all scenes.`}
              </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Example 2: Weather Split Image</h3>
            <p className="mb-4">
              Creating an image that shows the same scene in different weather conditions:
            </p>
            <div className="relative w-full h-64 my-6 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/weather-split-example.jpg" 
                alt="Same scene in different weather conditions" 
                fill
                className="object-contain"
              />
            </div>
            <p className="mb-2">Regions setup:</p>
            <ol className="list-decimal ml-6 space-y-1 mb-4">
              <li>Region "Summer": Left half of the image</li>
              <li>Region "Winter": Right half</li>
              <li>Region "Transition": A vertical strip in the center (set to Transition mode)</li>
              <li>Region "Buildings": The buildings that span both halves (using Smart Select)</li>
            </ol>
            <p className="mb-2">Prompt:</p>
            <CodeBlock>
{`Region "Summer": Create a summer scene with lush green trees, flowers, and people in summer clothing. Bright sunlight from above.
Region "Winter": Transform to a snowy winter scene with bare trees covered in snow, people in winter coats, and snow-covered ground. Soft winter light.
Region "Transition": Create a seamless transition between summer and winter, with graduated changes in foliage, ground covering, and lighting.
Region "Buildings": Keep the buildings consistent across both seasons but add appropriate seasonal decorations (summer: flower boxes, winter: holiday lights).
Global: Maintain the exact same architecture and scene composition across the entire image. The only differences should be the seasonal elements.`}
              </CodeBlock>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">Example 3: Style and Medium Variations</h3>
            <p className="mb-4">
              Showing the same subject in different artistic styles:
            </p>
            <div className="relative w-full h-64 my-6 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/style-variations-example.jpg" 
                alt="Same subject in different artistic styles" 
                fill
                className="object-contain"
              />
            </div>
            <p className="mb-2">Regions setup:</p>
            <ol className="list-decimal ml-6 space-y-1 mb-4">
              <li>Region "Photo": Top-left - realistic photography</li>
              <li>Region "Watercolor": Top-right - watercolor painting</li>
              <li>Region "Oil": Bottom-left - oil painting</li>
              <li>Region "Sketch": Bottom-right - pencil sketch</li>
              <li>Region "Subject": The main subject spanning all regions (using Smart Select)</li>
            </ol>
            <p className="mb-2">Prompt:</p>
            <CodeBlock>
{`Region "Photo": Create a realistic photographic style with natural colors and lighting.
Region "Watercolor": Transform to watercolor painting style with visible brush strokes and color bleeding.
Region "Oil": Create an oil painting style with thick impasto texture and rich colors.
Region "Sketch": Transform to a detailed pencil sketch with hatching and shading techniques.
Region "Subject": Maintain the exact same facial features, expression, and pose across all quadrants, only adapting the medium/style.
Global: Keep the same composition and subject across all regions. Each quadrant should have a clearly different artistic style while being recognizable as the same subject.`}
              </CodeBlock>
            
            <Tip type="success">
              When working with style variations like this example, set the Harmony Level lower (around 30-40%) to allow for more distinct style differences while still maintaining subject consistency.
            </Tip>
          </TutorialSection>
          
          {/* Troubleshooting Common Issues */}
          <TutorialSection
            title="Troubleshooting Common Issues"
            icon={<FiAlertCircle className="text-yellow-500" />}
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-2">Region Bleeding</h3>
                <p className="mb-2">
                  If edits from one region appear to "bleed" into another:
                </p>
                <ul className="list-disc ml-6">
                  <li>Check for overlapping regions and adjust priorities</li>
                  <li>Reduce the "Boundary Softness" setting</li>
                  <li>Create a transition region with specific instructions</li>
                  <li>Use "Region Isolation" mode for strict separation</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Inconsistent Lighting</h3>
                <p className="mb-2">
                  If lighting appears inconsistent across regions:
                </p>
                <ul className="list-disc ml-6">
                  <li>Increase the Harmony Level to at least 70%</li>
                  <li>Add explicit lighting instructions in the Global section</li>
                  <li>Enable "Unified Lighting Model" in advanced settings</li>
                  <li>Specify light sources clearly in each region prompt</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Unnatural Transitions</h3>
                <p className="mb-2">
                  If transitions between regions look artificial:
                </p>
                <ul className="list-disc ml-6">
                  <li>Enable "Smart Boundaries" for more natural edge detection</li>
                  <li>Create dedicated transition regions</li>
                  <li>Increase "Edge Refinement" setting</li>
                  <li>Adjust region boundaries to follow natural lines in the image</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Processing Failures</h3>
                <p className="mb-2">
                  If the multi-region edit fails to process:
                </p>
                <ul className="list-disc ml-6">
                  <li>Reduce the number of regions (maximum 5 for best results)</li>
                  <li>Simplify complex region shapes</li>
                  <li>Ensure regions don't have conflicting instructions</li>
                  <li>Try processing with "Progressive Mode" enabled (slower but more reliable)</li>
                </ul>
              </div>
            </div>
          </TutorialSection>
          
          {/* Conclusion */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p>
              Multi-Region Editing represents one of the most powerful capabilities in our enhanced 
              Nano-Banana system. By allowing you to edit multiple parts of an image simultaneously 
              with different operations, it enables complex creative visions that would be difficult 
              or impossible to achieve with traditional single-operation editing.
            </p>
            <p>
              Remember that the key to successful multi-region editing lies in:
            </p>
            <ul>
              <li>Thoughtful region planning and organization</li>
              <li>Clear, specific prompts for each region</li>
              <li>Careful attention to global consistency</li>
              <li>Strategic use of transition regions and smart boundaries</li>
            </ul>
            <p>
              With practice, you'll be able to create complex, seamless edits that transform 
              your images in ways that weren't possible before. We encourage you to experiment 
              with different region configurations and editing combinations to discover the 
              full potential of this powerful feature.
            </p>
          </div>
          
          {/* Next Steps */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex">
                <FiArrowRight className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <Link href="/tutorials/advanced-text-replacement" className="text-primary-600 hover:text-primary-800">
                  Learn about Advanced Text Replacement techniques
                </Link>
              </li>
              <li className="flex">
                <FiArrowRight className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <Link href="/tutorials/3d-scene-transformation" className="text-primary-600 hover:text-primary-800">
                  Explore our enhanced 3D Scene Transformation capabilities
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
            <h2 className="text-3xl font-bold mb-6">Ready to try Multi-Region Editing?</h2>
            <p className="text-lg text-primary-100 mb-8">
              Put your new knowledge to work and experience the power of simultaneous region-based editing.
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
            'headline': 'Multi-Region Editing Mastery with Nano-Banana AI',
            'description': 'Learn how to edit multiple areas of an image simultaneously with Nano-Banana\'s powerful region-based editing system, maintaining perfect consistency between edits.',
            'image': 'https://nano-banana.run/images/tutorials/multi-region-concept.jpg',
            'datePublished': '2025-08-10',
            'dateModified': '2025-08-10',
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
            'articleBody': 'This tutorial covers multi-region editing techniques using Nano-Banana\'s enhanced AI capabilities, including region selection, prompt creation, and advanced region-based editing strategies.',
            'keywords': 'multi-region editing, Nano-Banana tutorial, AI image editing, region selection, simultaneous image editing'
          })
        }}
      />
    </Layout>
  );
};

export default MultiRegionEditingTutorial;
