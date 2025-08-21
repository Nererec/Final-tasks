import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: FunctionComponent = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/" className={styles.header__logo}>
          Shop Project
        </Link>
      </div>
    </header>
  );
};

export default Header;
