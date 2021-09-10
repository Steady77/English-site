'use strict'

document.addEventListener('DOMContentLoaded', () => {

  AOS.init({
    once: true,
  });

  // Burger Menu

  const menuButton = document.querySelector('.menu-btn');
  const menuList = document.querySelector('.menu__list');
  const speed = 0.2; //Scroll Speed
  const menuLinks = document.querySelectorAll('.menu__list-link');

  if (menuButton) {
    menuButton.addEventListener('click', () => {
      menuList.classList.toggle('menu__list--active');
      menuButton.classList.toggle('menu-btn--active');
      document.body.classList.toggle('lock');
    });
  }

  document.body.addEventListener('click', e => {
    let target = e.target;
    if (!target.closest('.menu')) {
      menuList.classList.remove('menu__list--active');
      menuButton.classList.remove('menu-btn--active');
      document.body.classList.remove('lock');
    }
  });

  // Swiper

  const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    }
  });

  // Smoth scroll

  function scroll(event) {
    (event).preventDefault();
    let target = event.target;

    if (target.matches('.menu__list-link')) {
      let start = 0;
      const pageY = window.pageYOffset;
      const targetAttribute = target.getAttribute('href');
      const elemCoord = document.querySelector(targetAttribute).getBoundingClientRect().top;

      const step = time => {
        if (!start) start = time;
        const progress = time - start;
        const r = (elemCoord < 0 ?
          Math.max(pageY - progress / speed, pageY + elemCoord) :
          Math.min(pageY + progress / speed, pageY + elemCoord))
        window.scrollTo(0, r);
        if (r < pageY + elemCoord || r > pageY + elemCoord) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    menuList.classList.remove('menu__list--active');
    menuButton.classList.remove('menu-btn--active');
    document.body.classList.remove('lock');
  }

  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', scroll);
  });

  // Form

  const form = document.getElementById('form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    
    if(error === 0) {
      form.classList.add('sending');
      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('sending');
      } else {
        alert('Ошибка');
        form.classList.remove('sending');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.req');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if(input.classList.contains('contacts__form-input--email')) {
        if(emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.value === '') {
        formAddError(input);
        error++;
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add('error');
  }
  function formRemoveError(input) {
    input.classList.remove('error');
  }
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

});
