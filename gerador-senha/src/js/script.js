// const { clipboard } = require("electron")

let inputPassword = document.querySelector('#inputPassword')
let btnGeneratePassword = document.querySelector('#btnGeneratePassword')
let informNewPassword = document.querySelector('#inform-new-password')
let checkboxMaiuscula = document.querySelector('#letraMaiuscula')
let checkboxCaracteresEspeciais = document.querySelector('#caracteresEspeciais')
let checkboxNumeros = document.querySelector( '#numeros')
let buttonCopy = document.querySelector('#copy-password')
let msgCopiedSuccess = document.querySelector('.password-copied')

btnGeneratePassword.addEventListener('click', () => {
    let password = generatePassword(inputPassword.value)
    informNewPassword.innerHTML = password

    if(password){
        buttonCopy.style.display = 'flex'	
    }
})

buttonCopy.addEventListener('click', () => {

    // Select the text field
    copyToClipboard(informNewPassword.innerHTML)

    msgCopiedSuccess.style.display = 'block'
    setTimeout(() => {
        msgCopiedSuccess.style.display = 'none'
    }, 5000)
})
function generatePassword (length) {

    console.log(`Generating password with ${length} characters`)
    let chars = 'abcdefghijklmnopqrstuvwxyz'+insertMaiuscula()+insertCaracteres()+insertNumeros()
    let password = ''
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
}

function insertMaiuscula() {
    if(checkboxMaiuscula.checked == true){
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    return ''
}

function insertCaracteres(){
    if(checkboxCaracteresEspeciais.checked == true){
        return '!@#$%&*()'
    }
    return ''
}

function insertNumeros(){
    if(checkboxNumeros.checked == true){
        return '0123456789'
    }
    return ''
}


// Copy clipboard
const unsecuredCopyToClipboard = (text) => { 
    const textArea = document.createElement("textarea")
    textArea.value=text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select() 
    try{
        document.execCommand('copy')
    }catch(err){
        console.error('Unable to copy to clipboard',err)
    }
    document.body.removeChild(textArea)
}

const copyToClipboard = (content) => {
    if (window.isSecureContext && navigator.clipboard) {
        navigator.clipboard.writeText(content)
    } else {
        unsecuredCopyToClipboard(content)
    }
}