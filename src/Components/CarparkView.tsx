import '../Styles/carparkView.css';
import { CarparkInterval } from '../Timers/carparkInterval';
import { useAppSelector } from '../app/hooks';

function CarparkView() {

    CarparkInterval();

    const { carpark } = useAppSelector(state => state.carpark)

    return (
        <div id="carparkViewGroup">
            {Object.keys(carpark).map((key) => {
                return (
                    <div key={key} className='carparkViewDiv'>
                        <h1>{key.toUpperCase()}</h1>
                        <div>HIGHEST ({carpark[key].highest.available} lots available): </div>
                        <div>{carpark[key].highest.number}</div>
                        <div>LOWEST ({carpark[key].lowest.available} lots available): </div>
                        <div>{carpark[key].lowest.number}</div>
                        <h3>-----------------</h3>
                    </div>
                );
            })}
        </div>
        
    );
}
  
export default CarparkView;