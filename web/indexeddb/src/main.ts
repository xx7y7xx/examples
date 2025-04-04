import main from './app1';
import clearStore from './clearStore';

// get from query string
const urlParams = new URLSearchParams(window.location.search);
const page = urlParams.get('page');

switch (page) {
  case 'app1':
    main();
    break;
  case 'clearStore':
    clearStore();
    break;
  default:
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <div>
        <h1>Page Not Found</h1>
        <p>The requested page does not exist. e.g. ?page=app1</p>
      </div>
    `;
}
