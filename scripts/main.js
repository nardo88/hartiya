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


    const members = () => {
        // получаем элементы страницы
        const membersSection = document.querySelector('#members');
        const membersCaption = document.querySelectorAll('.members__caption');
        const tabsItem = document.querySelectorAll('.tabs__item');
        // получаем таблицы
        const tableMembers = document.querySelector('.table-members').children[0];
        const tableGroup = document.querySelector('.table-group').children[0];

        console.log(tableGroup);


        // ==========================================================заполнение таблиц ================================================

        // база

        const data = {
            members: [
                {organization: 'КПК «Свой Дом»', adress: 'г. Курганинск Краснодарский край', contacts: {mail: 'Info@kpksvoydom.ru', phone: '8(918)439-01-61'}, person: {name: 'Мокина Светлана Валерьевна', place: 'Председатель Правления'}},
                {organization: 'КПК «Альтернатива»', adress: 'г. Камышин Волгоградская область', contacts: {mail: 'info@altcredit.ru', phone: '8(84457)5-09-17'}, person: {name: 'Алейников Сергей Александрович', place: 'Директор'}},
                {organization: 'КПК «Кредит-Партнер»', adress: 'г. Чита Забайкальский край', contacts: {mail: 'kpk.kredit.partner@ mail.ru', phone: '8(800)222-16-71'}, person: {name: 'Бадураева Эржена Пурбоевна', place: 'Председатель Правления'}},
                {organization: 'КПК «Касса взаимного кредита»', adress: 'г. Санкт-Петербург 2-я линия В.О., д. 25', contacts: {mail: '1kvk@bk.ru', phone: '8(812) 671-01-07'}, person: {name: '', place: ''}},
                {organization: 'СКПК «Мой круг»', adress: 'г. Ростов-на-Дону Ростовская область', contacts: {mail: '', phone: ''}, person: {name: '', place: ''}},
                {organization: 'Ассоциация КПК «Нижегородский кредитный союз»', adress: 'г. Нижний Новгород', contacts: {mail: '', phone: ''}, person: {name: '', place: ''}},
            ],

            group: [
                {person: 'Алейников Сергей Александрович', rights: 'Модератор «ЮРклуба» кредитной кооперации в социальных сетях', place: 'Директор КПК «Альтернатива», г. Камышин, Волгоградская обл Член дисциплинарного комитета СРО «Кооперативные финансы», г. Москва'},
                {person: 'Бадураева Эржена Пурбоевна', rights: 'Член «Клуба директоров» в кредитной кооперации', place: 'Председатель Правления КПК «Кредит-Партнер» г. Чита'},
                {person: 'Баранов Виталий Витальевич', rights: 'Член «Дискуссионного клуба - Д&К» кредитной кооперации Член «Клуба директоров» в кредитной кооперации', place: 'Президент Ассоциации КПК «НКС»,	г. Нижний Новгород'},
                {person: 'Мешков Вадим Васильевич', rights: 'Модератор «Дискуссионного клуба - Д&К» кредитной кооперации', place: 'Исполнительный директор Южнорегиональной ассоциации кредитных союзов (ЮРАКС), г. Ростов-на-Дону Член Наблюдательного совета СКПК «Мой круг», г. Ростов-на-Дону'},
                {person: 'Мокина Светлана Валерьевна', rights: 'Член «Клуба директоров» в кредитной кооперации', place: 'Председатель Правления КПК «Свой Дом», г. Краснодар'},

            ]
        }

        // заполняем участников
        data.members.forEach((item, i) => {
            tableMembers.insertAdjacentHTML('beforeend', `
                <tr class="tabs__data">
                    <td>${i + 1}</td>
                    <td>${item.organization}</td>
                    <td>${item.adress}</td>
                    <td>${item.contacts.mail}<br>${item.contacts.phone}</td>
                    <td>
                        <div>${item.person.place}</div>
                        <div>${item.person.name}</div>
                    </td>
                </tr>
            `)
        })

        // заполняем инициативную группу
        data.group.forEach((item, i) => {
            tableGroup.insertAdjacentHTML('beforeend', `
            <tr class="tabs__data">
                <td>${i + 1}</td>
                <td>${item.person}</td>
                <td>${item.rights}</td>
                <td>${item.place}</td>
            </tr>
            `)
        })



        // ==========================================================конец заполнения таблиц ========================================


        // функция переключения табов с участников на инициативную группу и обратно
        const memberTabs = (target) => {
            membersCaption.forEach((item, i) => {
                item.classList.remove('members__active-title');
                if (item === target){
                    // дробавление активного класса заголову
                    item.classList.add('members__active-title');
                    // добавление активному классу контенту
                    tabsItem.forEach((elem, ind) => {
                        elem.classList.remove('tabs__item--active');
                        if (ind === i){
                            elem.classList.add('tabs__item--active');
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
            if (target.classList.contains('members__caption')){
                memberTabs(target)
            }


        })
    }

    members();

})