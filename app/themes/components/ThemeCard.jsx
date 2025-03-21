"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";

export default function ThemeCard({
  theme,
  onSave,
  onPublish,
  onToggle,
  isDraft = false,
}) {
  const [editedTheme, setEditedTheme] = React.useState(theme);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleInputChange = (category, property, value) => {
    setEditedTheme((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [property]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(editedTheme);
    setIsEditing(false);
  };

  const getPreviewStyle = () => ({
    backgroundColor: editedTheme.colors.background,
    color: editedTheme.colors.text,
    padding: editedTheme.layout.spacing,
    borderRadius: editedTheme.layout.borderRadius,
    fontFamily: editedTheme.fonts.primary,
    border: `2px solid ${editedTheme.colors.primary}`,
    minHeight: "100px",
    position: "relative",
  });

  const getPreviewMessageStyle = () => ({
    backgroundColor: editedTheme.colors.primary,
    color: "#fff",
    padding: "8px",
    borderRadius: editedTheme.layout.borderRadius,
    maxWidth: "70%",
    marginBottom: "8px",
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {isEditing ? (
              <Input
                value={editedTheme.name}
                onChange={(e) => handleInputChange("name", "", e.target.value)}
                className="max-w-[200px]"
              />
            ) : (
              editedTheme.name
            )}
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {/* Theme Preview */}
          <div style={getPreviewStyle()}>
            <div style={getPreviewMessageStyle()}>Preview Message</div>
            <div
              style={{
                ...getPreviewMessageStyle(),
                backgroundColor: editedTheme.colors.secondary,
                alignSelf: "flex-end",
                marginLeft: "auto",
              }}
            >
              Response Message
            </div>
          </div>

          {isEditing && (
            <div className="space-y-4">
              {/* Colors Section */}
              <div>
                <h4 className="font-medium mb-2">Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(editedTheme.colors).map(([key, value]) => (
                    <div key={key}>
                      <Label>{key}</Label>
                      <Input
                        type="color"
                        value={value}
                        onChange={(e) =>
                          handleInputChange("colors", key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Fonts Section */}
              <div>
                <h4 className="font-medium mb-2">Fonts</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(editedTheme.fonts).map(([key, value]) => (
                    <div key={key}>
                      <Label>{key}</Label>
                      <Input
                        value={value}
                        onChange={(e) =>
                          handleInputChange("fonts", key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Layout Section */}
              <div>
                <h4 className="font-medium mb-2">Layout</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(editedTheme.layout).map(([key, value]) => (
                    <div key={key}>
                      <Label>{key}</Label>
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleInputChange("layout", key, e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        {isEditing ? (
          <Button onClick={handleSave}>Save Changes</Button>
        ) : (
          <div className="flex gap-2">
            {isDraft ? (
              <Button onClick={() => onPublish(editedTheme)}>Publish</Button>
            ) : (
              <Button
                variant={editedTheme.enabled ? "destructive" : "default"}
                onClick={() => onToggle(editedTheme.id)}
              >
                {editedTheme.enabled ? "Disable" : "Enable"}
              </Button>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
