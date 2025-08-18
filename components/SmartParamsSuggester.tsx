import React, { useState, useEffect } from 'react';
import { useApi } from '../lib/api/useApi';
import { EditParameters } from '../lib/workflow/WorkflowOptimizer';
import { FiZap, FiSettings, FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

interface SmartParamsSuggesterProps {
  image?: File | Blob;
  editType: 'text' | 'scene' | 'style' | 'object';
  onParamsSelected?: (params: EditParameters) => void;
  initialParams?: Partial<EditParameters>;
  isAutomatic?: boolean;
}

/**
 * A component that suggests optimal parameters for image processing
 * based on image analysis and edit type
 */
const SmartParamsSuggester: React.FC<SmartParamsSuggesterProps> = ({
  image,
  editType,
  onParamsSelected,
  initialParams = {},
  isAutomatic = true
}) => {
  // States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestedParams, setSuggestedParams] = useState<EditParameters | null>(null);
  const [selectedParams, setSelectedParams] = useState<Partial<EditParameters>>(initialParams);
  const [error, setError] = useState<string | null>(null);
  const [showParameters, setShowParameters] = useState(false);
  
  // API hook
  const { getOptimalParameters } = useApi({
    onError: (err) => {
      setError(`Failed to analyze image: ${err.message}`);
      setIsAnalyzing(false);
    }
  });
  
  // Analyze image and get optimal parameters
  const analyzeImage = async () => {
    if (!image) {
      setError('No image provided for analysis');
      return;
    }
    
    try {
      setError(null);
      setIsAnalyzing(true);
      
      const response = await getOptimalParameters(image, editType);
      
      if (response.data) {
        setSuggestedParams(response.data);
        
        // If automatic, apply the suggested parameters immediately
        if (isAutomatic) {
          setSelectedParams(response.data);
          if (onParamsSelected) {
            onParamsSelected(response.data);
          }
        }
      } else {
        throw new Error('No parameters returned');
      }
    } catch (err) {
      setError(`Failed to analyze image: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  // Apply suggested parameters
  const applyParameters = () => {
    if (suggestedParams && onParamsSelected) {
      setSelectedParams(suggestedParams);
      onParamsSelected(suggestedParams);
    }
  };
  
  // Handle individual parameter changes
  const handleParamChange = (
    paramName: keyof EditParameters | string, 
    value: number | string | boolean
  ) => {
    // Handle nested parameters
    if (paramName.includes('.')) {
      const [parent, child] = paramName.split('.');
      setSelectedParams(prev => {
        // Get the parent object or create an empty one if it doesn't exist
        const parentObj = prev[parent as keyof typeof prev] as Record<string, any> || {};
        
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: value
          }
        };
      });
    } else {
      setSelectedParams(prev => ({
        ...prev,
        [paramName]: value
      }));
    }
  };
  
  // Apply changes to parent component
  useEffect(() => {
    if (onParamsSelected && Object.keys(selectedParams).length > 0) {
      onParamsSelected(selectedParams as EditParameters);
    }
  }, [selectedParams, onParamsSelected]);
  
  // Analyze when image changes
  useEffect(() => {
    if (image && isAutomatic) {
      analyzeImage();
    }
  }, [image, editType]);
  
  // Format parameter name for display
  const formatParamName = (name: string) => {
    return name
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
  };
  
  // Determine if parameters are available
  const hasParameters = suggestedParams || Object.keys(selectedParams).length > 0;
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div className="flex items-center">
          <FiZap className="text-yellow-500 mr-2" />
          <h3 className="font-medium">Smart Parameters</h3>
        </div>
        <div className="flex items-center">
          {!isAutomatic && image && (
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className={`mr-2 text-xs px-2 py-1 rounded
                ${isAnalyzing 
                  ? 'bg-gray-200 text-gray-500' 
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'}
              `}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
            </button>
          )}
          {hasParameters && (
            <button
              onClick={() => setShowParameters(!showParameters)}
              className="p-1.5 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
            >
              <FiSettings size={16} />
            </button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {/* Analyzing state */}
        {isAnalyzing && (
          <div className="text-center py-2">
            <div className="animate-pulse flex space-x-4 items-center justify-center">
              <div className="rounded-full bg-gray-300 h-3 w-3"></div>
              <div className="rounded-full bg-gray-300 h-3 w-3"></div>
              <div className="rounded-full bg-gray-300 h-3 w-3"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">Analyzing image to determine optimal parameters...</p>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* No image state */}
        {!image && !isAnalyzing && !error && (
          <div className="text-center py-2">
            <FiInfo className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Upload an image to get smart parameter suggestions</p>
          </div>
        )}
        
        {/* Parameter display */}
        {hasParameters && (
          <div>
            {!showParameters ? (
              <div className="text-center py-2">
                {suggestedParams ? (
                  <>
                    <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <FiCheck className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-green-700">
                            Smart parameters have been {isAutomatic ? 'automatically' : ''} applied
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-center">
                      <button
                        onClick={() => setShowParameters(true)}
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium"
                      >
                        View Parameters
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    {isAutomatic ? 
                      'Smart parameters will be applied automatically when an image is uploaded.' :
                      'Click "Analyze Image" to get parameter suggestions.'}
                  </p>
                )}
              </div>
            ) : (
              <>
                {/* Parameters that can be adjusted */}
                <div className="space-y-4">
                  {/* Main parameters */}
                  <div className="space-y-3">
                    {/* Precision */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1 flex justify-between">
                        <span>Precision</span>
                        <span className="text-gray-500">{Math.round((selectedParams.precision || 0) * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={selectedParams.precision || 0}
                        onChange={(e) => handleParamChange('precision', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {/* Preservation Strength */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1 flex justify-between">
                        <span>Preservation Strength</span>
                        <span className="text-gray-500">{Math.round((selectedParams.preservationStrength || 0) * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={selectedParams.preservationStrength || 0}
                        onChange={(e) => handleParamChange('preservationStrength', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    
                    {/* Style Strength (for style transfer) */}
                    {editType === 'style' && (
                      <div>
                        <label className="block text-sm text-gray-700 mb-1 flex justify-between">
                          <span>Style Strength</span>
                          <span className="text-gray-500">{Math.round((selectedParams.styleStrength || 0) * 100)}%</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={selectedParams.styleStrength || 0}
                          onChange={(e) => handleParamChange('styleStrength', parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                    
                    {/* Enhancement Level */}
                    <div>
                      <label className="block text-sm text-gray-700 mb-1 flex justify-between">
                        <span>Enhancement Level</span>
                        <span className="text-gray-500">{Math.round((selectedParams.enhancementLevel || 0) * 100)}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={selectedParams.enhancementLevel || 0}
                        onChange={(e) => handleParamChange('enhancementLevel', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  {/* Advanced parameters based on edit type */}
                  <div className="border-t border-gray-200 pt-3">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Advanced Parameters</h4>
                    
                    <div className="space-y-2">
                      {selectedParams.additionalParams && Object.entries(selectedParams.additionalParams).map(([key, value]) => {
                        // Only render numeric parameters with sliders
                        if (typeof value === 'number') {
                          return (
                            <div key={key}>
                              <label className="block text-xs text-gray-700 mb-1 flex justify-between">
                                <span>{formatParamName(key)}</span>
                                <span className="text-gray-500">{Math.round(value * 100)}%</span>
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={value}
                                onChange={(e) => handleParamChange(`additionalParams.${key}`, parseFloat(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                              />
                            </div>
                          );
                        } else if (typeof value === 'boolean') {
                          return (
                            <div key={key} className="flex items-center justify-between">
                              <label className="text-xs text-gray-700">{formatParamName(key)}</label>
                              <div className="relative inline-flex items-center cursor-pointer">
                                <input 
                                  type="checkbox" 
                                  checked={value} 
                                  onChange={(e) => handleParamChange(`additionalParams.${key}`, e.target.checked)}
                                  className="sr-only peer" 
                                />
                                <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setShowParameters(false)}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      Hide Parameters
                    </button>
                    
                    {suggestedParams && (
                      <button
                        onClick={applyParameters}
                        className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                      >
                        Reset to Suggested
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartParamsSuggester;
