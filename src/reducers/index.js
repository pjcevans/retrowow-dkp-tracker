import { combineReducers } from 'redux';
import { exportsHasErrored, uploadsHasErrored, exportsIsLoading, uploadsHasSucceeded, graphData, exports } from './exports';

export default combineReducers({
    exportsHasErrored,
    uploadsHasErrored,
    graphData,
    uploadsHasSucceeded,
    exportsIsLoading,
    exports
});
