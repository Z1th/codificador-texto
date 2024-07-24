function rellenarTexto() {
  var textoIngresado = document.getElementById("entradaTextArea").value;

  if (textoIngresado != "") {
    reemplazarTexto(textoIngresado);
  } else {
    condicionInicial();
  }
}

function condicionInicial() {
  let contenidoTexto =
    '<img src="/img/muñeco-right.webp" alt="Muñeco animado sosteniendo una lupa"></img>';
  contenidoTexto +=
    '<p class="titulo-inicial"> Ningún mensaje fue encontrado </p>';
  contenidoTexto +=
    '<p class="descripcion">Ingresa el texto que desees encriptar o desencriptar.</p>';
  document.getElementById("salidaTextArea").innerHTML = contenidoTexto;
  document.getElementsByClassName(
    "contenedor-resultado"
  )[0].style.justifyContent = "center";

  habilitarDeshabilitar(1);
}

//Se debe modular más esta funcion
function reemplazarTexto(reemplazo) {
  // Crear el párrafo y añadir el texto de reemplazo
  const paragraph = document.createElement("p");
  const node = document.createTextNode(reemplazo);
  paragraph.appendChild(node);

  // Crear el botón y añadir el texto "Copiar"
  const btnCopiar = document.createElement("button");
  btnCopiar.setAttribute('id','copiar');
  btnCopiar.addEventListener('click', () => copiarTexto(reemplazo));
  const nodeBtn = document.createTextNode("Copiar");
  btnCopiar.appendChild(nodeBtn);

  // Obtener el elemento con el ID "salidaTextArea"
  const salidaTextArea = document.getElementById("salidaTextArea");
  salidaTextArea.innerHTML = '';

  // Añadir el párrafo y el botón al elemento
  salidaTextArea.appendChild(paragraph);
  salidaTextArea.appendChild(btnCopiar);

  document.getElementsByClassName("contenedor-resultado")[0].style.justifyContent = "space-between";
  habilitarDeshabilitar(0);
}

function encriptarTexto() {
  var textoIngresado = document.getElementById("entradaTextArea").value;

  //Si no hay caracteres especiales en nuestra cadena de texto

  if (
    verificarCaracteresEspeciales(textoIngresado) == false &&
    verificarCaracteresMayusculas(textoIngresado) == false
  ) {
    //Objeto que va almacenar nuestros valores de reemplazo
    const reemplazos = {
      a: "ai",
      e: "enter",
      i: "imes",
      o: "ober",
      u: "ufat",
    };

    // Split divide la cadena en un array de caracterest individuales
    // Map crea un nuevo array y recorre cada elemento del array que devuelve nuestro split, compara el caracter con nuestro objeto y si existe un reemplazo lo sustituye, de lo contrario, mantiene el caracter original
    // Join vuelve a juntar nuestra cadena con el mismo parametro que usamos para separarlo en split
    let textoEncriptado = textoIngresado
      .split("")
      .map((char) => reemplazos[char] || char)
      .join("");
    reemplazarTexto(textoEncriptado);
  } else {
    //Hay caracteres especiales o mayusculas y hay que mandar una alerta
    alert("Elimina los caracteres especiales de tu cadena");
  }
}

function desencriptarTexto() {
  var textoIngresado = document.getElementById("entradaTextArea").value;
  if (
    verificarCaracteresEspeciales(textoIngresado) == false &&
    verificarCaracteresMayusculas(textoIngresado) == false
  ) {
    //El objetivo es reemplazar subcadenas en un texto según las reglas definidas en el objeto
    //Ahora debemos sustituir subcadenas, así que usar map ya no nos funcionará pero podremos mantener una estructura de objeto similar
    const reemplazosInvertidos = {
      ai: "a",
      enter: "e",
      imes: "i",
      ober: "o",
      ufat: "u",
    };

    var textoIngresado = document.getElementById("entradaTextArea").value;

    // Reemplazar cada subcadena en el texto ingresado
    let textoDesencriptado = textoIngresado;

    //Definimos un bucle que recorrerá nuestro objeto reemplazosInvertidos donde tomará mi matriz los valores de Key y Value, le especificamos que tomará nuestro objeto reemplazosInvertidos
    //Ahora debemos separar nuestra cadena en subcadenas pasandole nuestros keys como parametros y uniendolos de nuevo por nuestro value
    for (const [key, value] of Object.entries(reemplazosInvertidos)) {
      textoDesencriptado = textoDesencriptado.split(key).join(value);
    }

    reemplazarTexto(textoDesencriptado);
  } else {
    alert("Elimina los caracteres especiales de tu cadena");
  }
}

function verificarCaracteresEspeciales(cadenaTexto) {
  let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~áéíóúüñÁÉÍÓÚÜÑ]/;

  if (specialChars.test(cadenaTexto) == true) {
    return true;
  } else {
    return false;
  }
}

function verificarCaracteresMayusculas(cadenaTexto) {
  //1 Verificar si la cadena tiene mayuscula
  if (/[A-Z]/.test(cadenaTexto) == true) {
    return true;
  } else {
    return false;
  }
}

function habilitarDeshabilitar(status) {
  let encriptarBtn = document.getElementById("encriptar");
  let desencriptarBtn = document.getElementById("desencriptar");

  if (status === 0) {
    // Habilitar
    encriptarBtn.removeAttribute("disabled");
    desencriptarBtn.removeAttribute("disabled");
  } else if (status === 1) {
    // Deshabilitar
    encriptarBtn.setAttribute("disabled", "true");
    desencriptarBtn.setAttribute("disabled", "true");
  }
}

function copiarTexto(texto){
    navigator.clipboard.writeText(texto);
    alert('Texto copiado en la papelera!');
}

function saludarConsola() {
  let saludoInicial =
    "¡Bienvenido Developer, no olvides visitar el readme.md del proyecto!";
  console.log(saludoInicial);
}

window.addEventListener("load", function (event) {
  console.log("'Todos los recursos terminaron de cargar!");
  saludarConsola();
});
