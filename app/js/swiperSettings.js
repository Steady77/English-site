import Swiper, { Navigation, Pagination } from 'swiper';

export function initSwiper() {
  new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    loop: true,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  });
}
