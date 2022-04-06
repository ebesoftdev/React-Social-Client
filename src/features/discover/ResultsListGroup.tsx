import GoodResultGroup from './GoodResultGroup';
import BadResultGroup from './BadResultGroup';

export default function ResultsListGroup({ results }:any) {
  if (results.length) {
    return (
      <div className='results-list'>
        {
          results.map((result: any) => <GoodResultGroup user={result} />)
        }
      </div>
    );
  }
  return (
    <div className='results-list'>
      <BadResultGroup />
    </div>
  );
}
