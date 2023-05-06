import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import styles from '../assets/stylesheets/components/button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'danger';
  iconOnly?: boolean;
};

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { className, color, iconOnly, ...otherProps } = props;
  const newClassName = classNames(
    styles.button,
    color && styles[color],
    iconOnly && styles.iconOnly,
    className
  );

  return <button type="button" {...otherProps} ref={ref} className={newClassName} />;
});

export default Button;
