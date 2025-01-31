"use client";

import React, { useState, useEffect } from "react";
import { SketchPicker } from "react-color";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  color: string; // The initial color passed from the parent (e.g., editor.getAttributes('textStyle').color)
  onChange: (color: string) => void; // Callback to handle the color change (e.g., editor.chain().setColor(color).run())
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  // When the color prop changes, update the state.
  useEffect(() => {
    setShowPicker(false); // Hide the color picker after selecting a color
  }, [color]);

  return (
    <Card className="max-w-sm mx-auto mt-8">
      <CardHeader>
        <CardTitle>Choose a Color</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPicker(!showPicker)}
          className="bg-gray-100"
        >
          Pick a color
        </Button>

        {showPicker && (
          <div className="absolute z-10">
            <SketchPicker color={color} onChangeComplete={(newColor) => onChange(newColor.hex)} />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span>Selected Color:</span>
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPicker;
