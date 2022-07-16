"use strict";
var import_path = require("path");
var import_fs = require("fs");
var import_utils = require("./utils");
var import_svgo = require("svgo");
const getSVGs = function(path) {
  const names = new Array();
  const dirs = (0, import_fs.readdirSync)(path);
  dirs.forEach((dir) => {
    const dirPath = (0, import_path.resolve)(path, dir);
    const ds = (0, import_fs.readdirSync)(dirPath);
    ds.forEach((dd) => {
      const ddPath = (0, import_path.resolve)(dirPath, dd);
      const dds = (0, import_fs.readdirSync)(ddPath);
      dds.forEach((file) => {
        const filePath = (0, import_path.resolve)(ddPath, file);
        const len = file.length;
        names.push({
          path: filePath,
          name: file.substring(0, len - 4),
          code: (0, import_fs.readFileSync)(filePath, { encoding: "utf-8" })
        });
      });
    });
  });
  return names;
};
const svgs = getSVGs((0, import_path.resolve)("../", "_svgs"));
const TPath = (0, import_path.resolve)(".", "IconCompDemo.jsx");
const svgoConfig = {
  plugins: [
    "removeUnknownsAndDefaults",
    "cleanupAttrs",
    "removeXMLNS",
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeTitle",
    "removeDesc",
    "removeUselessDefs",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeHiddenElems",
    "removeEmptyText",
    "removeEmptyContainers",
    "cleanupEnableBackground",
    "convertStyleToAttrs",
    "convertColors",
    "convertPathData",
    "convertTransform",
    "removeNonInheritableGroupAttrs",
    "removeUselessStrokeAndFill",
    "removeUnusedNS",
    "cleanupIDs",
    "cleanupNumericValues",
    "moveElemsAttrsToGroup",
    "moveGroupAttrsToElems",
    "collapseGroups",
    "mergePaths",
    "convertShapeToPath",
    "sortAttrs",
    "removeDimensions",
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [
          {
            fill: "none"
          },
          {
            stroke: "currentColor"
          },
          "{...props}"
        ]
      }
    }
  ]
};
const genCode = function(svg) {
  const newSVG = (0, import_svgo.optimize)(svg.code, {
    path: svg.path,
    ...svgoConfig
  }).data;
  const template = (0, import_fs.readFileSync)(TPath, { encoding: "utf-8" });
  return template.replaceAll("{{ IconName }}", svg.name).replaceAll("{{ svg }}", newSVG).replace(/stroke-width=/g, "strokeWidth=").replace(/stroke-linecap=/g, "strokeLinecap=").replace(/stroke-linejoin=/g, "strokeLinejoin=").replace(/fill-rule=/g, "fillRule=").replace(/clip-rule=/g, "clipRule=").replace(/stroke-miterlimit=/g, "strokeMiterlimit=").replace(/class=/g, "className=");
};
const entryPath = (0, import_path.resolve)("..");
const CONTEXT_NAME = "IconContext.js";
const COMPONENT_PATH = "comp";
const componentsPath = (0, import_path.resolve)(entryPath, COMPONENT_PATH);
const toCamelStyle = function(name) {
  const items = name.split("-");
  return items.map((item) => item.charAt(0).toUpperCase() + item.substring(1)).join("");
};
const contextJS = `import React, { createContext } from "react";
export default IconContext = createContext({
    classPrefix: 'copy-design'
})
`;
(0, import_fs.writeFileSync)((0, import_path.resolve)(entryPath, CONTEXT_NAME), contextJS);
(0, import_utils.log)("\u{1F60B}\u751F\u6210IconContext\u6210\u529F\uFF01");
const bufferEntry = Array();
const bufferType = Array();
bufferType.push(`import { ForwardRefExoticComponent, RefAttributes, CSSProperties } from "react";
type IIconProps = {
    style?: CSSProperties,
    spin?: boolean
}
`);
if (!(0, import_fs.readdirSync)(entryPath).includes(COMPONENT_PATH)) {
  (0, import_utils.log)(`\u4E0D\u5B58\u5728${COMPONENT_PATH}\u8DEF\u5F84`);
  (0, import_fs.mkdirSync)(componentsPath);
  (0, import_utils.log)("\u{1F60B}\u521B\u5EFA\u6210\u529F\uFF01");
}
svgs.forEach((svg) => {
  const camelName = toCamelStyle(svg.name);
  bufferEntry.push(`export { default as Icon${camelName} } from './${COMPONENT_PATH}/${camelName}'`);
  bufferType.push(`export declare const Icon${camelName}: ForwardRefExoticComponent<IIconProps & RefAttributes<unknown>>`);
  const iconCode = genCode(svg);
  (0, import_fs.writeFileSync)((0, import_path.resolve)(componentsPath, `${camelName}.jsx`), iconCode);
});
(0, import_utils.log)("\u{1F60B}\u751F\u6210Icon\u7EC4\u4EF6\u4EE3\u7801\u6210\u529F\uFF01");
(0, import_fs.writeFileSync)((0, import_path.resolve)(entryPath, "index.js"), bufferEntry.join("\n"));
(0, import_utils.log)("\u{1F60B}\u5165\u53E3\u6587\u4EF6\u6210\u529F\uFF01");
(0, import_fs.writeFileSync)((0, import_path.resolve)(entryPath, "index.d.ts"), bufferType.join("\n"));
(0, import_utils.log)("\u{1F60B}\u7EC4\u4EF6\u7C7B\u578B.d.ts\u6587\u4EF6\u6210\u529F\uFF01");
(0, import_utils.log)("\u{1F440}\u{1F440}\u{1F440}\u751F\u6210\u56FE\u6807\u7EC4\u4EF6\u6210\u529F\uFF01\uFF01\uFF01");
