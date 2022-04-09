import PrimaryLayout from '../../components/layouts/primary/PrimaryLayout';
import SearchResult from '../../components/utility/search-result/SearchResult';
import { mockSearchResultProps } from '../../components/utility/search-result/SearchResult.mocks';
import { NextPageWithLayout } from '../page';

const Results: NextPageWithLayout = () => {
  return (
    <section className="flex flex-col items-center gap-y-5">
      <div className={`flex flex-col space-y-8`}>
        {[...new Array(6)].map((_, idx) => {
          return <SearchResult key={idx} {...mockSearchResultProps.base} />;
        })}
      </div>
    </section>
  );
};

export default Results;

Results.getLayout = (page) => {
  return <PrimaryLayout justify="items-start">{page}</PrimaryLayout>;
};
