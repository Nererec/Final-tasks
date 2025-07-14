import style from './blockFilterTransfer.module.css';
import { checkedTransZero, checkedTransOne, checkedTransTwo, checkedTransThree, uncheckedTransZero, uncheckedTransOne, uncheckedTransTwo, uncheckedTransThree } from '../../../Api/Slice';
import { useAppDispatch } from '../../../Api/Store';


function BlockFilterTransfer() {

    const dispatch = useAppDispatch();

    const heandleTransZero = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked === true){
            dispatch(checkedTransZero());
        }else if(e.target.checked === false){
            dispatch(uncheckedTransZero());
        }
    }    
    const heandleTransOne = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked === true){
            dispatch(checkedTransOne());
        }else if(e.target.checked === false){
            dispatch(uncheckedTransOne());
        }
    }
    const heandleTransTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked === true){
            dispatch(checkedTransTwo());
        }else if(e.target.checked === false){
            dispatch(uncheckedTransTwo());
        }
    }
    const heandleTransThree = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked === true){
            dispatch(checkedTransThree());
        }else if(e.target.checked === false){
            dispatch(uncheckedTransThree());
        }
    }
    
    return (
        <div className={style.blockFilterTransfer}>
            <h2 className={style.titleFilter}>Количество пересадок</h2>
            <div className={style.positionCheckbox}>
                <label className={style.label}>
                    <input onChange={heandleTransZero} type="checkbox" name="0" className={style.checkbox}/>
                    <span className={style.fake}></span>
                    <span>Без пересадок</span>
                </label>
                <label className={style.label}>
                    <input onChange={heandleTransOne} type="checkbox" name="1" className={style.checkbox}/>
                    <span className={style.fake}></span>
                    <span>1 пересадка</span>
                </label>
                <label className={style.label}>
                    <input onChange={heandleTransTwo} type="checkbox" name="2" className={style.checkbox}/>
                    <span className={style.fake}></span>
                    <span>2 пересадки</span>
                </label>
                <label className={style.label}>
                    <input onChange={heandleTransThree} type="checkbox" name="3" className={style.checkbox}/>
                    <span className={style.fake}></span>
                    <span>3 пересадки</span>
                </label>
            </div>
        </div>
    )
}

export default BlockFilterTransfer;