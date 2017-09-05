import { combineReducers } from 'redux';
import { exportsHasErrored, uploadsHasErrored, exportsIsLoading, uploadsHasSucceeded, exports } from './exports';

export default combineReducers({
    exportsHasErrored,
    uploadsHasErrored,
    uploadsHasSucceeded,
    exportsIsLoading,
    exports
});
