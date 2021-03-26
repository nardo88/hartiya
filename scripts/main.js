document.addEventListener('DOMContentLoaded', () => {

    // плавный скролл при нажатии на элемент меню 
    const menu = (e) => {
        const navLink = document.querySelectorAll('.nav__link--scroll');

        navLink.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const data = item.dataset.scroll;
                const scrollHigth = document.querySelector(data).offsetTop;
                window.scrollTo({
                    top: scrollHigth,
                    behavior: 'smooth'
                });
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
        // const tableMembers = document.querySelector('.table-members').children[0];
        // const tableGroup = document.querySelector('.table-group').children[0];


        // получаем обертку для members
        const memberWrapper = document.getElementById('member_wrapper');
        const groupWrapper = document.getElementById('group_wrapper');

        // пагинация 
        const paginationVlues = document.getElementById('members_pagination');
        const paginationGroupValues = document.getElementById('group_pagination')



        // ==========================================================заполнение таблиц ================================================

        // база

        const data = {
            members: [{
                    organization: 'КПК «Свой Дом»',
                    adress: 'г. Курганинск Краснодарский край',
                    contacts: {
                        mail: 'Info@kpksvoydom.ru',
                        phone: '8(918)439-01-61'
                    },
                    person: {
                        name: 'Мокина Светлана Валерьевна',
                        place: 'Председатель Правления'
                    }
                },
                {
                    organization: 'КПК «Альтернатива»',
                    adress: 'г. Камышин Волгоградская область',
                    contacts: {
                        mail: 'info@altcredit.ru',
                        phone: '8(84457)5-09-17'
                    },
                    person: {
                        name: 'Алейников Сергей Александрович',
                        place: 'Директор'
                    }
                },
                {
                    organization: 'КПК «Кредит-Партнер»',
                    adress: 'г. Чита Забайкальский край',
                    contacts: {
                        mail: 'kpk.kredit.partner@ mail.ru',
                        phone: '8(800)222-16-71'
                    },
                    person: {
                        name: 'Бадураева Эржена Пурбоевна',
                        place: 'Председатель Правления'
                    }
                },
                {
                    organization: 'КПК «Касса взаимного кредита»',
                    adress: 'г. Санкт-Петербург 2-я линия В.О., д. 25',
                    contacts: {
                        mail: '1kvk@bk.ru',
                        phone: '8(812) 671-01-07'
                    },
                    person: {
                        name: '',
                        place: ''
                    }
                },
                {
                    organization: 'СКПК «Мой круг»',
                    adress: 'г. Ростов-на-Дону Ростовская область',
                    contacts: {
                        mail: '',
                        phone: ''
                    },
                    person: {
                        name: '',
                        place: ''
                    }
                },
                {
                    organization: 'Ассоциация КПК «Нижегородский кредитный союз»',
                    adress: 'г. Нижний Новгород',
                    contacts: {
                        mail: '',
                        phone: ''
                    },
                    person: {
                        name: '',
                        place: ''
                    }
                },
                // дополнительные пользователи для проверки пагинации
                {
                    organization: 'Ассоциация КПК «Нижегородский кредитный союз»',
                    adress: 'г. Нижний Новгород',
                    contacts: {
                        mail: '',
                        phone: ''
                    },
                    person: {
                        name: '',
                        place: ''
                    }
                },
                {
                    organization: 'Ассоциация КПК «Нижегородский кредитный союз»',
                    adress: 'г. Нижний Новгород',
                    contacts: {
                        mail: '',
                        phone: ''
                    },
                    person: {
                        name: '',
                        place: ''
                    }
                },
                {
                    organization: 'Ассоциация КПК «Нижегородский кредитный союз»',
                    adress: 'г. Нижний Новгород',
                    contacts: {
                        mail: '',
                        phone: ''
                    },
                    person: {
                        name: '',
                        place: ''
                    }
                },

            ],

            group: [{
                    person: 'Алейников Сергей Александрович',
                    rights: 'Модератор «ЮРклуба» кредитной кооперации в социальных сетях',
                    place: 'Директор КПК «Альтернатива», г. Камышин, Волгоградская обл Член дисциплинарного комитета СРО «Кооперативные финансы», г. Москва'
                },
                {
                    person: 'Бадураева Эржена Пурбоевна',
                    rights: 'Член «Клуба директоров» в кредитной кооперации',
                    place: 'Председатель Правления КПК «Кредит-Партнер» г. Чита'
                },
                {
                    person: 'Баранов Виталий Витальевич',
                    rights: 'Член «Дискуссионного клуба - Д&К» кредитной кооперации Член «Клуба директоров» в кредитной кооперации',
                    place: 'Президент Ассоциации КПК «НКС»,	г. Нижний Новгород'
                },
                {
                    person: 'Мешков Вадим Васильевич',
                    rights: 'Модератор «Дискуссионного клуба - Д&К» кредитной кооперации',
                    place: 'Исполнительный директор Южнорегиональной ассоциации кредитных союзов (ЮРАКС), г. Ростов-на-Дону Член Наблюдательного совета СКПК «Мой круг», г. Ростов-на-Дону'
                },
                {
                    person: 'Мокина Светлана Валерьевна',
                    rights: 'Член «Клуба директоров» в кредитной кооперации',
                    place: 'Председатель Правления КПК «Свой Дом», г. Краснодар'
                },




                // дополнительные пользователи для проверки пагинации
                {
                    person: 'Бадураева Эржена Пурбоевна',
                    rights: 'Член «Клуба директоров» в кредитной кооперации',
                    place: 'Председатель Правления КПК «Кредит-Партнер» г. Чита'
                },
                {
                    person: 'Баранов Виталий Витальевич',
                    rights: 'Член «Дискуссионного клуба - Д&К» кредитной кооперации Член «Клуба директоров» в кредитной кооперации',
                    place: 'Президент Ассоциации КПК «НКС»,	г. Нижний Новгород'
                },
                {
                    person: 'Мешков Вадим Васильевич',
                    rights: 'Модератор «Дискуссионного клуба - Д&К» кредитной кооперации',
                    place: 'Исполнительный директор Южнорегиональной ассоциации кредитных союзов (ЮРАКС), г. Ростов-на-Дону Член Наблюдательного совета СКПК «Мой круг», г. Ростов-на-Дону'
                },
                {
                    person: 'Мокина Светлана Валерьевна',
                    rights: 'Член «Клуба директоров» в кредитной кооперации',
                    place: 'Председатель Правления КПК «Свой Дом», г. Краснодар'
                },

            ]
        }


        // заполняем инициативную группу
        // data.group.forEach((item, i) => {
        //     tableGroup.insertAdjacentHTML('beforeend', `
        //     <tr class="tabs__data">
        //         <td>${i + 1}</td>
        //         <td>${item.person}</td>
        //         <td>${item.rights}</td>
        //         <td>${item.place}</td>
        //     </tr>
        //     `)
        // })

        // =======================================================================MEMBERS НАЧАЛО========================================================//

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
                if (item === target) {
                    tableMembers.forEach((elem, ind) => {
                        elem.classList.remove('table-members--active');
                        if (ind === i) {
                            elem.classList.add('table-members--active');
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


        })
    }

    members();

})