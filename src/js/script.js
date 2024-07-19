// Стрелка для перемещения
const arrow = document.querySelector('.main-block__arrow')

arrow.addEventListener('click', () => {
    document.querySelector('.services').scrollIntoView({ behavior: 'smooth' });
})


// Модальное окно
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal__close');
const buttons = document.querySelectorAll('[data-call]');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        openModal();
    })
})

modalClose.addEventListener('click', () => {
    closeModal();
})

function closeModal() {
    document.body.style.overflow = 'visible';
    modal.classList.add('hide');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Задержка для завершения анимации
}

function openModal() {
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
        modal.style.display = 'block';
        modal.classList.add('show');
        modal.classList.remove('hide');
    }, 10); // Небольшая задержка для корректного запуска анимации
}

document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
})

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
        closeModal();
    }
})


// Валидация инпутов и работа с сервером
const inputs = document.querySelectorAll('.modal__input');
const btn = document.querySelector('.modal__btn');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        let attribute;

        if (input.hasAttribute('data-name')) {
            attribute = 'name';
        } else if (input.hasAttribute('data-number')) {
            attribute = 'number';
        } else if (input.hasAttribute('data-mail')) {
            attribute = 'mail';
        } else if (input.hasAttribute('data-text')) {
            attribute = 'text';
        }

        switch (attribute) {
            case 'name':
                if (input.value.match(/\d/)) {
                    input.style.border = '1px solid red';
                    input.style.transition = '0.5s';
                } else {
                    input.style.border = '';
                }
                break;
            case 'number':
                if (input.value.match(/[a-zA-Zа-яА-Я]/)) {
                    input.style.border = '1px solid red';
                    input.style.transition = '0.5s';
                } else {
                    input.style.border = '';
                }
                break;
            case 'mail':
                if (!input.value.match(/@/)) {
                    input.style.border = '1px solid red';
                    input.style.transition = '0.5s';
                } else {
                    input.style.border = '';
                }
                break;
            case 'text':
                if (!input.value.match(/^[a-zA-Z0-9]+$/)) {
                    input.style.border = '';
                    input.style.transition = '0.5s';
                }
            default:
                input.style.border = '';
                break;
        }
    });
});


// Отправка данных через fetch
const forms = document.querySelectorAll('form');

const message = {
    loading: 'img/spinner.gif',
    success: 'Заявка успешно отправлена',
    failed: 'Что-то пошло не так'
}

forms.forEach(item => {
    postData(item);
})

function postData (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = 'display: block; margin: 15px auto; width: 7%';
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form)

        const object = {};
        formData.forEach(function(value, key) {
            object[key] = value;
        })
    
    fetch('server.php' , {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(object)
    }).then(data => data.text())
    .then(data => {
        console.log(data);
    }).catch(() => {
        message.failed;
    }).finally(() => {
        setTimeout(() => {
            form.reset();
            statusMessage.remove();
            const newDiv = document.createElement('div');
            newDiv.innerHTML = message.success;
            newDiv.style.cssText = 'font-size: 16px; color: #000; font-family: Nunito Sans; text-transform: uppercase; text-align: center; font-weight: 600; padding-top: 15px';
            form.insertAdjacentElement('afterend', newDiv);
            setTimeout(() => {
                newDiv.remove();
            }, 3000);
        }, 3000); // Задержка в 5000 миллисекунд (5 секунд)   
    })
});
}


// Динамическое добавление елементов на страницу
class MenuCard {
    constructor (src, title, price, ...clases) {
        this.src = src;
        this.title = title;
        this.price = price;
        this.clases = clases;
    }

    render () {
        const blockCard = document.querySelector('.services-block');
        const element = document.createElement('div');
        blockCard.appendChild(element);

        if (this.clases === 0) {
            this.element = 'services-block__card';
            element.classList.add(this.element);
        } else {
            this.clases.forEach(className => element.classList.add(className));
        }

        element.innerHTML = `
                        <img src="${this.src}" class="services-block__img">
                        <h1 class="services-block__title">${this.title}</h1>
                        <div class="services-block__price">Цена: <span>${this.price} грн</span></div>
                        <button data-services class="services-block__btn">Открыть проект</button>
                </div>`;
    }
}

new MenuCard('img/one_floor.jpg', 'Квартира', '1499', 'services-block__card').render();

new MenuCard('img/two_floor.jpg', 'Двухэтажная квартира', '2499', 'services-block__card').render();

new MenuCard('img/bunker.jpg', 'Бомбоубежище', '3499', 'services-block__card').render();


// Табы
const tabs = document.querySelectorAll('.tabs-catalog__li');
const tabsContent = document.querySelectorAll('.tabs-content__item');
const apartments = document.querySelector('[data-apartments]')
const houses = document.querySelector('[data-houses]');
const shelter = document.querySelector('[data-shelter]');
const magazines = document.querySelector('[data-magazines]');

