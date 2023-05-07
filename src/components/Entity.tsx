import { HTMLAttributes } from 'react';
import classNames from 'classnames';
import show from '../utilities/show';
import css from '../assets/stylesheets/components/entity.module.scss';

export type EntityProps = HTMLAttributes<HTMLDivElement> & { type: EntityType };
export type RobotProps = HTMLAttributes<HTMLDivElement> &
  Pick<Robot, 'facing'> & {
    insult: string | null;
    onClick?: () => void;
  };

function Entity(props: EntityProps) {
  const { className: classNameProp, type, ...otherProps } = props;
  const className = classNames(css.entity, css[type], classNameProp);
  return <div {...otherProps} className={className} />;
}

export function Robot(props: RobotProps) {
  const { className: classNameProp, facing, insult, onClick, ...otherProps } = props;
  const className = classNames(css.robot, facing && css[`facing${facing}`], classNameProp);
  const isSpeaking = insult !== null;

  return (
    <Entity {...otherProps} type="robot" className={className} onClick={onClick}>
      {show(isSpeaking, <div className={css.speechBubble}>{insult}</div>)}
    </Entity>
  );
}

export default Entity;
