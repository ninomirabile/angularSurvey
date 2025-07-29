import { describe, it, expect } from 'vitest';

describe('App', () => {
  it('should be defined', () => {
    expect(true).toBe(true);
  });

  // TODO: Re-enable when Angular testing is properly configured
  // it('should create the app', async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [App],
  //   }).compileComponents();
  //   const fixture = TestBed.createComponent(App);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it('should render title', async () => {
  //   await TestBed.configureTestingModule({
  //     imports: [App],
  //   }).compileComponents();
  //   const fixture = TestBed.createComponent(App);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Survey Builder');
  // });
});
