document.addEventListener('DOMContentLoaded', () => {

    // плавный скролл при нажатии на элемент меню 
    const menu = (e) => {
        const navLink = document.querySelectorAll('.nav__link--scroll');

        navLink.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const data = item.dataset.scroll;
                const scrollHigth = document.querySelector(data).offsetTop;
                window.scrollTo({top: scrollHigth, behavior: 'smooth'});
            })
        })

    }

    menu();

    // подключение слайдера в блоке новости
    const news = () => {
        let newsSwiper = new Swiper('.news-slider', {
            loop: true,
            autoHeight: true,
            navigation: {
                nextEl: '.news__next',
                prevEl: '.news__prev',
            }
        })
    }

    news();

    // акардеон
    const acardeon = () => {
        const top = document.querySelectorAll('.acardeon__top');
        const bottom = document.querySelectorAll('.acardeon__bottom');
        const acardeonBtn = document.querySelectorAll('.acardeon__btn');

        const secondHide = () => {
            bottom.forEach((item) => {
                item.style.height = '0px';
                item.classList.remove('acardeon__bottom--active');
            })
        }

        const spinBtn = () => {
            acardeonBtn.forEach(item => {
                item.classList.remove('acardeon__btn--active');

            })
        }

        top.forEach((item, i) => {
            item.addEventListener('click', e => {
                const target = e.target.closest('.acardeon__top');
                if (target){
                    // получили тело акардеона
                    const tabBottom = target.nextElementSibling;
                    // получили ребенка акардеона что бы узнать его высоту
                    const child = tabBottom.childNodes[1];
                    if (tabBottom.classList.contains('acardeon__bottom--active')){
                        secondHide();
                        spinBtn();
                    } else {
                        spinBtn();
                        secondHide();
                        acardeonBtn[i].classList.add('acardeon__btn--active');
                        tabBottom.classList.add('acardeon__bottom--active');
                        tabBottom.style.height = child.offsetHeight + 'px';
                    }
                }
            })
        })

    }

    acardeon();


    const documents = () => {
        const documentsSlider = document.querySelector('.documents-slider');

        let documentsSwiper = new Swiper('.documents-slider', {
            loop: true,
            slidesPerView: 3,
            navigation: {
                nextEl: '.documents__next',
                prevEl: '.documents__prev',
            }
        })

        // documentsSlider.addEventListener('click', e => {
        //     const target = e.target.closest('.documents-slider__item');
        //     if (target){
        //         console.log(target.children[0].src);
        //     }
        // })


    }

    documents();

})