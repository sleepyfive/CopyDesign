import React, { forwardRef, MouseEventHandler } from "react";
import Group from "./group";
import { ButtonProps } from "./interface";
import { IconLoading } from "../../icons";

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

    return (<button
        ref={ref}
        style={style}
        onClick={handler}
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



