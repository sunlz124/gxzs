import { useState, useEffect } from "react";

/**
 * 自定义 Hook：实时获取窗口可视高度
 * @returns {number} 当前窗口的可视高度（像素）
 */
function usePageTableHeight(): number {
  const [height, setHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    console.log("组件被加载");
    // 定义更新高度的函数（防抖优化）
    const handleResize = debounce(() => {
      const header = document.getElementById("page-header");
      const pageButton = document.getElementById("page-button");

      const headerH = header?.offsetHeight ?? 0;
      const pageButtonH = pageButton?.offsetHeight ?? 0;
      console.log("headerH:", headerH, "pageButtonH:", pageButtonH);
      setHeight(window.innerHeight - headerH - pageButtonH - 182);
    }, 800);
    handleResize();
    // 监听窗口变化
    window.addEventListener("resize", handleResize);

    // 组件卸载时清理监听
    return () => {
      console.log("组件被卸载了");
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return height;
}

// 防抖函数（避免频繁触发）
function debounce(fn: () => void, delay: number): () => void {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

export default usePageTableHeight;
