const debounce = (fn: any, delay: number) => {
  let timer: any;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(), delay);
  };
};
export const setPageTableHeight = () => {
  window.addEventListener(
    "resize",
    debounce(function () {
      console.log("防抖后的高度:", window.innerHeight);
      //   setHeight(window.innerHeight);
    }, 1000)
  );
};
