//variables
let ramoSeleccion = null
let cantidadRamos = null
let total = null

const price=2600
const categories = {
    a:{percent: 15, value: '0'},
    b:{percent: 20, value: '1'},
    c:{percent: 25, value: '2'}
}

const totalText = 'Total a pagar:$ '

//dom
const form = document.forms.formulario
const inputs = form.getElementsByTagName('input')
const select = form.getElementsByTagName('select')[0]

const totalTag = document.getElementById('total')

const resetBtn = document.getElementById('reset')
const submitBtn = document.getElementById('submit')

//config

totalTag.innerText = totalText


//utils

const totalPrice = () => {

    if (!ramoSeleccion || !cantidadRamos) return;

    const totalValue = price * cantidadRamos
    const discount = (totalValue/100) * categories[ramoSeleccion].percent

    total=totalValue - discount

    totalTag.innerText = totalText + total

}
totalPrice()

//Events
const resetCategories = ()=>{
    total = null
    selected = null
    totalTag.innerText=totalText
    eventAssignmentAll()
}

const setRamoSeleccion = (e)=> {
    const option = e.target.value

    if(option ==='none'){
        resetCategories()
        return
    }

    ramoSeleccion = option
   
    totalPrice()


}
const setCantidadRamos = (e)=> {
    const {value} = e.target

    if(value < 0 || isNaN(value)){
        e.target.value = 0
        total = null
        return
    }

    cantidadRamos = value
    totalPrice()

}

//Events: Buttons

const reset = (e) => {
    e.preventDefault()

    for(let input of inputs)
        input.value= ''
    select.value ='none'

    resetCategories()
}

const submit = (e) => {
    e.preventDefault()

    const {firstname,lastname,address,email,cantidadRamos,ramoSeleccion} = form

    const verified = {
        firstname:firstname.value !== '',
        lastname:lastname.value !== '' ,
        address:address.value !== '',
        email:email.value.includes('@'),
        cantidadRamos:cantidadRamos.value > 0,
        ramoSeleccion: ramoSeleccion.value !== 'none',

    }

    const values = Object.values(verified)
    const submitAccepted = values.every(value => value)

    submitAccepted 
    ? location.href = 'compraExitosa.html'
    : alert('Debes completar todos los campos correctamente')
}
form.addEventListener('submit', submit)
form.ramoSeleccion.addEventListener('change', setRamoSeleccion)
form.cantidadRamos.addEventListener('change', setCantidadRamos)
resetBtn.addEventListener('click', reset)