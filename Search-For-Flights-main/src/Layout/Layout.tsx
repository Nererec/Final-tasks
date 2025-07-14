import  style  from './layout.module.css';
import { TchildrenProps } from '../Types/Types';

function Layout({ children }: TchildrenProps) {
    return (
        <div className={style.layout}>
            { children}
        </div>
    )
}

export default Layout;