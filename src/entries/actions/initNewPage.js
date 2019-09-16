import { NEW_PAGE_INIT } from '../constants';

const initNewPage = () => dispatch => {
  dispatch({ type: NEW_PAGE_INIT });
};

export default initNewPage;