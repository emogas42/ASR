    document.addEventListener('DOMContentLoaded', function() {
      var headers = document.querySelectorAll('.sector-accordion-header');

      headers.forEach(function(header) {
        header.addEventListener('click', function() {
          var item = this.closest('.sector-accordion-item');
          var body = item.querySelector('.sector-accordion-body');
          var isOpen = item.classList.contains('is-open');

          // Bütün digərlərini bağla
          document.querySelectorAll('.sector-accordion-item').forEach(function(otherItem) {
            if (otherItem !== item) {
              otherItem.classList.remove('is-open');
              otherItem.querySelector('.sector-accordion-header').setAttribute('aria-expanded', 'false');
              otherItem.querySelector('.sector-accordion-body').style.maxHeight = null;
            }
          });

          // Cari elementi aç/bağla
          if (isOpen) {
            item.classList.remove('is-open');
            this.setAttribute('aria-expanded', 'false');
            body.style.maxHeight = null;
          } else {
            item.classList.add('is-open');
            this.setAttribute('aria-expanded', 'true');
            // Tam açılma üçün kifayət qədər böyük dəyər
            body.style.maxHeight = body.scrollHeight + 60 + 'px';
          }
        });
      });
    });

    document.addEventListener('DOMContentLoaded', function() {
      var expertSwiper = new Swiper('.expert-swiper', {
        slidesPerView: 3,
        spaceBetween: 24,
        slidesPerGroup: 3,
        loop: false,
        grabCursor: true,
        pagination: {
          el: '.expert-swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.expert-swiper-next',
          prevEl: '.expert-swiper-prev',
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
            slidesPerGroup: 3,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2,
          },
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
            slidesPerGroup: 1,
          }
        }
      });
    });