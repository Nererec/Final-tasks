import style from './header.module.css';
import SvgAircraft from '../../SvgLogo/svgLogo';

function Header() {
    return (
        <header className={style.header}>
            <div>
                <SvgAircraft />
            </div>
            <h1 className={style.text_header}>Поиск авиабилетов</h1>
        </header>
    )
}

export default Header;