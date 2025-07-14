import style from './main.module.css';
import ButtonsNavigation from './ButtonsNavigation/ButtonsNavigation';
import BlockFilterTransfer from './BlockFilterTransfer/BlockFilterTransfer';
import BlockFilterCompanies from './BlockFilterCompanies/BlockFilterCompanies';
import TicketsInfo from './TicketsInfo/TicketsInfo';
import SvgArrowDown from '../../SvgLogo/svgArrowDown';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../Api/Store';
import { fetchTickets } from '../../Api/FetchTickets';
import { selectListTickets, selectStatePrams, selectStateDisplayFilter } from '../../Api/Slice';


function Main() { 

    const stateParams = useAppSelector(selectStatePrams);
    const stateDisplayFilter = useAppSelector(selectStateDisplayFilter);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTickets(stateParams))
    }, [stateParams])

    const listTickets = useAppSelector(selectListTickets);

    return (
        <main className={style.block_main}>
            <div className={style.block_filters}>
                <BlockFilterTransfer />
                <BlockFilterCompanies />
            </div>
            <div className={style.block_info}>
                <div className={style.block_info__navigation}>
                    <ButtonsNavigation />
                </div>
                <div className={stateDisplayFilter ? style.menuApearHeaderWhithBottom : style.menuApearHeader}>
                    <h2 className={style.menuApear_title}>Любая авиакомпания, любое кол-во пересадок</h2>
                    <h2 className={style.menuApear_titleAction}>Открыть настройки</h2>
                    <SvgArrowDown />
                    {stateDisplayFilter && 
                    <div className={style.menuApearFilter}>
                        <BlockFilterCompanies />
                        <BlockFilterTransfer />
                    </div>
                    }
                </div>
                <div className={style.block_info__tickets}>
                    {listTickets.map((ticket) => <TicketsInfo key={ticket.id} {...ticket} /* id={ticket.id} company={ticket.company} from={ticket.from} to={ticket.to} currency={ticket.currency} price={ticket.price} startTime={ticket.startTime} endTime={ticket.endTime} duration={ticket.duration} transfers={ticket.transfers} */ />)}
                </div>
            </div>
        </main>
    )
}

export default Main;


