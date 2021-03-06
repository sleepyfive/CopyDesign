// 浏览器里的警告
export default function warning(condition, message: string) {
  if (process.env.NODE_ENV !== 'production' && console) {
    if (condition) {
      console.error(`Warning: ${message}`);
    }
  }
}
