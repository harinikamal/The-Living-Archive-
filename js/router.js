/**
 * The Living Archive — Hash-Based Router
 * Handles client-side navigation between #/, #/archive, #/read/:id, and #/submit.
 */

class Router {
  constructor() {
    this.routes = [];
    this.currentRoute = null;
    this.outlet = null;

    // Bind hash change listener
    window.addEventListener('hashchange', () => this.handleRouting());
  }

  /**
   * Initializes the router with a target DOM outlet.
   * @param {HTMLElement} outlet
   */
  init(outlet) {
    this.outlet = outlet;
    this.handleRouting();
  }

  /**
   * Registers a route path and handler.
   * Path patterns support :params (e.g. '/read/:id')
   * @param {string} path
   * @param {Function} handler
   */
  addRoute(path, handler) {
    const paramNames = [];
    const regexPath = path
      .replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([^/]+)';
      })
      .replace(/\//g, '\\/');

    const regex = new RegExp(`^${regexPath}$`);
    this.routes.push({ path, regex, paramNames, handler });
  }

  /**
   * Parses current location hash into path and query params.
   * e.g., "#/archive?theme=Longing" -> { path: '/archive', query: { theme: 'Longing' } }
   */
  parseHash() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = rawHash.split('?');
    const path = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
    
    const query = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      for (const [key, val] of searchParams.entries()) {
        query[key] = val;
      }
    }

    return { path, query };
  }

  /**
   * Handles hash change, finds matching route, updates navigation links, and invokes handler.
   */
  async handleRouting() {
    const { path, query } = this.parseHash();
    
    let matchedRoute = null;
    let params = {};

    for (const route of this.routes) {
      const match = path.match(route.regex);
      if (match) {
        matchedRoute = route;
        route.paramNames.forEach((name, index) => {
          params[name] = decodeURIComponent(match[index + 1]);
        });
        break;
      }
    }

    // Default route fallback to root if not found
    if (!matchedRoute) {
      window.location.hash = '#/';
      return;
    }

    this.currentRoute = matchedRoute;
    this.updateActiveNav(path);

    if (this.outlet && typeof matchedRoute.handler === 'function') {
      // Clear and render new view
      await matchedRoute.handler(this.outlet, { params, query });
      
      // Reset scroll position to top
      window.scrollTo({ top: 0, behavior: 'instant' });

      // Focus main container for keyboard users
      this.outlet.focus();
    }
  }

  /**
   * Updates visual and ARIA active state of header nav links.
   * @param {string} path
   */
  updateActiveNav(path) {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');

      const href = link.getAttribute('href') || '';
      const linkPath = href.replace(/^#/, '');

      if (
        (path === '/' && (linkPath === '/' || linkPath === '')) ||
        (path.startsWith('/archive') && linkPath === '/archive') ||
        (path.startsWith('/submit') && linkPath === '/submit')
      ) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Programmatic navigation helper.
   * @param {string} hash
   */
  navigate(hash) {
    window.location.hash = hash;
  }
}

export const router = new Router();
