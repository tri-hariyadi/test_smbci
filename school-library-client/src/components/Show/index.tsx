import { Children, type FC, type JSX, type PropsWithChildren } from 'react';

export type ShowProps = PropsWithChildren<{
  isTrue?: object | string | number | boolean | null;
}>;

const Show: FC<PropsWithChildren> & { When: FC<ShowProps> } & { Else: FC<PropsWithChildren> } = (props) => {
  let when: JSX.Element | null = null;
  let otherwise: JSX.Element | null = null;

  Children.forEach(props.children as JSX.Element, (children: JSX.Element | null) => {
    if (children?.props.isTrue === undefined) {
      otherwise = children;
    } else if (!when && children.props.isTrue) {
      when = children;
    }
  });

  return when || otherwise;
};

Show.When = ({ isTrue, children }) => (isTrue ? (children as JSX.Element) : null);
Show.Else = ({ children }) => children as JSX.Element;

export default Show;
