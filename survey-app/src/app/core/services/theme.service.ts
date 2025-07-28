import { Injectable, signal, computed, effect } from '@angular/core';
import { StorageService } from './storage.service';

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: number;
  fontFamily: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_STORAGE_KEY = 'theme_config';
  private readonly storage = new StorageService();

  // Signals for reactive theme management
  private readonly _themeMode = signal<ThemeMode>('light');
  private readonly _primaryColor = signal<string>('#1976d2');
  private readonly _secondaryColor = signal<string>('#dc004e');
  private readonly _accentColor = signal<string>('#ff9800');
  private readonly _borderRadius = signal<number>(8);
  private readonly _fontFamily = signal<string>('Roboto, sans-serif');

  // Computed signals
  readonly themeMode = this._themeMode.asReadonly();
  readonly primaryColor = this._primaryColor.asReadonly();
  readonly secondaryColor = this._secondaryColor.asReadonly();
  readonly accentColor = this._accentColor.asReadonly();
  readonly borderRadius = this._borderRadius.asReadonly();
  readonly fontFamily = this._fontFamily.asReadonly();

  // Computed signal for current theme configuration
  readonly themeConfig = computed(() => ({
    mode: this._themeMode(),
    primaryColor: this._primaryColor(),
    secondaryColor: this._secondaryColor(),
    accentColor: this._accentColor(),
    borderRadius: this._borderRadius(),
    fontFamily: this._fontFamily()
  }));

  // Computed signal for CSS custom properties
  readonly cssVariables = computed(() => {
    const config = this.themeConfig();
    return {
      '--primary-color': config.primaryColor,
      '--secondary-color': config.secondaryColor,
      '--accent-color': config.accentColor,
      '--border-radius': `${config.borderRadius}px`,
      '--font-family': config.fontFamily,
      '--theme-mode': config.mode
    };
  });

  // Computed signal for current effective theme (light/dark)
  readonly currentTheme = computed(() => {
    const mode = this._themeMode();
    if (mode === 'auto') {
      return this.getSystemTheme();
    }
    return mode;
  });

  constructor() {
    this.loadThemeFromStorage();
    this.setupThemeEffects();
  }

  // Theme mode management
  setThemeMode(mode: ThemeMode): void {
    this._themeMode.set(mode);
    this.applyTheme();
  }

  toggleTheme(): void {
    const currentMode = this._themeMode();
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    this.setThemeMode(newMode);
  }

  // Color management
  setPrimaryColor(color: string): void {
    this._primaryColor.set(color);
    this.applyTheme();
  }

  setSecondaryColor(color: string): void {
    this._secondaryColor.set(color);
    this.applyTheme();
  }

  setAccentColor(color: string): void {
    this._accentColor.set(color);
    this.applyTheme();
  }

  // Style management
  setBorderRadius(radius: number): void {
    this._borderRadius.set(radius);
    this.applyTheme();
  }

  setFontFamily(fontFamily: string): void {
    this._fontFamily.set(fontFamily);
    this.applyTheme();
  }

  // Preset themes
  applyPresetTheme(preset: 'default' | 'material' | 'modern' | 'minimal'): void {
    const presets: Record<string, Partial<ThemeConfig>> = {
      default: {
        primaryColor: '#1976d2',
        secondaryColor: '#dc004e',
        accentColor: '#ff9800',
        borderRadius: 8,
        fontFamily: 'Roboto, sans-serif'
      },
      material: {
        primaryColor: '#6200ea',
        secondaryColor: '#03dac6',
        accentColor: '#ff6b35',
        borderRadius: 4,
        fontFamily: 'Roboto, sans-serif'
      },
      modern: {
        primaryColor: '#2563eb',
        secondaryColor: '#7c3aed',
        accentColor: '#f59e0b',
        borderRadius: 12,
        fontFamily: 'Inter, sans-serif'
      },
      minimal: {
        primaryColor: '#374151',
        secondaryColor: '#6b7280',
        accentColor: '#10b981',
        borderRadius: 6,
        fontFamily: 'system-ui, sans-serif'
      }
    };

    const presetConfig = presets[preset];
    if (presetConfig) {
      Object.entries(presetConfig).forEach(([key, value]) => {
        switch (key) {
          case 'primaryColor':
            this._primaryColor.set(value as string);
            break;
          case 'secondaryColor':
            this._secondaryColor.set(value as string);
            break;
          case 'accentColor':
            this._accentColor.set(value as string);
            break;
          case 'borderRadius':
            this._borderRadius.set(value as number);
            break;
          case 'fontFamily':
            this._fontFamily.set(value as string);
            break;
        }
      });
      this.applyTheme();
    }
  }

  // Private methods
  private setupThemeEffects(): void {
    // Effect to save theme to storage when it changes
    effect(() => {
      const config = this.themeConfig();
      this.storage.setItem(this.THEME_STORAGE_KEY, config);
    });

    // Effect to apply theme changes to DOM
    effect(() => {
      this.applyThemeToDOM();
    });
  }

  private loadThemeFromStorage(): void {
    const savedConfig = this.storage.getItem<ThemeConfig>(this.THEME_STORAGE_KEY);
    if (savedConfig) {
      this._themeMode.set(savedConfig.mode);
      this._primaryColor.set(savedConfig.primaryColor);
      this._secondaryColor.set(savedConfig.secondaryColor);
      this._accentColor.set(savedConfig.accentColor);
      this._borderRadius.set(savedConfig.borderRadius);
      this._fontFamily.set(savedConfig.fontFamily);
    } else {
      // Default theme
      this.applyPresetTheme('default');
    }
  }

  private applyTheme(): void {
    // This method is called when theme properties change
    // The actual application is handled by the effect
  }

  private applyThemeToDOM(): void {
    const variables = this.cssVariables();
    const root = document.documentElement;
    
    // Apply CSS custom properties
    Object.entries(variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Apply theme mode classes
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(`${this.currentTheme()}-theme`);

    // Update color scheme meta tag
    this.updateColorSchemeMeta();
  }

  private updateColorSchemeMeta(): void {
    let colorScheme = 'light';
    if (this.currentTheme() === 'dark') {
      colorScheme = 'dark';
    } else if (this._themeMode() === 'auto') {
      colorScheme = 'light dark';
    }

    // Update or create color-scheme meta tag
    let metaTag = document.querySelector('meta[name="color-scheme"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'color-scheme');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', colorScheme);
  }

  private getSystemTheme(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Utility methods
  isDarkMode(): boolean {
    return this.currentTheme() === 'dark';
  }

  isLightMode(): boolean {
    return this.currentTheme() === 'light';
  }

  getContrastColor(backgroundColor: string): string {
    // Simple contrast calculation
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#ffffff';
  }

  // Method to export theme configuration
  exportTheme(): ThemeConfig {
    return this.themeConfig();
  }

  // Method to import theme configuration
  importTheme(config: ThemeConfig): void {
    this._themeMode.set(config.mode);
    this._primaryColor.set(config.primaryColor);
    this._secondaryColor.set(config.secondaryColor);
    this._accentColor.set(config.accentColor);
    this._borderRadius.set(config.borderRadius);
    this._fontFamily.set(config.fontFamily);
  }
} 