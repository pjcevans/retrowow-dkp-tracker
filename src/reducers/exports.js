export function exportsHasErrored(state = false, action) {
  switch (action.type) {
    case 'EXPORTS_HAS_ERRORED':
      // return action.hasErrored;
      return action

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

export function exports(state = [], action) {
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
      // return action.exports;

    default:
      return state;
  }
}
