import { Tcompany } from '../Types/Types';
import style from './globalLogo.module.css';


const GlobalSvg = ({ company }: Tcompany) => {

    switch (company) {
        case 'Pobeda':
            return (
                <div className={style.pobeda}></div>   
            ) 
            case 'Redwings':
                return (
                    <div className={style.redwings}></div>   
                )
            case 'Ssevenair':
            return (
                <div className={style.ssevenair}></div>   
            )
        default:
            return null;
    }
}

export default GlobalSvg;