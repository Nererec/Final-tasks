import style from './blockFilterCompanies.module.css';
import { useAppDispatch } from '../../../Api/Store';
import { choiseRedWings, choisePobeda, choiseSseven } from '../../../Api/Slice';

function BlockFilterCompanies() {

    const dispatch = useAppDispatch();
    
    return (
        <div className={style.BlockFilterCompanies}>
            <h2 className={style.titleFilter}>Компании</h2>
            <div className={style.positionRadiobutton}>
                <label className={style.custom_radio}>
                    <input onChange={() => {dispatch(choisePobeda())}} type="radio" name='company' value="pobeda"/>
                    <span>Победа</span>
                </label>
 
                <label className={style.custom_radio}>
                    <input onChange={() => {dispatch(choiseRedWings())}} type="radio" name='company' value="redwings"/>
                    <span>Red Wings</span>
                </label>
 
                <label className={style.custom_radio}>
                    <input onChange={() => {dispatch(choiseSseven())}} type="radio" name='company' value="sevenairlines"/>
                    <span>S7 Airlines</span>
                </label>
            </div>
        </div>
    )
}

export default BlockFilterCompanies;