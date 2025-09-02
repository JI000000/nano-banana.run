import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  FiZap as FiLightbulb, 
  FiTrendingUp, 
  FiStar, 
  FiZap, 
  FiCheck, 
  FiX, 
  FiChevronDown, 
  FiChevronUp, 
  FiFilter, 
  FiSearch 
} from 'react-icons/fi';
import { SmartPromptService, PromptSuggestion, IndustryTemplate } from '../lib/smart-prompts/SmartPromptService';

interface SmartPromptSuggesterProps {
  onPromptSelected: (prompt: string) => void;
  currentPrompt?: string;
  userIndustry?: string;
  preferredStyle?: string;
  qualityLevel?: string;
  userId?: string;
  className?: string;
}

export default function SmartPromptSuggester({
  onPromptSelected,
  currentPrompt = '',
  userIndustry,
  preferredStyle,
  qualityLevel,
  userId,
  className = ''
}: SmartPromptSuggesterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState<PromptSuggestion[]>([]);
  const [industryTemplates, setIndustryTemplates] = useState<IndustryTemplate[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string>(userIndustry || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<IndustryTemplate | null>(null);

  // Mock SmartPromptService - in production, this would be injected
  const smartPromptService = useMemo(() => new SmartPromptService({} as any), []);

  const loadSuggestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const context = {
        userIndustry: selectedIndustry || userIndustry,
        preferredStyle,
        qualityLevel,
        userId
      };
      
      const newSuggestions = await smartPromptService.getSmartSuggestions(context);
      setSuggestions(newSuggestions);
    } catch (error) {
      console.error('Failed to load suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedIndustry, userIndustry, preferredStyle, qualityLevel, userId, smartPromptService]);

  // Load suggestions when component mounts or context changes
  useEffect(() => {
    loadSuggestions();
  }, [loadSuggestions]);

  // Load industry templates
  useEffect(() => {
    if (selectedIndustry) {
      const templates = smartPromptService.getIndustryTemplates(selectedIndustry);
      setIndustryTemplates(templates);
    }
  }, [selectedIndustry, smartPromptService]);

  const handlePromptSelect = useCallback((prompt: string) => {
    onPromptSelected(prompt);
    // Track user behavior
    if (userId) {
      smartPromptService.trackUserBehavior(userId, {
        promptHistory: [prompt],
        industryFocus: selectedIndustry ? [selectedIndustry] : []
      });
    }
  }, [onPromptSelected, userId, selectedIndustry, smartPromptService]);

  const handleTemplateSelect = useCallback((template: IndustryTemplate) => {
    setSelectedTemplate(template);
    // Generate prompt from template
    let generatedPrompt = template.basePrompt;
    template.variables.forEach(variable => {
      generatedPrompt = generatedPrompt.replace(`{${variable.name}}`, variable.defaultValue);
    });
    handlePromptSelect(generatedPrompt);
  }, [handlePromptSelect]);

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         suggestion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || suggestion.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const availableIndustries = smartPromptService.getAvailableIndustries();

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <FiLightbulb className="w-5 h-5 text-primary-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Smart Prompt Suggestions</h3>
            <p className="text-sm text-gray-500">AI-powered prompt recommendations</p>
          </div>
        </div>
        {isExpanded ? (
          <FiChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Industry Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Industry Focus</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Industry</option>
              {availableIndustries.map(industry => (
                <option key={industry} value={industry}>
                  {industry.charAt(0).toUpperCase() + industry.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Templates */}
          {selectedIndustry && industryTemplates.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center">
                <FiStar className="w-4 h-4 mr-2 text-yellow-500" />
                Industry Templates
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {industryTemplates.map(template => (
                  <div
                    key={template.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 text-sm">{template.name}</h5>
                        <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {template.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">{template.estimatedTime}</span>
                        </div>
                      </div>
                      <FiZap className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search suggestions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <FiFilter className="w-4 h-4 text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="industry-template">Industry Templates</option>
                <option value="style-based">Style Based</option>
                <option value="quality-based">Quality Based</option>
                <option value="user-behavior">Personalized</option>
              </select>
            </div>
          </div>

          {/* Suggestions List */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center">
              <FiTrendingUp className="w-4 h-4 mr-2 text-green-500" />
              Smart Suggestions
              {isLoading && <span className="ml-2 text-sm text-gray-500">Loading...</span>}
            </h4>
            
            {filteredSuggestions.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <FiLightbulb className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No suggestions found. Try adjusting your filters or industry selection.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {filteredSuggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer group"
                    onClick={() => handlePromptSelect(suggestion.prompt)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 group-hover:text-primary-700 transition-colors">
                          {suggestion.prompt}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {suggestion.category}
                          </span>
                          {suggestion.industry && (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                              {suggestion.industry}
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            {Math.round(suggestion.confidence * 100)}% confidence
                          </span>
                        </div>
                      </div>
                      <FiCheck className="w-4 h-4 text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <button
                onClick={loadSuggestions}
                disabled={isLoading}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors text-sm"
              >
                {isLoading ? 'Refreshing...' : 'Refresh Suggestions'}
              </button>
              <button
                onClick={() => setIsExpanded(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
