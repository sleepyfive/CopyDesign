import React, { forwardRef } from "react";
import Group from "./group";
import { ButtonProps } from "./interface";

const Button = (props: ButtonProps,ref) => {

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
    
    return (<button>
        
    </button>)
}

const ForwardButton = forwardRef(Button)

const ButtonComponent = ForwardButton as typeof ForwardButton & {
    Group: typeof Group
}

ButtonComponent.Group = Group

export default ButtonComponent



