import { btnViewCheapReducer, btnViewFastReducer, btnViewOptimalReducer } from '../../../Api/Slice';
import { useAppSelector, useAppDispatch } from '../../../Api/Store'; 
import { selectStateBtnCheap, selectStateBtnFast, selectStateOptimal } from '../../../Api/Slice';
import style from './buttonsNavigation.module.css';


function ButtonsNavigation() {
   
    const dispatch = useAppDispatch();

    const changeCheap = useAppSelector(selectStateBtnCheap);
    const changeFast = useAppSelector(selectStateBtnFast);
    const changeOptimal = useAppSelector(selectStateOptimal);

    let cheap = changeCheap ? style.button : style.active;
    let fast = changeFast ? style.button : style.active;
    let optimal = changeOptimal ? style.button : style.active;

    return (
        <>
            <button onClick={() => dispatch(btnViewCheapReducer())} className={cheap+ ' ' +style.cheap}>Самый дешевый</button>
            <button onClick={() => dispatch(btnViewFastReducer())} className={fast+ ' ' +style.fast}>Самый быстрый</button>
            <button onClick={() => dispatch(btnViewOptimalReducer())} className={optimal+ ' ' +style.optimal}>Самый оптимальный</button>
        </>
    )
}

export default ButtonsNavigation;