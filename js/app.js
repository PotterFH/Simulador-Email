//Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListeners();
function eventListeners(){
    document.querySelector('DOMContentLoaded', iniciarApp);
    //Campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Enviar email
    formulario.addEventListener('submit', enviarEmail);

    //reinicia form
    btnReset.addEventListener('click', resetearForm);
}


//Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//Validar el formulario
function validarFormulario(e){
    if(e.target.value.length > 0){
        //Elimina los errores
        const error = document.querySelector('p.error');

        if( error){
            error.remove();

        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    }else{
        //console.log('No hay nada');

        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        
        mostrarError('Todos los campos son obligatorios');
    }
    
    if(e.target.type === 'email'){
        //console.log('Es email hay que validar');
        //const resultado = e.target.value.indexOf('@');
        //console.log(resultado);
        if(er.test( e.target.value )){
            const error = document.querySelector('p.error');
            if( error){
                error.remove();
    
            }    
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            mostrarError('Email no valido')
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
        }
    }
    if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== '' ){
        //console.log('Pasaste la validacion')
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }else{
        console.log('Aun hay campos por validar')
        
        btnEnviar.disabled = true;
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
    }
}

function mostrarError(mensaje){
    const msjError = document.createElement('p');
    msjError.textContent = mensaje;
    msjError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'mb-5','text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if( errores.length === 0){
        formulario.insertBefore(msjError, document.querySelector('.flex'));
    }
    
}

//Enviar el email
function enviarEmail(e){
    e.preventDefault();

     //console.log('enviando');
     //MOstrar el spinner
     const spinner = document.querySelector('#spinner');
     spinner.style.display = 'flex';

     //Despues de 3 segundos mostrar el spinner y mostrar mensaje
     setTimeout(() => {
        //console.log('Despues de 3 segundos')
        spinner.style.display = 'none';

        //Mensaje que se envio correctamente

        const parrafo = document.createElement('p');
        parrafo.textContent = 'Email enviado correctamente';
        parrafo.classList.add('border', 'border-green-500', 'background-green-100', 'text-green-500', 'p-3', 'mt-5', 'mb-5','text-center');
        //insertar antes del spinner
        formulario.insertBefore(parrafo, spinner);

        //Eliminar y formatear el form
        setTimeout(() => {
            parrafo.remove();
            resetearForm();
        }, 3000);
     }, 3000);
}

//Function que resetea e l form
function resetearForm(){
    formulario.reset();
    iniciarApp();
}