import checkPropTypes from 'check-prop-types';

export const findByTestAttr = (wrapper: any, dataTestId: string) => {
  return wrapper.find(`[data-test="${dataTestId}"]`);
};

export const checkProps = (component: any, conformingProps: any) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    'prop',
    component.name
  );
  // eslint-disable-next-line no-undef
  expect(propError).toBeUndefined();
};
