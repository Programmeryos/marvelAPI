import Spinner from '../components/spinner/spinner';
import errorMessange from '../components/errorMessange/errorMessange';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return <Skeleton/>
            break;
        case 'loading':
            return <Spinner/>
            break;
        case  'confirmed':
            return <Component data={data}/>
            break;
        case 'error': 
            return <errorMessange/>
            break;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;

