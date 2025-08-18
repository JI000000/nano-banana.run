import React, { useState, useRef, useEffect } from 'react';
import { RegionDefinition } from '../lib/api/ApiService';
import { FiPlus, FiTrash, FiMove, FiMaximize, FiCircle, FiEdit, FiStar, FiX, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid'; // You may need to install this: npm install uuid

interface RegionSelectorProps {
  imageUrl: string;
  regions: RegionDefinition[];
  onChange: (regions: RegionDefinition[]) => void;
  maxRegions?: number;
}

// Point coordinates
interface Point {
  x: number;
  y: number;
}

// Selection mode
type SelectionMode = 'rectangle' | 'ellipse' | 'polygon' | 'freeform' | 'smart' | null;

/**
 * A component for selecting regions on an image
 */
const RegionSelector: React.FC<RegionSelectorProps> = ({
  imageUrl,
  regions,
  onChange,
  maxRegions = 5
}) => {
  // Selection mode
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(null);
  
  // State for drawing in progress
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<Point[]>([]);
  const [currentRegion, setCurrentRegion] = useState<string | null>(null);
  
  // State for editing region name/prompt
  const [editingRegionId, setEditingRegionId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [editField, setEditField] = useState<'name' | 'prompt'>('name');
  
  // Refs for handling canvas operations
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  
  // Canvas dimensions
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  
  // Load image and setup canvas
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    
    img.onload = () => {
      // Get container dimensions
      const container = containerRef.current;
      if (!container) return;
      
      // Maintain aspect ratio but fit within container
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      const imgAspectRatio = img.width / img.height;
      const containerAspectRatio = containerWidth / containerHeight;
      
      let canvasWidth, canvasHeight;
      
      if (imgAspectRatio > containerAspectRatio) {
        // Image is wider than container
        canvasWidth = containerWidth;
        canvasHeight = containerWidth / imgAspectRatio;
      } else {
        // Image is taller than container
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * imgAspectRatio;
      }
      
      setCanvasDimensions({
        width: canvasWidth,
        height: canvasHeight
      });
      
      imageRef.current = img;
      
      // Draw the image and regions
      drawCanvas();
    };
  }, [imageUrl, regions]);
  
  // Draw canvas with image and regions
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img) return;
    
    // Set canvas dimensions
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw image
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Apply semi-transparent overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw existing regions
    regions.forEach((region, index) => {
      const isSelected = region.id === currentRegion;
      
      // Set drawing style based on region type
      ctx.strokeStyle = isSelected ? '#3b82f6' : '#10b981';
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.fillStyle = isSelected ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.2)';
      
      // Scale coordinates to canvas size
      const scaledCoords = region.coordinates.map(([x, y]) => [
        (x * canvas.width),
        (y * canvas.height)
      ]);
      
      // Draw region based on type
      if (region.type === 'rectangle') {
        const [x, y] = scaledCoords[0];
        const [x2, y2] = scaledCoords[1];
        const width = x2 - x;
        const height = y2 - y;
        
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
        ctx.fill();
      } else if (region.type === 'ellipse') {
        const [centerX, centerY] = scaledCoords[0];
        const [radiusX, radiusY] = [
          Math.abs(scaledCoords[1][0] - centerX),
          Math.abs(scaledCoords[1][1] - centerY)
        ];
        
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
      } else if (region.type === 'polygon' || region.type === 'freeform' || region.type === 'smart') {
        if (scaledCoords.length < 3) return; // Need at least 3 points for a polygon
        
        ctx.beginPath();
        ctx.moveTo(scaledCoords[0][0], scaledCoords[0][1]);
        
        for (let i = 1; i < scaledCoords.length; i++) {
          ctx.lineTo(scaledCoords[i][0], scaledCoords[i][1]);
        }
        
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }
      
      // Draw region name
      const centerPoint = getRegionCenter(scaledCoords);
      ctx.fillStyle = 'white';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(region.name || `Region ${index + 1}`, centerPoint.x, centerPoint.y);
    });
    
    // Draw region being created
    if (isDrawing && currentPoints.length > 0) {
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      
      if (selectionMode === 'rectangle' && currentPoints.length === 2) {
        const [startPoint, endPoint] = currentPoints;
        const width = endPoint.x - startPoint.x;
        const height = endPoint.y - startPoint.y;
        
        ctx.beginPath();
        ctx.rect(startPoint.x, startPoint.y, width, height);
        ctx.stroke();
        ctx.fill();
      } else if (selectionMode === 'ellipse' && currentPoints.length === 2) {
        const [centerPoint, radiusPoint] = currentPoints;
        const radiusX = Math.abs(radiusPoint.x - centerPoint.x);
        const radiusY = Math.abs(radiusPoint.y - centerPoint.y);
        
        ctx.beginPath();
        ctx.ellipse(centerPoint.x, centerPoint.y, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
      } else if ((selectionMode === 'polygon' || selectionMode === 'freeform') && currentPoints.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
        
        for (let i = 1; i < currentPoints.length; i++) {
          ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
        }
        
        if (selectionMode === 'polygon') {
          // For polygon, connect back to mouse position
          const lastPoint = currentPoints[currentPoints.length - 1];
          ctx.lineTo(lastPoint.x, lastPoint.y);
        }
        
        ctx.stroke();
        ctx.fill();
      }
    }
  };
  
  // Calculate region center for label placement
  const getRegionCenter = (coordinates: number[][]) => {
    let sumX = 0;
    let sumY = 0;
    
    coordinates.forEach(([x, y]) => {
      sumX += x;
      sumY += y;
    });
    
    return {
      x: sumX / coordinates.length,
      y: sumY / coordinates.length
    };
  };
  
  // Canvas event handlers
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectionMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get mouse coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Start drawing
    setIsDrawing(true);
    
    if (selectionMode === 'rectangle') {
      // For rectangle, we need start and end points
      setCurrentPoints([{ x, y }]);
    } else if (selectionMode === 'ellipse') {
      // For ellipse, first point is center
      setCurrentPoints([{ x, y }]);
    } else if (selectionMode === 'polygon') {
      // For polygon, add point to array
      if (currentPoints.length === 0) {
        setCurrentPoints([{ x, y }]);
      } else {
        setCurrentPoints([...currentPoints, { x, y }]);
        
        // Check if polygon is being closed
        const firstPoint = currentPoints[0];
        const distance = Math.sqrt(Math.pow(x - firstPoint.x, 2) + Math.pow(y - firstPoint.y, 2));
        
        if (currentPoints.length > 2 && distance < 10) {
          // Close polygon and create region
          finalizeRegion();
        }
      }
    } else if (selectionMode === 'freeform') {
      // For freeform, start with first point
      setCurrentPoints([{ x, y }]);
    } else if (selectionMode === 'smart') {
      // For smart selection, this would typically call an AI service
      // For now, we'll simulate with a circle around the clicked point
      const radius = 50; // This would be determined by AI in real implementation
      const points = [];
      
      // Create a circle of points
      for (let angle = 0; angle < 360; angle += 10) {
        const radians = (angle * Math.PI) / 180;
        points.push({
          x: x + radius * Math.cos(radians),
          y: y + radius * Math.sin(radians)
        });
      }
      
      setCurrentPoints(points);
      // Simulate API call completion
      setTimeout(() => finalizeRegion(), 500);
    }
    
    drawCanvas();
  };
  
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !selectionMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Get mouse coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (selectionMode === 'rectangle') {
      // Update end point for rectangle
      if (currentPoints.length === 1) {
        setCurrentPoints([currentPoints[0], { x, y }]);
      } else if (currentPoints.length === 2) {
        setCurrentPoints([currentPoints[0], { x, y }]);
      }
    } else if (selectionMode === 'ellipse') {
      // Update radius point for ellipse
      if (currentPoints.length === 1) {
        setCurrentPoints([currentPoints[0], { x, y }]);
      } else if (currentPoints.length === 2) {
        setCurrentPoints([currentPoints[0], { x, y }]);
      }
    } else if (selectionMode === 'freeform') {
      // Add points for freeform drawing
      setCurrentPoints([...currentPoints, { x, y }]);
    }
    
    drawCanvas();
  };
  
  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !selectionMode) return;
    
    if (selectionMode === 'rectangle' || selectionMode === 'ellipse') {
      finalizeRegion();
    }
    
    // For polygon, we keep drawing until explicitly finalized
    // For freeform, we finalize on mouse up
    if (selectionMode === 'freeform') {
      finalizeRegion();
    }
  };
  
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // If we're not in selection mode, check if we're selecting a region
    if (!selectionMode) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Get mouse coordinates relative to canvas
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if click is inside any region
      const clickedRegion = regions.find(region => {
        const scaledCoords = region.coordinates.map(([x, y]) => [
          (x * canvas.width),
          (y * canvas.height)
        ]);
        
        return isPointInRegion({ x, y }, scaledCoords, region.type);
      });
      
      if (clickedRegion) {
        setCurrentRegion(clickedRegion.id);
      } else {
        setCurrentRegion(null);
      }
      
      drawCanvas();
    }
  };
  
  // Check if a point is inside a region
  const isPointInRegion = (point: Point, coordinates: number[][], type: string) => {
    if (type === 'rectangle') {
      const [topLeft, bottomRight] = coordinates;
      return (
        point.x >= topLeft[0] &&
        point.x <= bottomRight[0] &&
        point.y >= topLeft[1] &&
        point.y <= bottomRight[1]
      );
    } else if (type === 'ellipse') {
      const [center, radiusPoint] = coordinates;
      const radiusX = Math.abs(radiusPoint[0] - center[0]);
      const radiusY = Math.abs(radiusPoint[1] - center[1]);
      
      // Normalize point to ellipse center
      const normalizedX = point.x - center[0];
      const normalizedY = point.y - center[1];
      
      // Check if point is inside ellipse using formula: (x/a)² + (y/b)² <= 1
      return (Math.pow(normalizedX / radiusX, 2) + Math.pow(normalizedY / radiusY, 2)) <= 1;
    } else if (type === 'polygon' || type === 'freeform' || type === 'smart') {
      // Use ray casting algorithm to determine if point is inside polygon
      let inside = false;
      for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
        const xi = coordinates[i][0];
        const yi = coordinates[i][1];
        const xj = coordinates[j][0];
        const yj = coordinates[j][1];
        
        const intersect = ((yi > point.y) !== (yj > point.y))
          && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
          
        if (intersect) inside = !inside;
      }
      
      return inside;
    }
    
    return false;
  };
  
  // Finalize region creation
  const finalizeRegion = () => {
    if (!isDrawing || !selectionMode || currentPoints.length < 2) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Convert points to normalized coordinates (0-1)
    const normalizedPoints = currentPoints.map(point => [
      point.x / canvas.width,
      point.y / canvas.height
    ]);
    
    // Create new region
    const newRegion: RegionDefinition = {
      id: uuidv4(),
      name: `Region ${regions.length + 1}`,
      type: selectionMode,
      coordinates: normalizedPoints,
      prompt: '',
      priority: regions.length + 1
    };
    
    // Add region to list
    onChange([...regions, newRegion]);
    
    // Reset drawing state
    setIsDrawing(false);
    setCurrentPoints([]);
    setSelectionMode(null);
    setCurrentRegion(newRegion.id);
    
    drawCanvas();
  };
  
  // Handle region deletion
  const handleDeleteRegion = (id: string) => {
    const updatedRegions = regions.filter(region => region.id !== id);
    onChange(updatedRegions);
    
    if (currentRegion === id) {
      setCurrentRegion(null);
    }
    
    if (editingRegionId === id) {
      setEditingRegionId(null);
    }
  };
  
  // Start editing region name or prompt
  const startEditing = (id: string, field: 'name' | 'prompt') => {
    const region = regions.find(r => r.id === id);
    if (!region) return;
    
    setEditingRegionId(id);
    setEditField(field);
    setEditValue(field === 'name' ? region.name : region.prompt);
  };
  
  // Save edited region name or prompt
  const saveEdit = () => {
    if (!editingRegionId) return;
    
    const updatedRegions = regions.map(region => {
      if (region.id === editingRegionId) {
        return {
          ...region,
          [editField]: editValue
        };
      }
      return region;
    });
    
    onChange(updatedRegions);
    setEditingRegionId(null);
  };
  
  // Move region up or down in priority
  const moveRegionPriority = (id: string, direction: 'up' | 'down') => {
    const regionIndex = regions.findIndex(r => r.id === id);
    if (regionIndex === -1) return;
    
    // Cannot move up if already at top or down if already at bottom
    if ((direction === 'up' && regionIndex === 0) || 
        (direction === 'down' && regionIndex === regions.length - 1)) {
      return;
    }
    
    // Create copy of regions array
    const updatedRegions = [...regions];
    
    // Get adjacent region
    const adjacentIndex = direction === 'up' ? regionIndex - 1 : regionIndex + 1;
    
    // Swap regions
    [updatedRegions[regionIndex], updatedRegions[adjacentIndex]] = 
    [updatedRegions[adjacentIndex], updatedRegions[regionIndex]];
    
    // Update priorities
    updatedRegions.forEach((region, idx) => {
      region.priority = idx + 1;
    });
    
    onChange(updatedRegions);
  };
  
  // Cancel drawing
  const cancelDrawing = () => {
    setIsDrawing(false);
    setCurrentPoints([]);
    setSelectionMode(null);
  };
  
  // Render component
  useEffect(() => {
    drawCanvas();
  }, [regions, currentPoints, currentRegion, selectionMode, isDrawing, canvasDimensions]);
  
  // Render component
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Canvas area */}
      <div className="flex-1">
        <div className="relative border border-gray-300 rounded-md bg-gray-100 overflow-hidden" ref={containerRef}>
          <canvas
            ref={canvasRef}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            className="max-w-full"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onClick={handleCanvasClick}
          />
          
          {/* Selection mode toolbar */}
          <div className="absolute top-2 left-2 bg-white rounded-md shadow-md p-1 flex">
            <button
              type="button"
              onClick={() => selectionMode ? cancelDrawing() : setSelectionMode('rectangle')}
              className={`p-2 rounded ${selectionMode === 'rectangle' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
              title="Rectangle selection"
            >
              <FiMaximize size={20} />
            </button>
            <button
              type="button"
              onClick={() => selectionMode ? cancelDrawing() : setSelectionMode('ellipse')}
              className={`p-2 rounded ${selectionMode === 'ellipse' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
              title="Ellipse selection"
            >
              <FiCircle size={20} />
            </button>
            <button
              type="button"
              onClick={() => selectionMode ? cancelDrawing() : setSelectionMode('polygon')}
              className={`p-2 rounded ${selectionMode === 'polygon' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
              title="Polygon selection"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => selectionMode ? cancelDrawing() : setSelectionMode('freeform')}
              className={`p-2 rounded ${selectionMode === 'freeform' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
              title="Freeform selection"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => selectionMode ? cancelDrawing() : setSelectionMode('smart')}
              className={`p-2 rounded ${selectionMode === 'smart' ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
              title="Smart selection"
            >
              <FiStar size={20} />
            </button>
          </div>
          
          {/* Drawing instructions */}
          {selectionMode && (
            <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 rounded-md shadow-md p-2 text-sm">
              {selectionMode === 'rectangle' && 'Click and drag to create a rectangle'}
              {selectionMode === 'ellipse' && 'Click and drag to create an ellipse'}
              {selectionMode === 'polygon' && 'Click to add points, close to the first point to complete'}
              {selectionMode === 'freeform' && 'Click and drag to draw freely'}
              {selectionMode === 'smart' && 'Click on an object for automatic detection'}
              
              <button
                type="button"
                onClick={cancelDrawing}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        {/* Canvas instructions */}
        {!selectionMode && (
          <div className="mt-2 text-sm text-gray-500">
            {regions.length === 0 ? (
              'Select a tool above to start creating regions'
            ) : (
              'Click on a region to select it, or select a tool to create a new region'
            )}
          </div>
        )}
      </div>
      
      {/* Region list */}
      <div className="w-full md:w-64">
        <div className="bg-white border border-gray-300 rounded-md p-3">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Regions ({regions.length}/{maxRegions})</h3>
            <button
              type="button"
              onClick={() => !selectionMode && regions.length < maxRegions && setSelectionMode('rectangle')}
              className={`p-1 rounded-full ${regions.length >= maxRegions || selectionMode ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-100 text-primary-800 hover:bg-primary-200'}`}
              disabled={regions.length >= maxRegions || !!selectionMode}
              title="Add region"
            >
              <FiPlus size={18} />
            </button>
          </div>
          
          {regions.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              No regions defined yet
            </div>
          ) : (
            <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {regions.map(region => (
                <li
                  key={region.id}
                  className={`border rounded-md p-2 ${
                    currentRegion === region.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}
                >
                  {/* Region header */}
                  <div className="flex justify-between items-center">
                    {/* Region name */}
                    {editingRegionId === region.id && editField === 'name' ? (
                      <div className="flex-1">
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={saveEdit}
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                          autoFocus
                        />
                      </div>
                    ) : (
                      <div
                        className="flex-1 font-medium cursor-pointer"
                        onClick={() => setCurrentRegion(region.id)}
                        onDoubleClick={() => startEditing(region.id, 'name')}
                      >
                        {region.name}
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        onClick={() => startEditing(region.id, 'name')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Edit name"
                      >
                        <FiEdit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteRegion(region.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete region"
                      >
                        <FiTrash size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Priority controls */}
                  <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                    <div>Priority: {region.priority}</div>
                    <div className="flex space-x-1">
                      <button
                        type="button"
                        onClick={() => moveRegionPriority(region.id, 'up')}
                        className={`p-1 ${region.priority === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                        disabled={region.priority === 1}
                        title="Move up"
                      >
                        <FiArrowUp size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveRegionPriority(region.id, 'down')}
                        className={`p-1 ${region.priority === regions.length ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'}`}
                        disabled={region.priority === regions.length}
                        title="Move down"
                      >
                        <FiArrowDown size={14} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Region prompt */}
                  <div className="mt-2">
                    {editingRegionId === region.id && editField === 'prompt' ? (
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        rows={3}
                        placeholder="Enter processing instructions..."
                        autoFocus
                      />
                    ) : (
                      <div
                        className="text-sm cursor-pointer p-1 border border-transparent hover:border-gray-200 hover:bg-gray-50 rounded min-h-[3em]"
                        onClick={() => startEditing(region.id, 'prompt')}
                      >
                        {region.prompt || (
                          <span className="text-gray-400 italic">Click to add instructions...</span>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
          
          {/* Instructions */}
          {regions.length > 0 && (
            <div className="mt-4 text-xs text-gray-500">
              <p className="mb-1">• Double-click on name to edit</p>
              <p className="mb-1">• Click on prompt area to add instructions</p>
              <p>• Higher priority regions appear on top</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;
