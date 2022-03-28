function createNavItem({ html, url }) {
  const a = document.createElement('a');
  const li = document.createElement('li');

  a.href = url;
  a.innerHTML = html;

  li.appendChild(a);
  return li;
}

function createHamburgerMenu(navBarElem) {
  const div = document.createElement('div');
  const bar_1 = document.createElement('div');
  const bar_2 = document.createElement('div');
  const bar_3 = document.createElement('div');

  bar_1.classList.add('bar-1');
  bar_2.classList.add('bar-2');
  bar_3.classList.add('bar-3');
  div.classList.add('handler_mobile-only');

  div.appendChild(bar_1);
  div.appendChild(bar_2);
  div.appendChild(bar_3);

  div.addEventListener('click', () => {
    if (navBarElem.classList.contains('open')) {
      navBarElem.classList.remove('open');
    } else {
      navBarElem.classList.add('open');
    }
  });

  return div;
}

function createLogo() {
  const a = document.createElement('a');
  const img_1 = document.createElement('img');

  img_1.src = `https://www.level.game/logo.png`;

  a.appendChild(img_1);
  a.href = 'https://level.game';
  a.classList.add('brand');

  return a;
}

function createTemplate() {
  const div = document.createElement('div');
  const style = document.createElement('style');
  const template = document.createElement('template');

  style.textContent = `body { background-color: 'red' }`;
  div.classList.add('content');
  template.appendChild(style);
  template.appendChild(div);

  return template;
}

function getIconLinkedIn() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="#333"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>`;
}

function getIconInstagram() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
}

class LevelNav extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' }).appendChild(
      createTemplate().content.cloneNode(true)
    );

    const style = document.createElement('style');
    style.textContent = getCSS();

    this.shadowRoot.appendChild(style);

    const ul = document.createElement('ul');
    const navBar = document.createElement('nav');

    const navItems = [
      {
        url: 'https://level.game',
        html: 'Home',
      },
      //{
      //url: 'https://feel.level.game',
      //html: 'Feel',
      //},
      //{
      //url: 'https://careers.level.game',
      //html: 'Jobs',
      //},
      {
        url: 'https://about.level.game',
        html: 'About Us',
      },
      {
        url: 'https://bootcamp.level.game',
        html: 'Bootcamp',
      },
      { url: 'mailto:social@level.game', html: 'Contact', target: '_blank' },
      //{ url: 'https://level.game/terms-and-conditions.html', html: 'T&C', target: '_blank' },
      {
        url: 'https://www.instagram.com/leveldotgame/',
        html: getIconInstagram(),
        target: '_blank',
      },
      {
        url: 'https://www.linkedin.com/company/raiseyourlevel',
        html: getIconLinkedIn(),
        target: '_blank',
      },
    ];

    for (let navItem of navItems) {
      ul.appendChild(createNavItem(navItem));
    }

    navBar.id = 'top-nav';
    navBar.appendChild(createLogo());
    navBar.appendChild(createHamburgerMenu(navBar));
    navBar.appendChild(ul);

    this.shadowRoot.appendChild(navBar);
  }

  connectedCallback() {
    const hlNavItem = this.getAttribute('highlight-nav-item') || '';
    const navItems = this.shadowRoot.querySelectorAll('ul > li');

    navItems.forEach((nav) => {
      if (
        nav.textContent.toLowerCase().trim() === hlNavItem.toLowerCase().trim()
      ) {
        nav.classList.add('selected');
      }
    });
  }
}

customElements.define('level-nav', LevelNav);

function getCSS() {
  return `
      nav {
        color: #1a1a1a;
        --color-primary: #7356e8;
        --color-text: #343232;
        --max-width: 45rem;
        font-family: "Open Sans", "Lato", "IBM Plex Sans", Helvetica, Arial, sans-serif;
      }

      nav#top-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: calc(var(--max-width) + 30rem);
        margin: auto;
        padding: 2rem 1rem;
        padding-bottom: 0;
      }

      #top-nav .brand {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #top-nav .brand img {
        width: auto;
        margin: 0.15rem;
        max-width: 10rem;
      }

      #top-nav ul {
        display: flex;
        margin: 0;
        text-transform: uppercase;
        list-style-type: none;
      }

      #top-nav li {
        padding: 0 2rem;
        color: #1a1a1a;
        transition: 0.3s ease color;
      }

      #top-nav a {
        color: inherit;
        text-decoration: none;
      }

      #top-nav li {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #top-nav li .fab {
        padding-top: 0.2rem;
      }

      #top-nav .selected {
        color: var(--color-primary);
        font-weight: bold;
      }

      #top-nav li:not(.selected):hover {
        color: #000;
      }

      #top-nav .handler_mobile-only {
        display: none;
        cursor: pointer;
      }

      @media screen and (max-width: 60rem) {
        #levelV {
          width: auto !important;
          height: 3.5rem !important;
          margin-right: 0 !important;
          margin-left: 0 !important;
        }
        nav#top-nav {
          flex-wrap: wrap;
          padding: 2rem 1.5rem;
        }

        #top-nav .brand img {
          max-width: 9rem;
        }

        #top-nav .handler_mobile-only {
          display: block;
        }

        .bar-1,
        .bar-2,
        .bar-3 {
          display: block;
          width: 25px;
          height: 3px;
          margin: 0.3rem 0;
          background-color: var(--color-primary);
        }

        /*.open .bar-1 {*/
        /*transform: rotate(-45deg) translate(-9px, 6px);*/
        /*}*/

        /*.open .bar-2 {*/
        /*opacity: 0;*/
        /*}*/

        /*.open .bar-3 {*/
        /*transform: rotate(45deg) translate(-8px, -8px);*/
        /*}*/

        #top-nav ul {
          flex-direction: column;
          min-width: 100%; /* push it down */
          max-height: 0;
          overflow: hidden;
          transition: 0.4s linear max-height;
          padding: 0;
        }

        #top-nav li {
          padding: 0.7rem 0.5rem;
          text-align: center;
        }

        #top-nav.open ul {
          max-height: 20rem;
        }
      }

      @media only screen and (min-width: 700px) and (max-width: 1024px) {
        #top-nav .brand img {
          width: auto;
        }
        .handler_mobile-only {
          height: 40px;
        }
        .bar-1,
        .bar-2,
        .bar-3 {
          width: 30px;
          height: 5px;
        }
      }

      @media only screen and (min-width: 1101px) {
        #levelV {
          transition: transform 0.25s linear;
        }
        #levelV:hover {
          transform: rotate(132deg);
        }
      }

  `;
}
