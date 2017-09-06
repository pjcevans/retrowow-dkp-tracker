export function exportsHasErrored(state = false, action) {
  switch (action.type) {
    case 'EXPORTS_HAS_ERRORED':
      return action

    default:
      return state;
  }
}

export function uploadsHasErrored(state = false, action) {
  switch (action.type) {
    case 'UPLOADS_HAS_ERRORED':
      return action.hasErrored;
    case 'UPLOADS_CLEAR_ERRORED':
      return action.hasErrored;
    default:
      return state;
  }
}

export function uploadsHasSucceeded(state = false, action) {
  switch (action.type) {
    case 'UPLOADS_HAS_SUCCEEDED':
      return action.hasSucceeded;
    case 'UPLOADS_CLEAR_SUCCEEDED':
      return action.hasSucceeded;
    default:
      return state;
  }
}


export function exportsIsLoading(state = false, action) {
  switch (action.type) {
    case 'EXPORTS_IS_LOADING':
      return action.isLoading;

    default:
      return state;
  }
}

export function exports(state = {}, action) {
  switch (action.type) {
    case 'EXPORTS_GET_DATA_SUCCESS':
      let data = {};
      data.exports = action.exports;
      data.ggc = action.exports.filter((currentExport) => {
        return currentExport.guild === "Goldshire Golfclub";
      })
      data.ce = action.exports.filter((currentExport) => {
        return currentExport.guild === "Certus Excessum";
      })
      data.dp = action.exports.filter((currentExport) => {
        return currentExport.guild === "De Profundis";
      })
      return data;

    default:
      return state;
  }
}

// state = {members:[],average:true}
export function graphData(state = {members:[],average:true,graphType:"totalDkp"}, action) {
  switch (action.type) {
    case 'ADD_GRAPH_MEMBER':
      if (state.members.indexOf(action.member) === -1) {
        return {
          ...state,
          members: [...state.members, action.member]
        }
      }
    case 'TOGGLE_GRAPH_AVERAGE':
      return {
        ...state,
        average: action.bool
      }
    case 'REMOVE_GRAPH_MEMBER':
      const index = state.members.indexOf(action.member);
      // Send original state back if member is not found within array
      if (index === -1 ){
        return state
      }
      // Remove member from the array
      return {
        ...state,
        members: [...state.members.slice(0, index), ...state.members.slice(index + 1)]
      }
    case 'SELECT_GRAPH_TYPE':
      return {
        ...state,
        graphType: action.graphType
      }
    default:
      return state;
  }
}
