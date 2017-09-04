import { combineReducers } from 'redux';
import { exportsHasErrored, exportsIsLoading, exports } from './exports';

export default combineReducers({
    exportsHasErrored,
    exportsIsLoading,
    exports
});
