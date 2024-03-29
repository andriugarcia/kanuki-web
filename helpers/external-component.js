export default async function externalComponent(type) {
    const url = `http://localhost:8200/kanuki-${type}/kanuki-${type}.umd.min.js`
    const name = url.split('/').reverse()[0].match(/^(.*?)\.umd/)[1];

    if (window[name]) return window[name];
  
    window[name] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.addEventListener('load', () => {
        resolve(window[name]);
      });
      script.addEventListener('error', () => {
        reject(new Error(`Error loading ${url}`));
      });
      script.src = url;
      document.head.appendChild(script);
    });
  
    return window[name];
  }