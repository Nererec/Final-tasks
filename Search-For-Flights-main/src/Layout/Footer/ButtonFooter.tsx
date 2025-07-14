import style from './buttonFooter.module.css';
import { useAppSelector, useAppDispatch } from '../../Api/Store';
import { selectStatus } from '../../Api/Slice';
import { countReducer } from '../../Api/Slice';


function Footer() {

    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    
    
    return (
        <footer className={style.footer}>
            <button onClick={() => dispatch(countReducer())} className={style.button}>{status === "loading" 
                ? "Загрузка..." 
                : "Загрузить еще билеты"}</button>
        </footer>
    )
}

export default Footer;

