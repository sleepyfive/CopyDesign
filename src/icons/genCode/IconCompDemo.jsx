import React, { useContext } from "react";
import IconContext from "../IconContext";

const IconComp = (props, ref) => {

    const { classPrefix } = useContext(IconContext)
    const { spin, className='' } = props
    const newProps = {
        className: `${className} ${classPrefix}-icon ${classPrefix}-icon-{{ IconName }}`,
        ref,
        ...props
    }

    if(spin) {
        newProps.className += `${classPrefix}-icon-loading` 
    }

    return {{ svg }}
}

const ForwardComp = React.forwardRef(IconComp)

export default ForwardComp