import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  formatDate,
  formatTitle,
  generateSKU,
  generateTrackingNumber,
  removeDash,
} from './helper';

describe('format title', () => {
  it('should capitalize every word in the sentence', () => {
    expect(formatTitle('hi hi')).toBe('Hi Hi');
  });

  it('should trim the sentence and remove extra white spaces', () => {
    expect(formatTitle('  hi       hi        ')).toBe('Hi Hi');
  });
});

describe('format date', () => {
  it('should localize US Date', () => {
    expect(formatDate(new Date(2024, 2, 10, 2, 30))).toBe('Mar 10, 2024');
    expect(formatDate('2024-03-11')).toBe('Mar 10, 2024');
  });
});

describe('remove dash', () => {
  it('should remove and replace dash with space', () => {
    expect(removeDash('sai-sai-love-haru')).toBe('sai sai love haru');
    expect(removeDash('sai------sai----love-----------haru')).toBe(
      'sai sai love haru',
    );
  });
});

describe('format currency', () => {
  it('should generate usd currency style', () => {
    expect(formatCurrency(2000)).toBe('$2,000.00');

    expect(formatCurrency(200.39)).toBe('$200.39');
  });
});

describe('generate Tracking Number', () => {
  it('should generate random 22 character', () => {
    expect(generateTrackingNumber()).toEqual(expect.stringContaining('9205'));
  });
});

describe('generate sku', () => {
  it('should generate random SKU', () => {
    expect(generateSKU('LOR')).toMatch(/^LOR/);
  });
});
