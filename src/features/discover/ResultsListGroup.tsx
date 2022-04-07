import SearchResult from '../search/SearchResult';

// components
import GoodResultGroup from './GoodResultGroup';
import BadResultGroup from './BadResultGroup';

export default function ResultsListGroup({ results }: {results: SearchResult[]}) {
  if (results.length) {
    return (
      <div className='results-list'>
        <GoodResultGroup results={results} />
      </div>
    );
  }
  return (
    <div className='results-list'>
      <BadResultGroup />
    </div>
  );
}
