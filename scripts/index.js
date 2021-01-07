// ----------------------------------Material--------------------------------------
const select = document.querySelector('select')
const material = new Choices(select, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
})

// ----------------------------------Map--------------------------------------
ymaps.ready(init);
function init(){
    let myMap = new ymaps.Map("map-1", {
        center: [48.872197, 2.354224],
        zoom: 15,
        type: 'yandex#map',
        controls: [],
    });
    let myGeoObject = new ymaps.Placemark([48.872197, 2.354224], {}, {
      // preset: 'islands#greenIcon',
      iconLayout: 'default#image',
      iconImageHref: 'img/marker.svg',
      iconImageSize: [28, 40],
      iconImageOffset: [-14, -40]
    }, {
    });
    myMap.geoObjects.add(myGeoObject);
}

// ----------------------------------ScrollBar--------------------------------------
new SimpleBar(document.querySelector('.text-box'), {
  autoHide: false,
  scrollbarMaxSize: 70,
})

// --------------------------------------Form----------------------------------------
const form = document.querySelector('.order__form')
const submitBtn = document.querySelector('.order__submit')

const phone = document.querySelectorAll('input[type="tel"]')
const imPhone = new Inputmask("+375 (99) 999-99-99")

imPhone.mask(phone)

const validate = new window.JustValidate('.order__form', {

  rules: {
    order__input_name: {
      required: true,
      minLength: 3,
      function: () => {
        const name = document.querySelector('.order__input_name').value
        let letters = /^[a-z, а-я, " "]+$/
        return name.match(letters)
      },
    },
    order__input_phone: {
      required: true,
      function: () => {
        const phone = document.querySelector('.order__input_phone').inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 9
      },
    },
    order__input_email: {
      required: true,
      email: true
    }
  },
  messages: {
    order__input_name: {
      required: 'Поле обязательно для заполнения',
      minLength: 'Минимальная длина имени: 3 символа',
      function: 'Имя может содержать только буквы'
    },
    order__input_phone: {
      required: 'Поле обязательно для заполнения',
      function: 'Заполните поле'
    },
    order__input_email: {
      required: 'Поле обязательно для заполнения',
      email: 'Пожалуйста, введите правильный e-mail'
    },
  },
  colorWrong: '#ff5c00',
  tooltip: {
    fadeOutTime: 6000
  },
  submitHandler: () => handleSubmit(form, submitBtn)
})

function handleSubmit(form, submitBtn) {

  // form.reset()
  submitBtn.classList.add(`submitted`)

  const formData = new FormData(form)

  if (form.action.slice(-3) === `...`) {
    console.log(`Enter Formspree endpoint in the form`)
    return
  }

  fetch(form.action, {

    method: form.method,

    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(Object.fromEntries(formData))

  }).then(response => console.log(response))
}

document.addEventListener(`input`, function(e) {

  if (!e.target.classList.contains(`order__input`)) return

  submitBtn.classList.remove(`submitted`)
})


