import { setCarpark } from '../redux/reducers/carpark';
import { store } from '../app/store';
import axios from 'axios';

export function getCarpark() {

    axios.get(process.env.REACT_APP_API_URL+'/transport/carpark-availability/')
    .then((response) => {

        let carparkData = {
            small:{lowest:{total:-1, available:-1, number:''}, highest:{total:-1, available:-1, number:''}},
            medium:{lowest:{total:-1, available:-1, number:''}, highest:{total:-1, available:-1, number:''}},
            big:{lowest:{total:-1, available:-1, number:''}, highest:{total:-1, available:-1, number:''}},
            large:{lowest:{total:-1, available:-1, number:''}, highest:{total:-1, available:-1, number:''}},
        }

        {Object.values(response.data.items).map((value: any) => {
            Object.values(value.carpark_data).map((value:any) => {

                let total_lots = 0;
                let lots_available = 0;

                Object.values(value.carpark_info).map((value: any) => {
                    total_lots += Number(value.total_lots);
                    lots_available += Number(value.lots_available);
                });
                console.log(total_lots, lots_available, value.carpark_number);
                setLowMediumBigLargeLowestHighest(total_lots, lots_available, value.carpark_number, carparkData);

            });
        })};

        store.dispatch(setCarpark(carparkData));
    })
    .catch((error) => {
        console.log(error);
    });
}

function setLowMediumBigLargeLowestHighest(total_lots: number, lots_available: number, carpark_number: string, carpark_data: any){

     /* - small : less than 100 lots
        - medium : 100 lots or more, but less than 300 lots
        - big : 300 lots or more, but less than 400 lots
        - large : 400 lots or more
        */

    let type = '';

    if(total_lots < 100){
        type = 'small';
    }else if(total_lots < 300){
        type = 'medium';
    }else if(total_lots < 400){
        type = 'big';
    }else{
        type = 'large';
    }

    setLowestHighestData(type, total_lots, lots_available, carpark_number, carpark_data); 

}

function setLowestHighestData(type: string, total_lots: number, lots_available: number, carpark_number: string, carpark_data: any){
    if(carpark_data[type].lowest.total === -1 && carpark_data[type].highest.total === -1){
        carpark_data[type].lowest.total = total_lots;
        carpark_data[type].lowest.available = lots_available;
        carpark_data[type].lowest.number = carpark_number;
        carpark_data[type].highest.total = total_lots;
        carpark_data[type].highest.available = lots_available;
        carpark_data[type].highest.number = carpark_number;
    }else{
        if(total_lots === carpark_data[type].lowest.total){
            carpark_data[type].lowest.available += lots_available;
            carpark_data[type].lowest.number += ', '+carpark_number;
        }
        else if(total_lots < carpark_data[type].lowest.total){
            carpark_data[type].lowest.total = total_lots;
            carpark_data[type].lowest.available = lots_available;
            carpark_data[type].lowest.number = carpark_number;
        }
        else if(total_lots === carpark_data[type].highest.total){
            carpark_data[type].highest.available += lots_available;
            carpark_data[type].highest.number += ', '+carpark_number;
        }
        else if(total_lots > carpark_data[type].highest.total){
            carpark_data[type].highest.total = total_lots;
            carpark_data[type].highest.available = lots_available;
            carpark_data[type].highest.number = carpark_number;
        }
    }  
}