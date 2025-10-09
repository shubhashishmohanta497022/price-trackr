import { useState, useEffect } from 'react';
export const useLocalTime = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    return time;
};
//# sourceMappingURL=useLocalTime.js.map