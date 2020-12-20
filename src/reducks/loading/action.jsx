export const COMPLETE_LOADING = "COMPLETE_LOADING";
export const complete_loading = (loading) => {
  return {
    type: COMPLETE_LOADING,
    payload: loading,
  };
};
