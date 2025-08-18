import React from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowRight, FiCheckCircle, FiAlertCircle, FiZap, FiCpu, FiMaximize, FiMonitor, FiSmartphone } from 'react-icons/fi';

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

// Performance comparison component
const PerformanceComparison: React.FC<{
  title: string;
  before: number;
  after: number;
  unit: string;
  description?: string;
  lowerIsBetter?: boolean;
}> = ({ title, before, after, unit, description, lowerIsBetter = false }) => {
  const improvement = lowerIsBetter
    ? ((before - after) / before) * 100
    : ((after - before) / before) * 100;

  return (
    <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
      <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
      <div className="flex items-center space-x-6">
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">Before</div>
          <div className="text-xl font-bold text-gray-700">{before}{unit}</div>
        </div>
        <div className="flex-1">
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            {lowerIsBetter ? (
              <div 
                className="absolute left-0 top-0 h-full bg-primary-600 rounded-full transition-all duration-500"
                style={{ width: `${100 - (after / before * 100)}%` }}
              ></div>
            ) : (
              <div 
                className="absolute left-0 top-0 h-full bg-primary-600 rounded-full transition-all duration-500"
                style={{ width: `${after / before * 100}%` }}
              ></div>
            )}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 mb-1">After</div>
          <div className="text-xl font-bold text-primary-600">{after}{unit}</div>
        </div>
      </div>
      <div className="mt-2 flex justify-between items-center">
        <div className="text-sm text-gray-600">{description}</div>
        <div className="text-sm font-bold text-green-600">+{Math.round(improvement)}% {lowerIsBetter ? 'faster' : 'better'}</div>
      </div>
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

const PerformanceOptimizationTutorial: React.FC = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-primary-200 uppercase tracking-wider font-semibold text-sm mb-2">Technical Guide</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Performance Optimization Best Practices</h1>
            <p className="text-lg text-primary-100">
              Learn how to maximize speed and efficiency with Nano-Banana's enhanced WebGL acceleration,
              streaming processing, and smart workflow features.
            </p>
            <div className="mt-8 flex items-center text-sm">
              <span className="text-primary-200">Difficulty:</span>
              <div className="ml-2 flex space-x-1">
                <div className="w-4 h-1 rounded-full bg-white opacity-100"></div>
                <div className="w-4 h-1 rounded-full bg-white opacity-100"></div>
                <div className="w-4 h-1 rounded-full bg-white opacity-0"></div>
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
              Our latest update brings significant performance improvements to Nano-Banana, 
              with processing speeds up to 40% faster and more efficient handling of large images.
              These improvements are powered by our new WebGL acceleration, streaming processing,
              and intelligent workflow optimization features.
            </p>
            <p>
              In this guide, we'll show you how to take full advantage of these enhancements
              to get the best possible performance, even when working with complex edits
              and high-resolution images.
            </p>
          </div>
          
          {/* Performance Improvements Overview */}
          <TutorialSection
            title="What's New in Performance"
            icon={<FiZap className="text-primary-600" />}
          >
            <p>
              Before diving into specific optimizations, let's look at the key performance
              improvements in our latest update:
            </p>
            
            <div className="space-y-6 my-8">
              <PerformanceComparison
                title="Processing Speed"
                before={5}
                after={3}
                unit=" sec"
                description="Average time to process a standard image"
                lowerIsBetter={true}
              />
              
              <PerformanceComparison
                title="Maximum Image Size"
                before={25}
                after={50}
                unit="MB"
                description="Maximum supported image file size"
              />
              
              <PerformanceComparison
                title="Memory Usage"
                before={450}
                after={320}
                unit="MB"
                description="Peak memory usage during processing"
                lowerIsBetter={true}
              />
              
              <PerformanceComparison
                title="Steps Required"
                before={8}
                after={6}
                unit=""
                description="Average steps needed to complete an edit"
                lowerIsBetter={true}
              />
            </div>
            
            <p>
              These improvements are powered by several key technologies:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>WebGL Acceleration:</strong> Leveraging your GPU for faster processing through browser-based graphics acceleration.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Streaming Processing:</strong> Breaking large images into chunks that can be processed simultaneously.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Smart Parameter Detection:</strong> Automatically detecting optimal parameters based on image content.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Progressive Loading:</strong> Loading only the essential parts of models first, then additional components as needed.
                </span>
              </li>
              <li className="flex items-start">
                <FiCheckCircle className="h-6 w-6 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Intelligent Caching:</strong> Storing frequently used model components and results for faster subsequent operations.
                </span>
              </li>
            </ul>
          </TutorialSection>
          
          {/* WebGL Acceleration */}
          <TutorialSection
            title="Maximizing WebGL Acceleration"
            icon={<FiCpu className="text-primary-600" />}
          >
            <p>
              WebGL acceleration is one of our most significant performance improvements,
              allowing the system to leverage your device's GPU for faster processing.
              Here's how to ensure you're getting the most from this feature:
            </p>
            
            <Step number={1} title="Check WebGL Compatibility">
              <p>
                First, make sure your browser and hardware support WebGL acceleration:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Compatible browsers:</strong> Chrome 9+, Firefox 4+, Safari 5.1+, Edge 12+</li>
                <li><strong>GPU requirements:</strong> Any modern GPU from the last 5 years should work</li>
                <li><strong>Check status:</strong> The system will automatically detect compatibility when you load the generator</li>
              </ul>
              <p className="mt-3">
                You can also check your WebGL status in the Performance panel of the generator interface.
              </p>
            </Step>
            
            <Step number={2} title="Enable Hardware Acceleration">
              <p>
                Ensure hardware acceleration is enabled in your browser:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium mb-1">Chrome:</p>
                  <ol className="list-decimal ml-5 text-sm">
                    <li>Settings → Advanced → System</li>
                    <li>Enable "Use hardware acceleration when available"</li>
                    <li>Relaunch Chrome</li>
                  </ol>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium mb-1">Firefox:</p>
                  <ol className="list-decimal ml-5 text-sm">
                    <li>Options → Performance</li>
                    <li>Uncheck "Use recommended performance settings"</li>
                    <li>Check "Use hardware acceleration when available"</li>
                    <li>Restart Firefox</li>
                  </ol>
                </div>
              </div>
            </Step>
            
            <Step number={3} title="Optimize WebGL Settings">
              <p>
                In the generator's Advanced Settings panel, you can optimize WebGL performance:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>WebGL Precision:</strong> Choose between "High" (better quality) and "Medium" (better performance)</li>
                <li><strong>Max Texture Size:</strong> Set according to your GPU capabilities (the system will recommend a value)</li>
                <li><strong>Parallel Processing:</strong> Enable to utilize multiple GPU cores (recommended for most systems)</li>
                <li><strong>Memory Management:</strong> Choose between "Performance" or "Balanced" based on your system</li>
              </ul>
            </Step>
            
            <div className="relative w-full h-64 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/webgl-settings.jpg" 
                alt="WebGL settings panel in the generator interface" 
                fill
                className="object-contain"
              />
            </div>
            
            <Tip type="success">
              If you experience any performance issues with WebGL enabled, try updating your graphics drivers to the latest version. This can significantly improve compatibility and performance.
            </Tip>
            
            <Tip type="warning">
              On systems with integrated graphics (like many laptops), consider closing other GPU-intensive applications before running complex edits. This ensures more GPU memory is available for Nano-Banana.
            </Tip>
          </TutorialSection>
          
          {/* Large Image Processing */}
          <TutorialSection
            title="Processing Large Images Efficiently"
            icon={<FiMaximize className="text-primary-600" />}
          >
            <p>
              Our new streaming processing technology allows you to work with images up to 50MB
              in size without running into memory issues. Here's how to optimize processing for large images:
            </p>
            
            <Step number={1} title="Enable Streaming Processing">
              <p>
                For images larger than 10MB, the system automatically enables streaming processing.
                You can manually control this feature:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>In the generator interface, click on "Advanced Settings"</li>
                <li>Find the "Image Processing" section</li>
                <li>Toggle "Streaming Processing" on</li>
                <li>Adjust the "Chunk Size" based on your system's capabilities:
                  <ul className="list-disc ml-6 mt-1">
                    <li><strong>Small (1024px):</strong> For lower-end systems</li>
                    <li><strong>Medium (2048px):</strong> Default, good balance for most systems</li>
                    <li><strong>Large (4096px):</strong> For high-end systems with powerful GPUs</li>
                  </ul>
                </li>
              </ol>
            </Step>
            
            <Step number={2} title="Optimize Pre-Processing">
              <p>
                For the fastest processing of large images, consider these pre-processing steps:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Remove unnecessary metadata:</strong> Use the "Strip Metadata" option</li>
                <li><strong>Choose appropriate quality:</strong> For drafts and tests, use "Draft Mode" which processes at lower resolution first</li>
                <li><strong>Optimize color depth:</strong> For most edits, 8-bit color is sufficient and processes faster</li>
                <li><strong>Consider downsampling:</strong> If ultimate resolution isn't critical, enable "Smart Downsampling"</li>
              </ul>
            </Step>
            
            <Step number={3} title="Monitor Progress and Resources">
              <p>
                When processing large images, use the built-in monitoring tools:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>The progress bar shows both overall progress and individual chunk progress</li>
                <li>The resource monitor displays GPU and CPU utilization</li>
                <li>Memory usage indicator helps identify potential bottlenecks</li>
              </ul>
              <p className="mt-3">
                If you see memory usage approaching 90%, consider increasing chunk size or enabling "Conservative Memory Mode".
              </p>
            </Step>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/chunk-processing.jpg" 
                  alt="Visualization of chunk processing" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Image divided into processing chunks</p>
                </div>
              </div>
              <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/resource-monitor.jpg" 
                  alt="Resource monitoring interface" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Resource monitoring interface</p>
                </div>
              </div>
            </div>
            
            <Tip type="success">
              For extremely large images (larger than 30MB), try the new "Progressive Detail" mode. This processes the image at increasing levels of detail, allowing you to see initial results quickly and decide whether to continue or adjust your approach.
            </Tip>
          </TutorialSection>
          
          {/* Smart Workflow Optimization */}
          <TutorialSection
            title="Smart Workflow Optimization"
            icon={<FiZap className="text-primary-600" />}
          >
            <p>
              Our new smart workflow features can reduce the number of steps needed to achieve
              optimal results by automatically detecting ideal parameters for your specific image.
            </p>
            
            <Step number={1} title="Enable Smart Parameter Detection">
              <p>
                The system can automatically analyze your image and recommend optimal settings:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>In any editing mode, toggle on "Smart Workflow" at the top of the options panel</li>
                <li>After uploading an image, click "Analyze Image" to have the system detect optimal parameters</li>
                <li>Review the suggested parameters and adjust as needed</li>
                <li>Enable "Parameter Memory" to have the system remember your preferences</li>
              </ol>
            </Step>
            
            <Step number={2} title="Use Operation Presets">
              <p>
                For common editing scenarios, use our optimized presets:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Text Replacement Presets:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    <li>Simple Text: For basic text on clean backgrounds</li>
                    <li>Artistic Font: For decorative and complex typography</li>
                    <li>Product Label: Optimized for product packaging</li>
                  </ul>
                </li>
                <li><strong>Scene Transformation Presets:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    <li>Indoor to Outdoor: Optimized for changing interior to exterior scenes</li>
                    <li>Weather Change: For adding rain, snow, or other weather effects</li>
                    <li>Time of Day: For changing lighting conditions</li>
                  </ul>
                </li>
                <li><strong>Style Transfer Presets:</strong>
                  <ul className="list-disc ml-6 mt-1">
                    <li>Painting Styles: Various artistic painting styles</li>
                    <li>Photography Styles: Different photographic looks</li>
                    <li>Material Change: For changing object materials</li>
                  </ul>
                </li>
              </ul>
            </Step>
            
            <Step number={3} title="Implement One-Click Workflows">
              <p>
                For maximum efficiency, set up one-click workflows for your common tasks:
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>Perform a typical edit with your preferred settings</li>
                <li>Click "Save Workflow" in the advanced panel</li>
                <li>Name your workflow and add a description</li>
                <li>Next time, select it from your saved workflows to apply all settings at once</li>
              </ol>
              <p className="mt-3">
                You can create workflows for specific types of edits or specific types of images.
              </p>
            </Step>
            
            <div className="relative w-full h-64 my-8 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                src="/images/tutorials/smart-workflow.jpg" 
                alt="Smart workflow interface showing parameter detection" 
                fill
                className="object-contain"
              />
            </div>
            
            <Tip type="warning">
              While smart parameter detection works well in most cases, it may not always deliver optimal results for very unusual or artistic images. For these cases, you may need to fine-tune parameters manually.
            </Tip>
          </TutorialSection>
          
          {/* Device-Specific Optimization */}
          <TutorialSection
            title="Device-Specific Optimization"
            icon={<FiMonitor className="text-primary-600" />}
          >
            <h3 className="text-xl font-semibold mt-6 mb-3">Desktop Performance Tips</h3>
            <p>
              For desktop computers, consider these additional optimizations:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Browser choice:</strong> Chrome and Edge typically offer the best WebGL performance</li>
              <li><strong>Multi-monitor setup:</strong> If using multiple monitors, run Nano-Banana on your primary display connected to your dedicated GPU</li>
              <li><strong>Background applications:</strong> Close resource-intensive applications, especially other GPU-heavy programs</li>
              <li><strong>Browser extensions:</strong> Disable unnecessary browser extensions, especially ad blockers or privacy tools that might interfere with WebGL</li>
              <li><strong>Tab management:</strong> Keep other browser tabs to a minimum when processing large images</li>
            </ul>
            
            <h3 className="text-xl font-semibold mt-8 mb-3">Mobile and Tablet Optimization</h3>
            <p>
              When using Nano-Banana on mobile devices:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Enable Mobile Mode:</strong> Toggle on "Optimize for Mobile" in settings</li>
              <li><strong>Use Progressive Loading:</strong> This loads essential components first</li>
              <li><strong>Limit image size:</strong> Keep input images under 10MB on most mobile devices</li>
              <li><strong>Battery optimization:</strong> Connect to power when processing large or complex edits</li>
              <li><strong>Memory management:</strong> Close other apps before running complex operations</li>
              <li><strong>Safari users:</strong> Enable "WebGL 2.0" in Safari Experimental Features (iOS)</li>
            </ul>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/desktop-optimization.jpg" 
                  alt="Desktop performance settings" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Desktop performance settings</p>
                </div>
              </div>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src="/images/tutorials/mobile-optimization.jpg" 
                  alt="Mobile optimization interface" 
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs text-center">Mobile optimization interface</p>
                </div>
              </div>
            </div>
          </TutorialSection>
          
          {/* Troubleshooting Common Performance Issues */}
          <TutorialSection
            title="Troubleshooting Common Performance Issues"
            icon={<FiAlertCircle className="text-yellow-500" />}
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-2">Slow Processing Speed</h3>
                <p className="mb-2">
                  If you experience slower than expected processing:
                </p>
                <ul className="list-disc ml-6">
                  <li>Check if WebGL is properly enabled (verify in browser settings)</li>
                  <li>Reduce image size or enable "Smart Downsampling"</li>
                  <li>Close other resource-intensive applications</li>
                  <li>Try switching to "Conservative Processing Mode" in advanced settings</li>
                  <li>Check browser console for WebGL errors or warnings</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Browser Crashes or Freezes</h3>
                <p className="mb-2">
                  If your browser becomes unresponsive during processing:
                </p>
                <ul className="list-disc ml-6">
                  <li>Reduce "Max Texture Size" in WebGL settings</li>
                  <li>Enable "Memory-Safe Mode" which uses more conservative memory allocation</li>
                  <li>Process very large images in smaller sections using the crop tool</li>
                  <li>Disable browser extensions that might interfere with WebGL</li>
                  <li>Try a different browser (Chrome or Edge often have the best WebGL support)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">Poor Quality Results with Optimization</h3>
                <p className="mb-2">
                  If optimized processing produces lower quality results:
                </p>
                <ul className="list-disc ml-6">
                  <li>Increase "Quality Priority" in the performance settings</li>
                  <li>Disable "Draft Mode" for final renders</li>
                  <li>Ensure "Precision" is set to "High" in WebGL settings</li>
                  <li>Try "Quality-Focused Processing" preset</li>
                  <li>For text replacement, increase "Font Rendering Quality" specifically</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-xl mb-2">WebGL Not Available</h3>
                <p className="mb-2">
                  If WebGL acceleration isn't working:
                </p>
                <ul className="list-disc ml-6">
                  <li>Check browser compatibility at <a href="https://get.webgl.org" className="text-primary-600 hover:text-primary-800">https://get.webgl.org</a></li>
                  <li>Update graphics drivers to the latest version</li>
                  <li>Enable hardware acceleration in browser settings</li>
                  <li>Try a different browser</li>
                  <li>The system will fall back to CPU processing automatically, but will be slower</li>
                </ul>
              </div>
            </div>
          </TutorialSection>
          
          {/* Advanced Configuration */}
          <TutorialSection
            title="Advanced Performance Configuration"
            icon={<FiCpu className="text-primary-600" />}
          >
            <p>
              For users who need maximum control over performance, you can access advanced
              configuration options that are hidden by default:
            </p>
            
            <CodeBlock>
{`// To access the advanced configuration panel
1. Open the developer console (F12 or Cmd+Option+I)
2. Enter the following command:
nano.enableAdvancedPerformanceOptions()
3. Refresh the page`}
            </CodeBlock>
            
            <p className="mt-3">
              This unlocks additional options in the Performance panel:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Memory Allocation Control:</strong> Fine-tune how memory is allocated for different operations</li>
              <li><strong>Shader Complexity:</strong> Choose between different shader presets for various quality/performance tradeoffs</li>
              <li><strong>Batch Size Control:</strong> Adjust the number of operations processed in each batch</li>
              <li><strong>Thread Management:</strong> Control how processing is distributed across available threads</li>
              <li><strong>Precision Controls:</strong> Set specific numerical precision for different operations</li>
            </ul>
            <p className="mt-3">
              These advanced settings should only be adjusted if you understand their impact.
              Incorrect settings can cause processing failures or poor results.
            </p>
            
            <Tip type="warning">
              Advanced configuration changes are stored in your browser's local storage. If you experience any issues after making advanced changes, you can reset to defaults by running <code>nano.resetPerformanceOptions()</code> in the developer console.
            </Tip>
          </TutorialSection>
          
          {/* Conclusion */}
          <div className="prose prose-lg max-w-none mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
            <p>
              Our latest performance optimizations represent a significant leap forward in image
              processing capabilities. By leveraging WebGL acceleration, streaming processing, and
              smart workflow features, Nano-Banana now delivers faster results with less manual
              configuration, even for complex editing tasks and large images.
            </p>
            <p>
              Remember that performance can vary based on your specific hardware, browser,
              and the complexity of your edits. Take some time to experiment with different
              settings to find the optimal configuration for your particular setup and workflow.
            </p>
            <p>
              As we continue to refine our performance optimizations, we welcome your feedback
              on what works best for your specific use cases.
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
                <Link href="/tutorials/multi-region-editing" className="text-primary-600 hover:text-primary-800">
                  Explore our Multi-Region Editing capabilities
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
            <h2 className="text-3xl font-bold mb-6">Experience the performance boost</h2>
            <p className="text-lg text-primary-100 mb-8">
              Try our enhanced processing features and see the difference in speed and efficiency.
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
            'headline': 'Performance Optimization Best Practices for Nano-Banana AI',
            'description': 'Learn how to maximize speed and efficiency with Nano-Banana\'s enhanced WebGL acceleration, streaming processing, and smart workflow features.',
            'image': 'https://nano-banana.run/images/tutorials/webgl-settings.jpg',
            'datePublished': '2025-08-08',
            'dateModified': '2025-08-08',
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
            'articleSection': 'Technical Guide',
            'articleBody': 'This guide covers performance optimization techniques for Nano-Banana\'s AI image editing features, including WebGL acceleration, streaming processing, and smart workflow optimization.',
            'keywords': 'performance optimization, WebGL acceleration, streaming processing, image editing performance, Nano-Banana tutorial'
          })
        }}
      />
    </Layout>
  );
};

export default PerformanceOptimizationTutorial;
