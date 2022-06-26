
// function component() {
//     const element = document.createElement('div');
//     const btn = document.createElement('button');
//     // Lodash, now imported by this script
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     btn.innerHTML = 'click me!';
//     btn.onclick = printMe;
//     element.appendChild(btn);
//     return element;
// }

function getComponent() {
  
    return import(/* webpackPreload: true */ 'lodash').then(({ default: _ }) => {
        const element = document.createElement('div');
        //const btn = document.createElement('button');
        // Lodash, now imported by this script
        element.innerHTML = _.join(['Hello', 'webpack'], ' ');
        // btn.innerHTML = 'click me!';
        // btn.onclick = printMe;
        // element.appendChild(btn);
        return element;
    }).catch((error) => 'An error occurred!');
}

//document.body.appendChild(component());
getComponent().then((component) => {
    document.body.appendChild(component);
})

//https://github.com/jantimon/html-webpack-plugin/issues/1317
document.addEventListener('DOMContentLoaded',()=>{
  import(/* webpackPrefetch: true */'./prefetch.js').then((res) => { alert(res) }); 
})