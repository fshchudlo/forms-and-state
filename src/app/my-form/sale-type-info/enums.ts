export type SaleType = 'Own' | 'Subagent';
export type DevelopmentType = 'Own' | 'Outsourcing';

export function isSubagent(type: SaleType): boolean {
    return type === 'Subagent';
}
