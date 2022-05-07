import { hideBurgerMenu } from './burgerMenu';

const SPEED = 0.2;

export function smoothScroll(event) {
  event.preventDefault();

  const target = event.target;

  if (target.matches('.menu__list-link')) {
    let start = 0;

    const pageY = window.pageYOffset;
    const targetAttribute = target.getAttribute('href');
    const elemCoord = document
      .querySelector(targetAttribute)
      .getBoundingClientRect().top;

    const step = (time) => {
      if (!start) start = time;

      const progress = time - start;

      const r =
        elemCoord < 0
          ? Math.max(pageY - progress / SPEED, pageY + elemCoord)
          : Math.min(pageY + progress / SPEED, pageY + elemCoord);

      window.scrollTo(0, r);

      if (r < pageY + elemCoord || r > pageY + elemCoord)
        requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  hideBurgerMenu();
}
