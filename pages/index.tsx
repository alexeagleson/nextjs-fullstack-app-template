import Image from 'next/image';
import Link from 'next/link';
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout';
import { NextPageWithLayout } from './page';

const Home: NextPageWithLayout = () => {
  return (
    <section>
      <Image src="/Google.png" alt="Google Logo" width={272} height={92} />
      <p>
        Google offered in:{' '}
        <Link href="/" locale="fr">
          <a className="underline text-blue-600"> Français</a>
        </Link>
      </p>
    </section>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
