import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

export const surveyAnimations = {
  // Fade in animation
  fadeIn: trigger('fadeIn', [
    state('void', style({ opacity: 0 })),
    transition(':enter', [
      animate('300ms ease-in', style({ opacity: 1 }))
    ])
  ]),

  // Slide in from left
  slideInLeft: trigger('slideInLeft', [
    state('void', style({ transform: 'translateX(-100%)', opacity: 0 })),
    transition(':enter', [
      animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ])
  ]),

  // Slide in from right
  slideInRight: trigger('slideInRight', [
    state('void', style({ transform: 'translateX(100%)', opacity: 0 })),
    transition(':enter', [
      animate('400ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ])
  ]),

  // Slide in from bottom
  slideInUp: trigger('slideInUp', [
    state('void', style({ transform: 'translateY(100%)', opacity: 0 })),
    transition(':enter', [
      animate('400ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
    ])
  ]),

  // Scale in animation
  scaleIn: trigger('scaleIn', [
    state('void', style({ transform: 'scale(0.8)', opacity: 0 })),
    transition(':enter', [
      animate('300ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
    ])
  ]),

  // Bounce in animation
  bounceIn: trigger('bounceIn', [
    state('void', style({ transform: 'scale(0.3)', opacity: 0 })),
    transition(':enter', [
      animate('600ms ease-out', keyframes([
        style({ transform: 'scale(0.3)', opacity: 0, offset: 0 }),
        style({ transform: 'scale(1.05)', offset: 0.8 }),
        style({ transform: 'scale(0.9)', offset: 0.9 }),
        style({ transform: 'scale(1)', opacity: 1, offset: 1 })
      ]))
    ])
  ]),

  // Stagger animation for lists
  staggerList: trigger('staggerList', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger(100, [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ], { optional: true })
    ])
  ]),

  // Card hover animation
  cardHover: trigger('cardHover', [
    state('normal', style({ transform: 'translateY(0)', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' })),
    state('hovered', style({ transform: 'translateY(-4px)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' })),
    transition('normal => hovered', [
      animate('200ms ease-out')
    ]),
    transition('hovered => normal', [
      animate('200ms ease-in')
    ])
  ]),

  // Progress bar animation
  progressBar: trigger('progressBar', [
    state('void', style({ width: '0%' })),
    transition(':enter', [
      animate('1000ms ease-out', style({ width: '*' }))
    ])
  ]),

  // Loading spinner animation
  loadingSpinner: trigger('loadingSpinner', [
    state('void', style({ transform: 'rotate(0deg)' })),
    transition(':enter', [
      animate('1000ms linear infinite', keyframes([
        style({ transform: 'rotate(0deg)', offset: 0 }),
        style({ transform: 'rotate(360deg)', offset: 1 })
      ]))
    ])
  ]),

  // Question transition animation
  questionTransition: trigger('questionTransition', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateX(50px)' }),
      animate('400ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition(':leave', [
      animate('400ms ease-in', style({ opacity: 0, transform: 'translateX(-50px)' }))
    ])
  ]),

  // Success animation
  successAnimation: trigger('successAnimation', [
    state('void', style({ transform: 'scale(0)', opacity: 0 })),
    transition(':enter', [
      animate('500ms ease-out', keyframes([
        style({ transform: 'scale(0)', opacity: 0, offset: 0 }),
        style({ transform: 'scale(1.2)', offset: 0.6 }),
        style({ transform: 'scale(1)', opacity: 1, offset: 1 })
      ]))
    ])
  ]),

  // Error shake animation
  errorShake: trigger('errorShake', [
    state('void', style({ transform: 'translateX(0)' })),
    transition(':enter', [
      animate('500ms ease-out', keyframes([
        style({ transform: 'translateX(0)', offset: 0 }),
        style({ transform: 'translateX(-10px)', offset: 0.1 }),
        style({ transform: 'translateX(10px)', offset: 0.2 }),
        style({ transform: 'translateX(-10px)', offset: 0.3 }),
        style({ transform: 'translateX(10px)', offset: 0.4 }),
        style({ transform: 'translateX(0)', offset: 1 })
      ]))
    ])
  ])
}; 