import './style.css';
import imgUrl from './public/assets/rainy-bg.jpg';
import summerUrl from './public/assets/summer-bg.jpg';

// document.body.style.backgroundImage = `url(${imgUrl})`;
function Background(url) {
    const item =  document.createElement('img');
    item.src = url;
    item.style.height = "100vh";
    item.style.width = "100vw";
    item.style.objectFit = 'cover';
    item.style.position = 'absolute';
    item.style.zIndex = 0;
    item.style.pointerEvents = 'none';

    return {
        element: item,
        setImage: (url) => {
            item.src = url;
        }
    }
}

const bg = new Background(imgUrl);
document.body.appendChild(bg.element);

// function Player(bg) {
//     return {
//         select()
//     }
// }
//   - selectMood(type)
//     -play(type)
//             - change bg
//             - play Audio
//             - set active type
//     - pause() 
//             - pause audio

function buttonsGroup() {
    const buttonsGroup = document.createElement('div');
    buttonsGroup.classList.add('buttonsGroup');
    const button1 = document.createElement('button');
    const button2 = document.createElement('button');
    const button3 = document.createElement('button');

    button1.innerHTML = `<img src='./assets/icons/cloud-rain.svg' width="70" height="70" alt="" >`;
    button2.innerHTML = `<img src='./assets/icons/cloud-snow.svg' width="70" height="70" alt="" >`;
    button3.innerHTML = `<img src='./assets/icons/sun.svg' width="70" height="70" alt="" >`;

    buttonsGroup.appendChild(button1);
    buttonsGroup.appendChild(button2);
    buttonsGroup.appendChild(button3);

    button1.onclick = function() {
        bg.setImage(summerUrl);
        alert('Please select')
    }

    return buttonsGroup;
}

document.body.appendChild(buttonsGroup());
