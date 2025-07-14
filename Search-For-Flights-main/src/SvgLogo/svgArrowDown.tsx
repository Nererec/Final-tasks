import style from './svgArrowDown.module.css';
import { displyFilterMenu } from '../Api/Slice';
import { useAppDispatch } from '../Api/Store';

function SvgArrowDown() {
    
    const dispatch = useAppDispatch();

    const heandleDisplayFilter = () => {
        dispatch(displyFilterMenu())
    }

    return (
        <button onClick={heandleDisplayFilter} className={style.menuApear_button}></button>
    )
}

export default SvgArrowDown;