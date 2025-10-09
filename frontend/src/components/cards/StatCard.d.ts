import React from 'react';
interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon?: React.ReactNode;
    color?: 'primary' | 'success' | 'warning' | 'danger';
}
declare const StatCard: React.FC<StatCardProps>;
export default StatCard;
//# sourceMappingURL=StatCard.d.ts.map