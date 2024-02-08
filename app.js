const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const copiar = document.getElementById('copiar');

function quitarContenedorEspera() {
    const contenedorEspera = document.getElementById('contenedor-espera');
    if (contenedorEspera !== null) {
        contenedorEspera.parentNode.removeChild(contenedorEspera);
    }
    return;
}

function condiciones(cadenaTexto) {
    var permitir = /^[a-z ]+$/;
    var noPermitir = /[^ ]+$/;
    if(permitir.test(cadenaTexto) && noPermitir.test(cadenaTexto)){
        return true;
    }
    else {
        document.getElementById('contenedor-pcondicion').style.display = 'inline-block';

        var numero = /^[a-z0-9 ]+$/;
        var acento = /^[a-zà-ÿÀ-ÿ ]+$/;
        var mayuscula = /^[a-zA-Z ]+$/;

        if (numero.test(cadenaTexto))
            textoCondicion = 'números';
        else if (acento.test(cadenaTexto))
            textoCondicion = 'acentos';
        else if (mayuscula.test(cadenaTexto))
            textoCondicion = 'mayúsculas'
        else 
            textoCondicion = 'caracteres especiales'
        document.getElementById('texto-condicion').textContent = `No se permite ${textoCondicion}`;

        const cerrar = document.getElementById('cerrar');
        cerrar.addEventListener('click', () => {
            document.getElementById('contenedor-pcondicion').style.display = 'none';
        })
        
        return false;
    }
} 

function desencriptadorEncriptador(accion) {
    var textoIngresado = document.getElementById('texto-ingresado').value;
    var textoGenerado = document.getElementById('texto-generado');

    if (textoIngresado.length > 0) {
        if (condiciones(textoIngresado)) {
            if (accion === 'cifrado') {
                var textoGenerado = textoIngresado.replace(/e/g, 'enter').replace(/i/g, 'imes').replace(/a/g, 'ai').replace(/o/g, 'ober').replace(/u/g, 'ufat');
            }
            else {
                var textoGenerado = textoIngresado.replace(/enter/g, 'e').replace(/imes/g, 'i').replace(/ai/g, 'a').replace(/ober/g, 'o').replace(/ufat/g, 'u');
            }
            document.getElementById('texto-generado').textContent = textoGenerado;
            if (textoGenerado.length > 0) {
                quitarContenedorEspera();
            }
        }
    }
    return;
}

encriptar.addEventListener('click', ()=> desencriptadorEncriptador('cifrado'));
desencriptar.addEventListener('click', () => desencriptadorEncriptador('descifrado'));
copiar.addEventListener('click', () => {
    var sustituto = document.createElement("input");
    sustituto.setAttribute('value', document.getElementById('texto-generado').textContent);
    document.body.appendChild(sustituto);
    sustituto.select();
    document.execCommand('copy');
    document.body.removeChild(sustituto);
    console.log(document.getElementById('texto-generado').textContent);
    document.getElementById('texto-generado').textContent = '';
    document.getElementById('texto-ingresado').value='';
})

