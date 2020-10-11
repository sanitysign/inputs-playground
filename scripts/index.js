// ----------------------------------Material--------------------------------------
const select = document.querySelector('select')
const material = new Choices(select, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
})
// .showDropdown()

// ----------------------------------Map--------------------------------------
ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map-1", {
        center: [48.872197, 2.354224],
        zoom: 15,
        type: 'yandex#map',
        controls: [],
    });
    var myGeoObject = new ymaps.Placemark([48.872197, 2.354224], {}, {
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
var phone = document.querySelectorAll('input[type="tel"]')
var imPhone = new Inputmask("+375 (99) 999-99-99")
imPhone.mask(phone)

var val = new window.JustValidate('.order__form', {
  rules: {
    order__input_name: {
      required: true,
      minLength: 3,
      function: () => {
        const name = document.querySelector('.order__input_name').value
        console.log(name)
        var letters = /^[a-z, а-я, " "]+$/
        return name.match(letters)
      },
    },
    order__input_phone: {
      required: true,
      function: () => {
        const phone = document.querySelector('.order__input_phone').inputmask.unmaskedvalue()
        console.log(phone)
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
})





