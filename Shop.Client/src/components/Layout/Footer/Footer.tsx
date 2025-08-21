import { FunctionComponent } from 'react';
import { user } from '../../../data/user.data';

import styles from './Footer.module.scss';

const Footer: FunctionComponent = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>
          Shop Project by {user.name}, <span>{new Date().getFullYear()}</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