/* tabs[0].addEventListener('click', () => {
    tabsContent.forEach(elem => {
        if (elem === houses) {
            houses.classList.remove('tabs-content__item-active');
            apartments.classList.add('tabs-content__item-active')
        }
    })
})

tabs[1].addEventListener('click', () => {
    tabsContent.forEach(elem => {
        elem.classList.remove('tabs-content__item-active');
        if (elem === houses) {
            houses.classList.add('tabs-content__item-active');
        }
    })
})

tabs[2].addEventListener('click', () => {
    tabsContent.forEach(elem => {
        elem.classList.remove('tabs-content__item-active');
        if (elem === shelter) {
            shelter.classList.add('tabs-content__item-active');
        }
    })
})

tabs[3].addEventListener('click', () => {
    tabsContent.forEach(elem => {
        elem.classList.remove('tabs-content__item-active');
        if (elem === magazines) {
            magazines.classList.add('tabs-content__item-active');
        }
    })
}) */

tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        tabsContent.forEach((content, contentIndex) => {
            if (contentIndex === index) {
                content.classList.add('tabs-content__item-active');
            } else {
                content.classList.remove('tabs-content__item-active');
            }

            tabs.forEach((tab, contentIndex) => {
                if (index === contentIndex) {
                    tab.style.cssText = 'background: rgb(0 134 255);-webkit-transform: scale(1.1);-ms-transform: scale(1.1); transform: scale(1.1);transition: 0.5s all; z-index: 999';
                } else {
                    tab.style.cssText = 'background: #000; transition: 0.5s all'
                }
            })
        });
    });
});

tabs[0].style.cssText = 'background: rgb(0 134 255);-webkit-transform: scale(1.2);-ms-transform: scale(1.1); transform: scale(1.1);transition: 0.5s all; z-index: 999';


// Слайдер
const prev = document.querySelector('.slider-counter__prev')
const next = document.querySelector('.slider-counter__next')
const slides = document.querySelectorAll('.offer-slide')
const current = document.querySelector('#current');
const total = document.querySelector('#total');
const slidesWrapper = document.querySelector('.offer-slider__wrapper');
const slidesField = document.querySelector('.offer-slider__inner');
const width = window.getComputedStyle(slidesWrapper).width;
const slider = document.querySelector('.offer-slider')

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = '0' + slides.length;
    current.textContent = '0' + slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden'; // Скрыть все блоки кроме одного

slides.forEach(slide => {
    slide.style.width = width;
})

slider.style.position = 'relative'; // Добавили стиль для slider обёртки offer__slider
const indicators = document.createElement('ol'); // Создали елемент и поместили его в переменную
const dots = []; // Создали пустой массив для возможности использовать методы массивов
indicators.classList.add('carousel-indicators'); // Добавили класс carousel-indicators(для которого уже были созданы стили в css)
slider.append(indicators); // Поместили слайдер в новосозданный елемент indicators


// Функции для многоразового использования
function slidesInner () {
    slidesField.style.transform = `translateX(-${offset}px)`;
}

function counterCurrent () {
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = '0' + slideIndex;
    }
}

function deleteStr (str) {
    return +str.replace(/\D/g, '');
}

function dotsNavigation () {
    dots.forEach(dot => dot.style.opacity = 0.5); // Используем forEach для массива dots, и добавляем ко всем точкам навигации прозрачность
    dots[slideIndex - 1].style.opacity = 1; // Для нашего массива отнимаем -1 слайд и убираем у него прозрачность
}

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);

    dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: 0.5;
    transition: opacity 0.5s ease;` // Добавили стили для наших кнопок навигации`

    if (i == 0) { // Если i будет равен 0, то уберем прозрачность с dot
        dot.style.opacity = 1; // Добавили начальное свечение кнопки, без этой проверки оно бы не светилось изначально
    }

    indicators.append(dot); // Поместили dot в indicator
    dots.push(dot); // Запушили наш dot в dots массив, это нужно для использования в обработчике события
}

next.addEventListener('click', () => {
    if (offset == deleteStr(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += deleteStr(width);
    }

    slidesInner();

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    // Устанавливаем счётчик
    counterCurrent();

    // Функция которая работает с панелью навигации слайдера
    dotsNavigation();
})

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = deleteStr(width) * (slides.length - 1);
    } else {
        offset -= deleteStr(width);
    }

    // Перемещаем slidesField влево с анимацией на значение offset пикселей
    slidesInner();

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    // Устанавливаем счётчик
    counterCurrent();

    // Функция которая работает с панелью навигации слайдера
    dotsNavigation();
})

// Событие при клики на точки навигации
dots.forEach(dot => { // Применяем изменения ко всем точкам через forEach
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to'); // Добавили атрибут к нашей точке с помощью e.target

        slideIndex = slideTo; // Присваиваем индекс слайда к индексу точки навигации
        offset = deleteStr(width) * (slideTo - 1); // Получаем в offset 650 * 3 = 1950

        // Перемещаем slidesField с анимацией на значение offset пикселей
        slidesInner();

        // Устанавливаем счётчик
        counterCurrent();

        // Функция которая работает с панелью навигации слайдера
        dotsNavigation();
    })
})
