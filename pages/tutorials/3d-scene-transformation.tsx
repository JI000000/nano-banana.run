import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiLayers, FiZap, FiImage, FiRefreshCw, FiGlobe } from 'react-icons/fi';

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

// Before/After comparison component
const BeforeAfterComparison: React.FC<{
  beforeImage: string;
  afterImage: string;
  beforeCaption?: string;
  afterCaption?: string;
  aspectRatio?: 'square' | 'landscape' | 'portrait';
}> = ({ 
  beforeImage, 
  afterImage, 
  beforeCaption = 'Before', 
  afterCaption = 'After',
  aspectRatio = 'landscape'
}) => {
  let heightClass = 'h-64';
  if (aspectRatio === 'square') heightClass = 'h-64';
  if (aspectRatio === 'portrait') heightClass = 'h-80';
  if (aspectRatio === 'landscape') heightClass = 'h-56';

  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className={`relative w-full ${heightClass} bg-gray-100`}>
          <Image 
            src={beforeImage}
            alt="Before transformation"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-gray-800 text-white text-xs px-3 py-2 text-center">
          {beforeCaption}
        </div>
      </div>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className={`relative w-full ${heightClass} bg-gray-100`}>
          <Image 
            src={afterImage}
            alt="After transformation"
            fill
            className="object-cover"
          />
        </div>
        <div className="bg-primary-600 text-white text-xs px-3 py-2 text-center">
          {afterCaption}
        </div>
      </div>
    </div>
  );
};

