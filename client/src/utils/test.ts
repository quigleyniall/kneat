import { checkPropTypes } from 'prop-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const findByTestAttr = (wrapper: any, dataTestId: string) => {
  return wrapper.find(`[data-test="${dataTestId}"]`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
