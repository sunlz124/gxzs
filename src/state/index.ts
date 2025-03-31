import { atom, RecoilState } from "recoil";

export const pageLoadingState: RecoilState<boolean> = atom({
  key: "pageLoadingState ",
  default: false,
});
