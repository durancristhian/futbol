import Loadable from 'react-loadable';
import Spinner from '../Spinner/Spinner';

const AsyncComponent = (opts) =>
  Loadable({
    loading: Spinner,
    ...opts
  });

export default AsyncComponent;
