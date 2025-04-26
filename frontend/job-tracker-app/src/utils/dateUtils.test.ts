import { describe, it, expect } from 'vitest';
import { formatDate } from './dateUtils';

describe('formatDate', () => {
    it('should format date "2025-04-25" as "25 Apr 2025"', () => {
        const input = "2025-04-25";
        const output = formatDate(input);
        expect(output).toBe("25 Apr 2025");
    });

    it('should format date "2025-04-26" as "26 Apr 2025"', () => {
        const input = "2025-04-26";
        const output = formatDate(input);
        expect(output).toBe("26 Apr 2025");
    });

    it('should format date "2023-01-01" as "01 Jan 2023"', () => {
        const input = "2023-01-01";
        const output = formatDate(input);
        expect(output).toBe("01 Jan 2023");
    });

    it('should format date "2023-12-31" as "31 Dec 2023"', () => {
        const input = "2023-12-31";
        const output = formatDate(input);
        expect(output).toBe("31 Dec 2023");
    });

    it('should handle invalid date strings gracefully', () => {
        const input = "invalid-date";
        const output = formatDate(input);
        expect(output).toBe("Invalid Date");
    });


    it('should return today\'s date in the desired format if dateString is undefined', () => {
        const today = new Date();
        const expectedOutput = today.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
        const output = formatDate(undefined);
        expect(output).toBe(expectedOutput);
    });
    
    it('should return today\'s date in the desired format if dateString is null', () => {
        const today = new Date();
        const expectedOutput = today.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
        const output = formatDate(null as unknown as string);
        expect(output).toBe(expectedOutput);
    });
});
