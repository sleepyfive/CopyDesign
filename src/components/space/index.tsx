import React, { forwardRef, useMemo } from 'react'; 'react'
import { SpaceSize, SpaceProps } from './interface';
import { isNumber, isArray } from "../utils/is";
import { classNamePrefix } from "../constant";
// import useMergeProps from '../util/hooks/useMergeProps';
import mergeCNs from '../utils/classNames'
import './style'

const defaultProps: SpaceProps = {
    size: 'small',
    direction: 'horizontal',
  };

function getMargin(size: SpaceSize) {
    if (isNumber(size)) {
      return size;
    }
    switch (size) {
      case 'mini':
        return 4;
      case 'small':
        return 8;
      case 'medium':
        return 16;
      case 'large':
        return 24;
      default:
        return 8;
    }
}

const prefix = classNamePrefix + 'space'

function Space(props:SpaceProps, ref:any ){

    const { className, style, children, size, direction, align, wrap, split, ...rest } = props;
    
    const _direction = useMemo(()=>direction||defaultProps.direction,[direction])

    // 默认垂直方向居中对齐
    const innerAlign = align || (_direction === 'horizontal' ? 'center' : '');

    const classNames = mergeCNs(
        prefix,
        `${prefix}-${_direction}`,
        `${prefix}-align-${innerAlign}`,
        {
          [`${prefix}-wrap`]: wrap,
          [`${prefix}-rtl`]: false,
        },
        className
      );

        const hasSplit = split !== undefined && split !== null
    
        function getMarginStyle(isLastOne:boolean) {
        
            if (typeof size === 'string' || typeof size === 'number') {
              const margin = getMargin(size);
              if (wrap) {
                return isLastOne
                  ? { marginBottom: margin }
                  : {
                      marginRight: margin,
                      marginBottom: margin,
                    };
              }
              return !isLastOne
                ? {
                    [direction === 'vertical' ? 'marginBottom' : 'marginRight']: margin,
                  }
                : {};
            }
            if (isArray(size)) {
              const marginHorizontal = getMargin(size[0]);
              const marginBottom = getMargin(size[1]);
              if (wrap) {
                return isLastOne
                  ? { marginBottom }
                  : {
                      marginRight: marginHorizontal,
                      marginBottom,
                    };
              }
              if (direction === 'vertical') {
                return { marginBottom };
              }
              return { marginRight : marginHorizontal };
            }
          }
        

    return <div
        ref={ref}
        style={style}
        className={classNames}
        {...rest}
    >
        {
            children?.map((c,idx)=>{
                const shouldRenderSplit = hasSplit && idx!==0
                return (
                    <>
                    {shouldRenderSplit && <div className={`${prefix}-item-split`}>{split}</div>}
                    <div className={`${prefix}-item`} style={getMarginStyle(idx+1===children.length)}>
              {c}
            </div>
                    </>
                )
            })
        }
    </div>
}

const WrapSpace = forwardRef<unknown,SpaceProps>(Space)
export default WrapSpace