const SceneTransformationTutorial: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-primary-200 uppercase tracking-wider font-semibold text-sm mb-2">Advanced Tutorial</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">3D-Aware Scene Transformation</h1>
            <p className="text-lg text-primary-100">
              Master Nano-Banana's enhanced scene transformation capabilities with improved 3D awareness, 
              geometric consistency, and advanced lighting preservation.
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
              <span className="ml-2 text-white">20 minutes</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Introduction */}
          <div className="prose prose-lg max-w-none mb-12">
            <p>
              Our recent updates have revolutionized Nano-Banana's scene transformation capabilities with
              a new 3D-aware engine that maintains geometric consistency, preserves lighting conditions,
              and ensures subject integrity throughout transformations. Scene transformation quality has
              improved from 92% to 96% accuracy, particularly in handling perspective, lighting, and spatial relationships.
            </p>
            <p>
              In this advanced tutorial, we'll explore how to leverage these enhanced capabilities to create
              seamless scene transformations that look completely natural, even with dramatic environmental changes.
            </p>
          </div>
          
          {/* What's New Section */}
          <TutorialSection
            title="What's New in Scene Transformation"
            icon={<FiZap className="text-primary-600" />}
          >
            <p>
              Before we dive into techniques, let's review the key improvements in our latest update:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>3D Scene Understanding:</strong> Our new system generates a depth-aware 3D representation of the scene for more accurate transformations.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Geometric Consistency:</strong> Subjects maintain proper scale, perspective, and spatial relationships regardless of the target environment.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Advanced Lighting Preservation:</strong> The system extracts and reapplies lighting conditions to maintain consistent highlights, shadows, and color temperatures.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Weather Physics:</strong> Realistic application of weather effects with proper interaction with subjects (like rain droplets, snow accumulation, etc.).
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Time-of-Day Simulation:</strong> Physically accurate lighting changes when transforming between different times of day.
                </span>
              </li>
            </ul>
            
            <BeforeAfterComparison
              beforeImage="/images/tutorials/scene-transform-old.jpg"
              afterImage="/images/tutorials/scene-transform-new.jpg"
              beforeCaption="Previous version: Flat transformation with lighting inconsistencies"
              afterCaption="New version: 3D-aware with perfect lighting integration"
            />
          </TutorialSection>
          
          {/* Understanding 3D Scene Representation */}
          <TutorialSection
            title="Understanding 3D Scene Representation"
            icon={<FiGlobe className="text-primary-600" />}
          >
            <p>
              The foundation of our improved scene transformation is a sophisticated 3D scene understanding system.
              This technology analyzes the spatial relationships, depth, and structure of your image before
              applying any transformations.
            </p>
            
            <Step number={1} title="Scene Component Analysis">
              <p>
                When you upload an image, the system automatically identifies key scene components:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Subjects:</strong> People, animals, vehicles, main focal objects</li>
                <li><strong>Environment:</strong> Background, surrounding context, terrain</li>
                <li><strong>Structures:</strong> Buildings, furniture, supporting objects</li>
                <li><strong>Sky/Ceiling:</strong> Upper bounds of the scene</li>
                <li><strong>Ground plane:</strong> Floor, ground, supporting surface</li>
              </ul>
              <p className="mt-3">
                Understanding these components allows the system to maintain proper relationships during transformation.
              </p>
            </Step>
            
            <Step number={2} title="Depth Map Generation">
              <p>
                Next, a detailed depth map is generated to understand the 3D space:
              </p>
              <div className="relative w-full h-64 my-6 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/depth-map-example.jpg" 
                  alt="Example of a scene depth map" 
                  fill
                  className="object-contain"
                />
              </div>
              <p>
                This depth information is crucial for:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Determining which objects should appear in front of or behind others</li>
                <li>Maintaining proper scale as distance changes</li>
                <li>Applying accurate perspective transformations</li>
                <li>Creating realistic occlusion when objects interact</li>
              </ul>
            </Step>
            
            <Step number={3} title="Camera Parameter Estimation">
              <p>
                The system also estimates the original camera parameters:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Focal length and field of view</li>
                <li>Camera position and orientation</li>
                <li>Lens characteristics</li>
              </ul>
              <p className="mt-3">
                These parameters ensure that new elements are introduced with the same perspective as the original image.
              </p>
            </Step>
            
            <Tip type="success">
              For best results with complex scenes, enable "Enhanced Depth Detection" in the advanced settings. This uses our most powerful depth estimation model and creates a more detailed 3D representation.
            </Tip>
          </TutorialSection>
          
          {/* Transforming Environments */}
          <TutorialSection
            title="Transforming Environments While Preserving Subjects"
            icon={<FiRefreshCw className="text-primary-600" />}
          >
            <p>
              One of the most powerful applications of our enhanced scene transformation is changing the environment
              while maintaining perfect subject integrity and integration.
            </p>
            
            <Step number={1} title="Select an Environment Transformation Type">
              <p>
                Before creating your prompt, decide which type of transformation you want to perform:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Location Change:</strong> Moving subjects to an entirely different setting (e.g., office to beach)</li>
                <li><strong>Weather Change:</strong> Modifying weather conditions while keeping the location (e.g., sunny to rainy)</li>
                <li><strong>Time Change:</strong> Altering the time of day (e.g., day to night)</li>
                <li><strong>Season Change:</strong> Transforming seasonal elements (e.g., summer to winter)</li>
                <li><strong>Style Change:</strong> Modifying the aesthetic style while preserving the scene structure</li>
              </ul>
            </Step>
            
            <Step number={2} title="Craft a Detailed Environment Prompt">
              <p>
                For environment transformations, specificity is key:
              </p>
              <CodeBlock>
{`Transform this office scene into a tropical beach setting while preserving the 
people and their positions exactly. The beach should have fine white sand, crystal 
clear blue water, and palm trees. Maintain natural shadows based on bright midday 
sunlight from above right. Keep the subjects' facial expressions and posture identical.`}
              </CodeBlock>
              <p className="mt-3">
                Note how this prompt includes:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Specific details about the target environment</li>
                <li>Instructions for preserving subjects</li>
                <li>Guidance on lighting direction</li>
                <li>Instructions for maintaining expressions and posture</li>
              </ul>
            </Step>
            
            <Step number={3} title="Use Subject Anchoring">
              <p>
                Our new Subject Anchoring feature ensures that important elements remain consistent:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Enable "Subject Anchoring" in the advanced settings</li>
                <li>Use the selection tool to highlight specific subjects to preserve</li>
                <li>Adjust the "Anchoring Strength" (higher values preserve more details)</li>
                <li>Optionally enable "Facial Expression Lock" for perfect facial preservation</li>
              </ol>
              <p className="mt-3">
                This ensures that even with dramatic environment changes, your subjects remain perfectly intact.
              </p>
            </Step>
            
            <BeforeAfterComparison
              beforeImage="/images/tutorials/office-scene-before.jpg"
              afterImage="/images/tutorials/beach-scene-after.jpg"
              beforeCaption="Original office setting"
              afterCaption="Transformed beach environment with preserved subjects"
            />
            
            <Tip type="warning">
              When transforming to dramatically different environments, use the "Environmental Adaptation" setting to subtly adjust subject lighting to match the new environment. This creates a more natural integration while still preserving subject integrity.
            </Tip>
          </TutorialSection>
          
          {/* Lighting Preservation */}
          <TutorialSection
            title="Advanced Lighting Preservation"
            icon={<FiZap className="text-primary-600" />}
          >
            <p>
              Our new lighting preservation system can extract and maintain complex lighting conditions
              when transforming scenes, ensuring consistent shadows, highlights, and color temperature.
            </p>
            
            <Step number={1} title="Analyze Existing Lighting">
              <p>
                Before transformation, take a moment to analyze the current lighting:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Direction:</strong> Where is the main light source coming from?</li>
                <li><strong>Intensity:</strong> How strong or soft is the lighting?</li>
                <li><strong>Color temperature:</strong> Warm, cool, or neutral lighting?</li>
                <li><strong>Multiple sources:</strong> Are there several light sources?</li>
                <li><strong>Special effects:</strong> Any lens flares, rim lighting, or backlighting?</li>
              </ul>
            </Step>
            
            <Step number={2} title="Set Lighting Preservation Parameters">
              <p>
                Access the new Lighting Controls in the advanced settings panel:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Set "Lighting Preservation Mode" based on your needs:
                  <ul className="list-disc ml-6 mt-1">
                    <li><strong>Strict:</strong> Maintain exact lighting conditions (best for subtle scene changes)</li>
                    <li><strong>Adaptive:</strong> Preserve main lighting characteristics but adapt to new environment</li>
                    <li><strong>Reference Only:</strong> Use original lighting as a reference but prioritize realism</li>
                  </ul>
                </li>
                <li>Adjust "Shadow Intensity" to control how prominently shadows appear</li>
                <li>Set "Color Temperature Preservation" to maintain the mood of the original lighting</li>
              </ol>
            </Step>
            
            <Step number={3} title="Use Lighting-Specific Prompts">
              <p>
                Include specific lighting instructions in your transformation prompt:
              </p>
              <CodeBlock>
{`Transform this indoor living room to a rustic cabin interior while preserving the 
exact same warm directional lighting from the window at left. Maintain the same 
shadow patterns on subjects, the golden hour color temperature, and the specific 
highlight on the coffee table. The lighting should feel identical despite the 
change in environment.`}
              </CodeBlock>
            </Step>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
              <div className="relative w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/lighting-extraction.jpg" 
                  alt="Visualization of extracted lighting information" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Extracted lighting map</p>
                </div>
              </div>
              <div className="relative w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/lighting-application.jpg" 
                  alt="Light map being applied to a new scene" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Lighting applied to new scene</p>
                </div>
              </div>
            </div>
            
            <Tip type="success">
              For scenes with complex lighting (multiple light sources, unusual colors), use the "Generate Lighting Map" feature before transformation. This creates a detailed visualization of the lighting that you can review and refine.
            </Tip>
          </TutorialSection>
          
          {/* Time-of-Day Transformations */}
          <TutorialSection
            title="Time-of-Day Transformations"
            icon={<FiImage className="text-primary-600" />}
          >
            <p>
              Changing the time of day in a scene is one of the most dramatic transformations
              and requires careful handling of lighting, shadows, and colors.
            </p>
            
            <Step number={1} title="Choose a Target Time">
              <p>
                Be specific about the target time of day in your prompt:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Golden hour:</strong> Warm, directional lighting just after dawn or before sunset</li>
                <li><strong>Midday:</strong> Strong overhead lighting with short shadows</li>
                <li><strong>Blue hour:</strong> The soft blue light just before dawn or after sunset</li>
                <li><strong>Night:</strong> Darkness with artificial lighting sources</li>
                <li><strong>Specific time:</strong> "5:30pm summer evening" or "3am with moonlight"</li>
              </ul>
            </Step>
            
            <Step number={2} title="Consider Lighting Sources">
              <p>
                For realistic time changes, think about what light sources would be present:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>For daytime to night: Add artificial lights (street lamps, building lights, etc.)</li>
                <li>For night to day: Replace artificial lights with natural sunlight</li>
                <li>For golden hour: Specify the sun's position on the horizon</li>
                <li>For mixed lighting: Balance natural and artificial sources</li>
              </ul>
            </Step>
            
            <Step number={3} title="Use Time-Specific Enhancement">
              <p>
                Enable our specialized time-of-day enhancement features:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Turn on "Time-Aware Lighting" in the advanced settings</li>
                <li>Select the appropriate "Sky Model" for your target time</li>
                <li>Set "Atmospheric Effects" to add haze, fog, or air quality changes</li>
                <li>Adjust "Exposure Compensation" to ensure proper brightness</li>
              </ol>
            </Step>
            
            <BeforeAfterComparison
              beforeImage="/images/tutorials/daytime-scene.jpg"
              afterImage="/images/tutorials/night-scene.jpg"
              beforeCaption="Original daytime scene"
              afterCaption="Transformed to night with realistic lighting"
              aspectRatio="landscape"
            />
            
            <p className="mt-6">
              Example of a well-crafted time transformation prompt:
            </p>
            <CodeBlock>
{`Transform this midday city street to late evening blue hour (just after sunset). 
The sky should have deep blue tones with some remaining orange at the horizon. 
Add appropriate city lights including shop windows, street lamps, and car headlights. 
Maintain the exact positioning and expressions of all people. Create long, soft 
shadows extending eastward. Apply a subtle blue cast to shadow areas while keeping 
artificial lights warm.`}
              </CodeBlock>
              
            <Tip type="warning">
              When transforming to night scenes, use "Exposure Balancing" to ensure subjects remain visible without appearing artificially bright. This creates the appearance of a properly exposed night photograph rather than an unnaturally bright night scene.
            </Tip>
          </TutorialSection>
          
          {/* Weather Physics */}
          <TutorialSection
            title="Realistic Weather Transformations"
            icon={<FiLayers className="text-primary-600" />}
          >
            <p>
              Our new weather physics system can add realistic weather effects that properly interact with all elements in your scene.
            </p>
            
            <Step number={1} title="Select Weather Conditions">
              <p>
                Choose the specific weather conditions you want to apply:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Precipitation:</strong> Rain (light drizzle to heavy downpour), snow, hail, sleet</li>
                <li><strong>Clouds:</strong> Partly cloudy, overcast, storm clouds, fog, mist</li>
                <li><strong>Wind effects:</strong> Gentle breeze, strong wind, gusting wind</li>
                <li><strong>Special conditions:</strong> Rainbow, lightning, dust storm, heat waves</li>
              </ul>
            </Step>
            
            <Step number={2} title="Consider Surface Interactions">
              <p>
                For realistic weather, describe how it interacts with surfaces:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>For rain: Wet surfaces, puddles, water running down objects</li>
                <li>For snow: Accumulation on surfaces, snow on branches/hair</li>
                <li>For wind: Objects and clothing moving, hair blowing</li>
                <li>For fog: Variable density, light diffusion effects</li>
              </ul>
            </Step>
            
            <Step number={3} title="Enable Weather Physics">
              <p>
                Access our specialized weather simulation features:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Enable "Physical Weather Simulation" in advanced settings</li>
                <li>Set the "Weather Intensity" level (1-10)</li>
                <li>Configure "Surface Interaction Strength"</li>
                <li>Turn on "Dynamic Light Adaptation" for weather-appropriate lighting</li>
              </ol>
            </Step>
            
            <BeforeAfterComparison
              beforeImage="/images/tutorials/clear-day-scene.jpg"
              afterImage="/images/tutorials/rainy-day-scene.jpg"
              beforeCaption="Clear day scene"
              afterCaption="Transformed to rainy weather with proper surface interactions"
            />
            
            <p className="mt-6">
              Example of a detailed weather transformation prompt:
            </p>
            <CodeBlock>
{`Transform this clear day park scene into a moderate rainfall scene. Add realistic 
rain streaks with motion blur. Create wet, reflective surfaces on the path and 
benches. Add small puddles in appropriate low areas. Make clothing and hair appear 
damp, especially on exposed areas. Darken the sky with rain clouds and reduce 
overall scene contrast. Apply a cooler color temperature and create subtle fog 
in the distance. Ensure all people have appropriate rain reactions in posture.`}
              </CodeBlock>
              
            <Tip type="success">
              When adding rain or snow, use the "Particle System Settings" to control the direction, size, and density of precipitation elements. This is particularly useful for creating dramatic weather without obscuring important subjects.
            </Tip>
          </TutorialSection>
          
          {/* Troubleshooting Common Issues */}
          <TutorialSection
            title="Troubleshooting Common Issues"
            icon={<FiAlertCircle className="text-yellow-500" />}
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-2">Unrealistic Subject Integration</h3>
                <p className="mb-2">
                  If subjects don't appear naturally integrated into the new environment:
                </p>
                <ul className="list-disc ml-6">
                  <li>Enable "Environmental Adaptation" to subtly adjust lighting on subjects</li>
                  <li>Use "Ground Plane Alignment" to ensure proper shadows and positioning</li>
                  <li>Try "Contextual Reflection" to add appropriate reflections on subjects</li>
                  <li>Explicitly mention integration in your prompt: "ensure the person appears naturally standing on the sand with appropriate shadows"</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Inconsistent Lighting Direction</h3>
                <p className="mb-2">
                  If shadows and highlights don't match between subjects and environment:
                </p>
                <ul className="list-disc ml-6">
                  <li>Use "Light Source Mapping" to identify and correct mismatched light sources</li>
                  <li>Explicitly specify light direction in your prompt</li>
                  <li>Increase "Lighting Consistency" parameter in advanced settings</li>
                  <li>Try regenerating with "Prioritize Lighting Coherence" enabled</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Perspective Distortion</h3>
                <p className="mb-2">
                  If the scene looks warped or perspective seems unnatural:
                </p>
                <ul className="list-disc ml-6">
                  <li>Enable "Enhanced 3D Calibration" for better perspective handling</li>
                  <li>Try "Camera Parameter Matching" to ensure consistent field of view</li>
                  <li>Reduce "Transformation Intensity" to create more subtle changes</li>
                  <li>Use a reference image with similar perspective to your target scene</li>
                </ul>
              </div>
            </div>
          </TutorialSection>
          
          {/* Conclusion */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p>
              With these advanced techniques and our newly enhanced 3D scene transformation system, 
              you can now create dramatically different environments while maintaining perfect 
              geometric consistency, lighting coherence, and subject integration. The improvements 
              in 3D awareness, lighting preservation, and weather physics represent a significant 
              advancement in AI-powered scene transformation.
            </p>
            <p>
              As you experiment with these capabilities, start with subtle transformations before 
              attempting more dramatic changes. Remember that the system works best when you provide 
              clear, detailed prompts that specify exactly what you want to preserve and how you want 
              elements to interact in the new environment.
            </p>
          </div>
          
          {/* Next Steps */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Next Steps</h3>
            <ul className="space-y-3">
              <li className="flex">
                <FiArrowRight className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <Link href="/tutorials/weather-time-transformation" className="text-primary-600 hover:text-primary-800">
                  Learn about detailed Weather & Time Transformations
                </Link>
              </li>
              <li className="flex">
                <FiArrowRight className="h-6 w-6 text-primary-600 mr-3 flex-shrink-0" />
                <Link href="/tutorials/multi-region-editing" className="text-primary-600 hover:text-primary-800">
                  Explore Multi-Region Editing for complex compositions
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
            <h2 className="text-3xl font-bold mb-6">Ready to transform your scenes?</h2>
            <p className="text-lg text-primary-100 mb-8">
              Put your new knowledge to work and experience the power of our 3D-aware scene transformation.
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
            'headline': '3D-Aware Scene Transformation with Nano-Banana AI',
            'description': 'Learn how to use Nano-Banana\'s enhanced scene transformation capabilities with improved 3D awareness, geometric consistency, and advanced lighting preservation.',
            'image': 'https://nano-banana.run/images/tutorials/scene-transform-new.jpg',
            'datePublished': '2025-08-12',
            'dateModified': '2025-08-12',
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
            'articleBody': 'This tutorial covers advanced scene transformation techniques using Nano-Banana\'s enhanced AI capabilities, including 3D scene representation, environment transformation, lighting preservation, and weather physics.',
            'keywords': 'scene transformation AI, 3D-aware AI, Nano-Banana tutorial, AI image editing, lighting preservation, weather effects AI'
          })
        }}
      />
    </Layout>
  );
};

export default SceneTransformationTutorial;
