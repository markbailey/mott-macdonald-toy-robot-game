import { ButtonHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import classNames from 'classnames';
import styles from '../assets/stylesheets/components/button.module.scss';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { className, ...otherProps } = props;
  const newClassName = classNames(styles.button, className);
  return <button type="button" {...otherProps} ref={ref} className={newClassName} />;
});

export default Button;
