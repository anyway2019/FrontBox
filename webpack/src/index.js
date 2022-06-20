import _ from 'lodash'
import './style.css'
import icon from './css_sprites.png'

function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    const image = new Image();
    image.src = icon;
    element.appendChild(image);
    return element;
}

document.body.appendChild(component());