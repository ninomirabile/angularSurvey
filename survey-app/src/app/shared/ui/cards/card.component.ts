import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CardConfig {
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'soft' | 'medium' | 'strong';
  border?: boolean;
  hover?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="bg-white rounded-lg overflow-hidden transition-all duration-200"
      [class]="cardClasses()"
    >
      <!-- Header -->
      @if (config().showHeader !== false && (config().title || config().subtitle)) {
        <div class="px-6 py-4 border-b border-gray-200">
          @if (config().title) {
            <h3 class="text-lg font-semibold text-gray-900">{{ config().title }}</h3>
          }
          @if (config().subtitle) {
            <p class="text-sm text-gray-600 mt-1">{{ config().subtitle }}</p>
          }
        </div>
      }

      <!-- Image -->
      @if (config().image) {
        <div class="relative">
          <img 
            [src]="config().image" 
            [alt]="config().imageAlt || ''"
            class="w-full h-48 object-cover"
          />
        </div>
      }

      <!-- Content -->
      <div [class]="contentClasses()">
        <ng-content></ng-content>
      </div>

      <!-- Footer -->
      @if (config().showFooter) {
        <div class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <ng-content select="[card-footer]"></ng-content>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardComponent {
  @Input() config = signal<CardConfig>({});

  cardClasses = computed(() => {
    const config = this.config();
    const classes = ['bg-white rounded-lg overflow-hidden transition-all duration-200'];
    
    // Shadow
    if (config.shadow === 'soft') classes.push('shadow-soft');
    else if (config.shadow === 'medium') classes.push('shadow-medium');
    else if (config.shadow === 'strong') classes.push('shadow-strong');
    
    // Border
    if (config.border !== false) classes.push('border border-gray-200');
    
    // Hover effect
    if (config.hover) classes.push('hover:shadow-medium hover:-translate-y-1');
    
    return classes.join(' ');
  });

  contentClasses = computed(() => {
    const config = this.config();
    const paddingClasses = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8'
    };
    return paddingClasses[config.padding || 'md'];
  });
} 