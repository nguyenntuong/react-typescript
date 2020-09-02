// !! Order in this file is very important, pls aware that.

// Which old browser want to support, but trade off bundle size will be increase up to 20Kb
// href: https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md
// This must be the first line before entry application, the oldest browser you want to support.
import 'react-app-polyfill/ie9';

// This is optional,
// Add more feature to runtime of they dont have in your target brower,
// but trade off bundle size will be increase up to 30Kb.
// Smart select base on your browser list
import 'react-app-polyfill/stable';

export {};
