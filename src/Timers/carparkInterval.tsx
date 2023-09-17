import { useEffect } from 'react';
import { getCarpark } from '../Api/carparkApi';

export function CarparkInterval(){

    useEffect(() => {
        getCarpark();
        const interval = setInterval(() => {
            getCarpark();
        }, 60000);
    
        return () => clearInterval(interval);
      }, []);

}