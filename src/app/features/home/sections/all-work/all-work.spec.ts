import { TestBed } from '@angular/core/testing';
import { AllWork } from './all-work';

describe('AllWork', () => {
  async function render() {
    await TestBed.configureTestingModule({ imports: [AllWork] }).compileComponents();
    const fixture = TestBed.createComponent(AllWork);
    await fixture.whenStable();
    return fixture;
  }

  const cards = (el: HTMLElement) => el.querySelectorAll('.grid > li').length;
  const count = (el: HTMLElement) => el.querySelector('.count')?.textContent?.trim();

  it('shows every project by default', async () => {
    const fixture = await render();
    const el = fixture.nativeElement as HTMLElement;
    expect(cards(el)).toBe(12);
    expect(count(el)).toBe('12 projects');
  });

  it('filters to live apps and updates the count', async () => {
    const fixture = await render();
    const el = fixture.nativeElement as HTMLElement;
    const live = [...el.querySelectorAll<HTMLButtonElement>('.chip')].find((b) =>
      b.textContent?.includes('Live on stores'),
    )!;

    live.click();
    await fixture.whenStable();

    expect(cards(el)).toBe(9);
    expect(count(el)).toBe('9 projects');
    expect(live.getAttribute('aria-pressed')).toBe('true');
  });

  it('uses the singular for one project', async () => {
    const fixture = await render();
    const el = fixture.nativeElement as HTMLElement;
    [...el.querySelectorAll<HTMLButtonElement>('.chip')]
      .find((b) => b.textContent?.includes('React Native'))!
      .click();
    await fixture.whenStable();
    expect(count(el)).toBe('1 project');
  });
});
