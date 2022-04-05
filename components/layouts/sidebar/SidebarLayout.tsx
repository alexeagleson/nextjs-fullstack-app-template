import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import styles from './SidebarLayout.module.css';

export interface ISidebarLayout {}

const SidebarLayout: React.FC<ISidebarLayout> = () => {
  const { status } = useSession();

  return (
    <nav className={styles.nav}>
      {status === 'authenticated' ? (
        <>
          <p>Signed in</p>
          <button onClick={() => signOut()}>Sign Out</button>
        </>
      ) : (
        <Link href="/api/auth/signin">
          <a>Sign in</a>
        </Link>
      )}
      <input className={styles.input} placeholder="Search..." />
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </nav>
  );
};

export default SidebarLayout;
