export const findByTestAttr = (wrapper, dataTestId) => {
  return wrapper.find(`[data-test="${dataTestId}"]`);
};
