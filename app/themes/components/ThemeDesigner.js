'use client';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
  ColorPicker,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const fontOptions = [
  'Arial',
  'Roboto',
  'Open Sans',
  'Lato',
  'Montserrat',
  'Source Sans Pro',
];

export default function ThemeDesigner() {
  const [theme, setTheme] = useState({
    name: '',
    colors: {
      primary: '#1976d2',
      secondary: '#dc004e',
      background: '#ffffff',
      text: '#000000',
    },
    fonts: {
      primary: 'Roboto',
      secondary: 'Arial',
    },
    layout: {
      spacing: 8,
      borderRadius: 4,
    },
  });

  const handleColorChange = (color, type) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [type]: color,
      },
    }));
  };

  const handleFontChange = (event, type) => {
    setTheme(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [type]: event.target.value,
      },
    }));
  };

  const handleLayoutChange = (event, type) => {
    setTheme(prev => ({
      ...prev,
      layout: {
        ...prev.layout,
        [type]: Number(event.target.value),
      },
    }));
  };

  const handleSaveAsDraft = () => {
    // TODO: Implement save as draft functionality
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Theme Name"
            value={theme.name}
            onChange={(e) => setTheme(prev => ({ ...prev, name: e.target.value }))}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Colors</Typography>
          <Grid container spacing={2}>
            {Object.entries(theme.colors).map(([key, value]) => (
              <Grid item xs={6} sm={3} key={key}>
                <FormControl fullWidth>
                  <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</InputLabel>
                  <ColorPicker
                    value={value}
                    onChange={(color) => handleColorChange(color, key)}
                  />
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>Fonts</Typography>
          <Grid container spacing={2}>
            {Object.entries(theme.fonts).map(([key, value]) => (
              <Grid item xs={6} key={key}>
                <FormControl fullWidth>
                  <InputLabel>{key.charAt(0).toUpperCase() + key.slice(1)} Font</InputLabel>
                  <Select
                    value={value}
                    onChange={(e) => handleFontChange(e, key)}
                  >
                    {fontOptions.map((font) => (
                      <MenuItem key={font} value={font}>{font}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" gutterBottom>Layout</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Spacing"
                value={theme.layout.spacing}
                onChange={(e) => handleLayoutChange(e, 'spacing')}
                inputProps={{ min: 0, max: 16 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Border Radius"
                value={theme.layout.borderRadius}
                onChange={(e) => handleLayoutChange(e, 'borderRadius')}
                inputProps={{ min: 0, max: 32 }}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAsDraft}
            >
              Save as Draft
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}