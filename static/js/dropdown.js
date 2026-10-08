
import { cambiarGrafico } from "./funciones.js";

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    // Obtener elementos dentro del Dropdown
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');

    // Abrir el menu y cambiar los estilos al hacer click
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    });

    // Luego cambiar el nombre del contenedor y quitar clases para cerrar el menu 
    // al hacer click en cualquier item
    options.forEach(option => {
      option.addEventListener('click', () => {
        selected.innerText = option.innerText;
        select.classList.remove('select-clicked');
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open'); 
		
        // Quita la clase a ambos elementos 
        options.forEach(option => {
            option.classList.remove('active_2');
        });

        // Para que le quede solo al elemento activo
        option.classList.add('active_2');

        // Aquí va la acción con los gráficos 
        cambiarGrafico(option.innerText);
      });
    });

})