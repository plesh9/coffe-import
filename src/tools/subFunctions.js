import { setIsLoading } from "../state/reducers/shopReducer";

export function openLoader(dispatch) {
  dispatch(setIsLoading(true));
  document.documentElement.classList.add("no-scroll");
}

export function closeLoader(dispatch) {
  dispatch(setIsLoading(false));
  if (document.documentElement.classList.contains("no-scroll")) {
    document.documentElement.classList.remove("no-scroll");
  }
}

export const scrollLock = () => {
  let body = document.querySelector("body");
  let lock_padding = document.querySelectorAll("[data-lp]");
  for (let index = 0; index < lock_padding.length; index++) {
    const el = lock_padding[index];
    el.style.paddingRight = window.innerWidth - body.offsetWidth + 'px';
  }
  body.style.paddingRight = window.innerWidth - body.offsetWidth + 'px';
  document.documentElement.classList.add("no-scroll");
}

export const scrollUnlock = () => {
	let body = document.querySelector("body");
		let lock_padding = document.querySelectorAll("[data-lp]");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = '0px';
    }
    body.style.paddingRight = '0px';
    document.documentElement.classList.remove("no-scroll");
}