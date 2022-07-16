import { resolve } from "path";
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "fs";
import { log } from './utils'
import { optimize, OptimizeOptions, OptimizedSvg } from "svgo";

interface ISVG {
    path: string
    name: string
    code: string
}

const getSVGs = function(path:string):ISVG[] {

    const names = new Array<ISVG>()

    const dirs = readdirSync(path)
    
    dirs.forEach(dir => {

        const dirPath = resolve(path,dir)

        const ds = readdirSync(dirPath)

        ds.forEach(dd => {
            const ddPath = resolve(dirPath,dd) 
            const dds = readdirSync(ddPath)

            dds.forEach(file=>{

                const filePath = resolve(ddPath,file)

                const len = file.length

                names.push({
                    path: filePath,
                    name: file.substring(0,len-4),
                    code: readFileSync(filePath, {encoding: 'utf-8'})//指定编码获取字符串
                })
            })

            
        })
    })

    return names
}

const svgs = getSVGs(resolve('../','_svgs'))

// icon组件的模板路径
const TPath = resolve('.','IconCompDemo.jsx')

const svgoConfig = {
    plugins: [
      'removeUnknownsAndDefaults',
      'cleanupAttrs',
      'removeXMLNS',
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeTitle',
      'removeDesc',
      'removeUselessDefs',
      'removeEditorsNSData',
      'removeEmptyAttrs',
      'removeHiddenElems',
      'removeEmptyText',
      'removeEmptyContainers',
      // 'removeViewBox',
      'cleanupEnableBackground',
      'convertStyleToAttrs',
      'convertColors',
      'convertPathData',
      'convertTransform',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      'removeUnusedNS',
      'cleanupIDs',
      'cleanupNumericValues',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      // 'removeRasterImages',
      'mergePaths',
      'convertShapeToPath',
      'sortAttrs',
      'removeDimensions',
      {
        name: 'addAttributesToSVGElement',
        params: {
          attributes: [
            {
              fill: 'none',
            },
            {
              stroke: 'currentColor',
            },
            '{...props}',
          ],
        },
      },
    ],
  } as OptimizeOptions
  

const genCode = function(svg:ISVG):string{

    const newSVG = (optimize(svg.code,{
        path:svg.path,
        ...svgoConfig 
    }) as OptimizedSvg).data

    const template = readFileSync(TPath,{encoding: 'utf-8'})
    return template
                .replaceAll('{{ IconName }}',svg.name)
                .replaceAll('{{ svg }}', newSVG)
                .replace(/stroke-width=/g, 'strokeWidth=')
                .replace(/stroke-linecap=/g, 'strokeLinecap=')
                .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
                .replace(/fill-rule=/g, 'fillRule=')
                .replace(/clip-rule=/g, 'clipRule=')
                .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
                .replace(/class=/g, 'className=');

}

const entryPath = resolve('..')
// const ENTRY_NAME = 'index.js'
const CONTEXT_NAME = 'IconContext.js'
const COMPONENT_PATH = 'comp'
const componentsPath = resolve(entryPath,COMPONENT_PATH)

const toCamelStyle = function(name:string):string{
    const items = name.split('-')
    return items
        .map(item=>item.charAt(0).toUpperCase()+item.substring(1))
        .join('')
}

// 生成context文件
const contextJS = `import React, { createContext } from "react";
const IconContext = createContext({
    classPrefix: 'copy-design'
})
export default IconContext
`
writeFileSync(resolve(entryPath,CONTEXT_NAME),contextJS)
log('😋生成IconContext成功！')

// 生成Icon组件入口和类型文件
const bufferEntry = Array<string>()
const bufferType = Array<string>()
bufferType.push(`import { ForwardRefExoticComponent, RefAttributes, CSSProperties } from "react";
type IIconProps = {
    style?: CSSProperties,
    spin?: boolean
}
`)

if(!readdirSync(entryPath).includes(COMPONENT_PATH)) {
    log(`不存在${COMPONENT_PATH}路径`)
    mkdirSync(componentsPath)
    log('😋创建成功！')
}

svgs.forEach(svg=>{

    const camelName = toCamelStyle(svg.name)
    bufferEntry.push(`export { default as Icon${camelName} } from './${COMPONENT_PATH}/${camelName}'`)
    bufferType.push(`export declare const Icon${camelName}: ForwardRefExoticComponent<IIconProps & RefAttributes<unknown>>`)
    // 生成Icon组件代码
    const iconCode = genCode(svg)

    writeFileSync(resolve(componentsPath,`${camelName}.jsx`),iconCode)
})

log('😋生成Icon组件代码成功！')

writeFileSync(resolve(entryPath, 'index.js'),bufferEntry.join('\n'))
log('😋入口文件成功！')
writeFileSync(resolve(entryPath, 'index.d.ts'),bufferType.join('\n'))
log('😋组件类型.d.ts文件成功！')
log('👀👀👀生成图标组件成功！！！')
