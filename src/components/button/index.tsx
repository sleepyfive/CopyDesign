import React, { forwardRef, MouseEventHandler } from "react";
import Group from "./group";
import { ButtonProps } from "./interface";
import { IconLoading } from "../../icons";
import { classNamePrefix } from "../constant";
import mergeCNs from "../utils/classNames";
import './style'

const prefix = classNamePrefix+"btn"

const defaultProps: ButtonProps = {
    htmlType: 'button',
    type: 'default',
    shape: 'square',
  };

const Button = (props: ButtonProps,ref: any) => {

    const {
        style,
        className,
        children,
        htmlType,
        type,
        status,
        size,
        shape,
        href,
        anchorProps,
        disabled,
        loading,
        loadingFixedWidth,
        icon,
        iconOnly,
        onClick,
        long,
        ...rest
      } = props;
    
      const loadingIcon = loading ? <IconLoading /> : icon 

      const _children = <>
        {loadingIcon}
        {children}
      </>

      const handler: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        onClick && onClick(event as unknown as MouseEvent)
      }

      const _type = type === 'default' ? 'secondary' : type;

      const cns = mergeCNs(prefix,
        `${prefix}-${_type}`,
        className,
      )

    return (<button
        ref={ref}
        style={style}
        onClick={handler}
        className={cns}
        {...rest}
    >
        {_children}
    </button>)
}

const ForwardButton = forwardRef(Button)

const ButtonComponent = ForwardButton as typeof ForwardButton & {
    Group: typeof Group
}

ButtonComponent.Group = Group

export default ButtonComponent



