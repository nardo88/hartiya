document.addEventListener('DOMContentLoaded', () => {

    // плавный скролл при нажатии на элемент меню 
    const menu = (e) => {
        const navLink = document.querySelectorAll('.nav__link--scroll');
        const offer = document.querySelector('.offer');
        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        const popupOfferForm = document.querySelector('.popup-offer__form');

           // overlay-offer--active
        const overlayOffer = document.querySelector('.overlay-offer');
        const popupOffer = document.querySelector('.popup-offer');

        navLink.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const data = item.dataset.scroll;
                const scrollHigth = document.querySelector(data).offsetTop;
                window.scrollTo({
                    top: scrollHigth,
                    behavior: 'smooth'
                });
                togleMenu();
            })
        })

        offer.addEventListener('click', e => {
            e.preventDefault();
            overlayOffer.classList.add('overlay-offer--active');
            popupOffer.classList.add('popup-offer--active');
            togleMenu();
        })

        const closePopupOffer = () => {
            overlayOffer.classList.remove('overlay-offer--active');
            popupOffer.classList.remove('popup-offer--active');
        }

        overlayOffer.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('overlay-offer--active')){
                closePopupOffer();
            }
            if (target.classList.contains('cancel')){
                e.preventDefault();
                closePopupOffer();
            }
        })

        popupOfferForm.addEventListener('submit', sendOffer)

        async function sendOffer (e) {
            e.preventDefault();
            let formData = new FormData(popupOfferForm);
            // второй - это метод запроса (POST) и передаваемые данные
            let response = await fetch('sendOffer.php', {
                method: 'POST',
                body: formData,
            })
            // response - это ответ, если его параметр ok == true, тогда
            if (response.ok){
                let result = await response.json()
                popupOfferForm.reset()
                alert('Ваше собщение отправлено!')
                closePopupOffer();
                
            } else {
                // мы выдаем alert c результатом
                alert('Ошибка!')
                console.log(response);
            }
        }

        // открытие закрытие меню на мобильной версии


        const togleMenu = () => {
            nav.classList.toggle('nav-open')
        }

        header.addEventListener('click', e => {
            const target = e.target;

            const btn = target.closest('.burger');
            if (btn){
                togleMenu();
            }

            if (target.classList.contains('close')){
                togleMenu(); 
            }

            if (target.classList.contains('request')){
                e.preventDefault();
                const scrollHigth = document.querySelector('.join').offsetTop;
                window.scrollTo({
                    top: scrollHigth,
                    behavior: 'smooth'
                });
            }
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
                if (target) {
                    // получили тело акардеона
                    const tabBottom = target.nextElementSibling;
                    // получили ребенка акардеона что бы узнать его высоту
                    const child = tabBottom.childNodes[1];
                    if (tabBottom.classList.contains('acardeon__bottom--active')) {
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
        const overlayDocuments = document.querySelector('.overlay-documents');
        const popupDocumentsImg = document.querySelector('.popup-documents__img');

        let documentsSwiper = new Swiper('.documents-slider', {
            slidesPerView: 3,
            navigation: {
                nextEl: '.documents__next',
                prevEl: '.documents__prev',
            },

            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                840: {
                    slidesPerView: 3
                }
            }
        })

        const openPopupDocument = (src) => {
            overlayDocuments.classList.add('overlay-documents--open');
            popupDocumentsImg.src = `${src}`;
        }

        documentsSlider.addEventListener('click', e => {
            const target = e.target.closest('.documents-slider__item');
            if (target){
                openPopupDocument(target.children[0].dataset.src);
            }
        })

        overlayDocuments.addEventListener('click', (e) => {
       
            overlayDocuments.classList.remove('overlay-documents--open');
            popupDocumentsImg.src = '';

        })


    }

    documents();


    const members = () => {
        // получаем элементы страницы
        const membersSection = document.querySelector('#members');
        const membersCaption = document.querySelectorAll('.members__caption');
        const tabsItem = document.querySelectorAll('.tabs__item');
        // получаем таблицы


        // получаем обертку для members
        const memberWrapper = document.getElementById('member_wrapper');
        const groupWrapper = document.getElementById('group_wrapper');

        // пагинация 
        const paginationVlues = document.getElementById('members_pagination');
        const paginationGroupValues = document.getElementById('group_pagination')



        // ==========================================================заполнение таблиц ================================================

        // база

        const data = {}
        fetch('../data/members.json')
            .then(response => response.json())
            .then(data => render(data))

        


        // =======================================================================MEMBERS НАЧАЛО========================================================//

        const render = data => {
            // получаем количество табов в пагинации MEMBERS
            const tabMemberCount = Math.ceil(data.members.length / 6);

            const tableMembers = [];

            // вспомогательные переменные
            let count = 5; // граница в массиве участников
            let index = 0; // индекс в массиве с участниками

            // создаем таблицы и помещаем их в массив и строим пагинацию
            for (let i = 1; i <= tabMemberCount; i++) {
                // создание таблиц
                const tableItem = document.createElement('table');
                tableItem.className = 'tabs__table table-members';
                tableItem.insertAdjacentHTML('afterbegin', `
                    <tr class="tabs__title">
                        <td class="number">№</td>
                        <td>Организация</td>
                        <td>Регион, адрес</td>
                        <td>Почта, телефон</td>
                        <td>Должность, ФИО</td>
                    </tr>
                `);

                tableMembers.push(tableItem)

                // создание пагинации
                if (tabMemberCount >= 2) {
                    paginationVlues.insertAdjacentHTML('beforeend', `
                        <a href="#" class="pagination__link link-members">${i}</a>
                    `)

                    
                } else {
                    document.querySelector('.member-pagination-wr').style.display = 'none';
                }

            }


            for (let i = 1; i <= tabMemberCount; i++) {
                for (let ind = index; ind < data.members.length; ind++) {
                    if (ind <= count) {
                        tableMembers[i - 1].children[0].insertAdjacentHTML('beforeend', `
                            <tr class="tabs__data">
                                <td>${ind + 1}</td>
                                <td>${data.members[ind].organization}</td>
                                <td>${data.members[ind].adress}</td>
                                <td>${data.members[ind].contacts.mail}<br>${data.members[ind].contacts.phone}</td>
                                <td>
                                    <div>${data.members[ind].person.place}</div>
                                    <div>${data.members[ind].person.name}</div>
                                </td>
                            </tr>
                        `)
                    } else {
                        count += 6;
                        index = ind;
                        break
                    }
                }

                memberWrapper.insertAdjacentElement('beforeend', tableMembers[i - 1])
            }

            // активируем первую таблицу 
            tableMembers[0].classList.add('table-members--active');


            const linksMember = document.querySelectorAll('.link-members');
            if (linksMember.length){
                linksMember[0].classList.add('pagination__link--active');
            }


            
            // =======================================================================MEMBERS КОНЕЦ========================================================//


            // =======================================================================GROUP НАЧАЛО========================================================//

            // получаем количество табов в пагинации GROUP
            const tabGroupCount = Math.ceil(data.group.length / 6);

            const tableGroupArr = [];

            // вспомогательные переменные для GROUP
            let countGroup = 5; // граница в массиве участников
            let indexGroup = 0; // индекс в массиве с участниками

            // создаем таблицы и помещаем их в массив и строим пагинацию
            for (let i = 1; i <= tabGroupCount; i++) {
                // создание таблиц
                const tableItem = document.createElement('table');
                tableItem.className = 'tabs__table table-group';
                tableItem.insertAdjacentHTML('afterbegin', `
                    <tr class="tabs__title">
                        <td>№</td>
                        <td>ФИО</td>
                        <td>Полномочия</td>
                        <td>Должность</td>
                    </tr>
                
                `);

                tableGroupArr.push(tableItem)

                // создание пагинации
                if (tabGroupCount >= 2) {
                    paginationGroupValues.insertAdjacentHTML('beforeend', `
                        <a href="#" class="pagination__link link-group">${i}</a>
                    `)

                } else {
                    document.querySelector('.group-pagination-wr').style.display = 'none';
                }

            }

            for (let i = 1; i <= tabGroupCount; i++) {
                for (let ind = indexGroup; ind < data.group.length; ind++) {
                    if (ind <= countGroup) {
                        tableGroupArr[i - 1].children[0].insertAdjacentHTML('beforeend', `
                            <tr class="tabs__data group-data">
                                <td class="tabs__data-num">${ind + 1}</td>
                                <td class="tabs__data-name">${data.group[ind].person}</td>
                                <td class="tabs__data-rights">${data.group[ind].rights}</td>
                                <td class="tabs__data-place">${data.group[ind].place}</td>
                            </tr>
                        `)
                    } else {
                        countGroup += 6;
                        indexGroup = ind;
                        break
                    }
                }

                groupWrapper.insertAdjacentElement('beforeend', tableGroupArr[i - 1])
            }

            // активируем первую таблицу 
            tableGroupArr[0].classList.add('table-group--active');

            if (document.querySelectorAll('.link-group').length){

                document.querySelectorAll('.link-group')[0].classList.add('pagination__link--active');
            }


            // =======================================================================GROUP КОНЕЦ========================================================//





            // ==========================================================конец заполнения таблиц ========================================


            // функция переключения табов с участников на инициативную группу и обратно
            const memberTabs = (target) => {
                membersCaption.forEach((item, i) => {
                    item.classList.remove('members__active-title');
                    if (item === target) {
                        // дробавление активного класса заголову
                        item.classList.add('members__active-title');
                        // добавление активному классу контенту
                        tabsItem.forEach((elem, ind) => {
                            elem.classList.remove('tabs__item--active');
                            if (ind === i) {
                                elem.classList.add('tabs__item--active');
                            }
                        })
                    }
                })
            }

            // функция для переключения по пагинации у members
            const paginationMembers = (target) => {
                const links = document.querySelectorAll('.link-members');
                const tableMembers = document.querySelectorAll('.table-members');

                links.forEach((item, i) => {
                    item.classList.remove('pagination__link--active');
                    if (item === target) {
                        item.classList.add('pagination__link--active');
                        tableMembers.forEach((elem, ind) => {
                            elem.classList.remove('table-members--active');
                            if (ind === i) {
                                elem.classList.add('table-members--active');
                            }
                        })
                    }
                })

            }

            const paginationGroup = target => {
                const links = document.querySelectorAll('.link-group');
                const tableMembers = document.querySelectorAll('.table-group');

                links.forEach((item, i) => {
                    item.classList.remove('pagination__link--active');

                    if (item === target) {
                        item.classList.add('pagination__link--active');

                        tableMembers.forEach((elem, ind) => {
                            elem.classList.remove('table-group--active');
                            if (ind === i) {
                                elem.classList.add('table-group--active');
                            }
                        })
                    }
                })
            }

            // обработчик события на клик
            membersSection.addEventListener('click', e => {
                e.preventDefault();
                const target = e.target;
                // кликаем по заголовкам
                if (target.classList.contains('members__caption')) {
                    memberTabs(target)
                }

                // кликаем по пагинации members
                if (target.classList.contains('link-members')) {
                    paginationMembers(target);
                }

                // кликаем по пагинации group
                if (target.classList.contains('link-group')) {
                    paginationGroup(target);
                }


            })
        }
    }

    members();


    const join = () => {

        const joinForm = document.querySelector('.join__form');
        const overlayJoin = document.querySelector('.overlay-join');
       
        joinForm.addEventListener('submit', formSend);

        
        overlayJoin.addEventListener('click', () => {
            overlayJoin.classList.remove('overlay-join--open');

        })
     
        // aerywbz отправки
        async function formSend(e) {
            e.preventDefault();
            let formData = new FormData(joinForm);
                // второй - это метод запроса (POST) и передаваемые данные
                let response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: formData,
                })
                // response - это ответ, если его параметр ok == true, тогда
                if (response.ok){
                    let result = await response.json()
                    joinForm.reset()

                    overlayJoin.classList.add('overlay-join--open')
                    
                    setTimeout(() => {
                        overlayJoin.classList.remove('overlay-join--open')


                    }, 4000)
                } else {
                    // мы выдаем alert c результатом
                    alert('Ошибка!')
                    console.log(response);
                }
            
        };
   

    }

    join();




})