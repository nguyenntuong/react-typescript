## Programming language

This project using [TypeScript](https://www.typescriptlang.org/) as a primary programming language and at version `4.0.2`.

### Polyfills

Support polyfills for old browser. <br />
Edit file `src/polyfills.ts` browser support selection.<br />
Also edit `"browserslist"` in `package.json` for more polyfills support.

### CSS, SCSS Support

This project also support pure css and css preprocessing too.

### Style isolation

This style isolation features aslo know as style module. <br />
CSS Modules let you use the same CSS class name in different files without worrying about naming classes.
This features currently just only support for `class` isolation not for `tag` isolation.

\*\*\* This apply for scss too, just name the scss or css file as `[name].module.sass` or `[name].module.css` and use it as a `typescript` module but a dictionary of `css` `class`.
Ex: <br /><br />
`import styles from './styles.module.scss';`<br />
`<p className={styles['style-app-p']}>This is from Dashboard</p>`

### Style Reset and Normalize

This project already injected Style normalize for all browser in `src/post-index.css`. You can remove it but not recommended.<br />
More detail [CSS Reset](https://create-react-app.dev/docs/adding-css-reset) | [Css Normalize](https://github.com/csstools/normalize.css)

### Runtime config

A script avaiable for inject at runtime can place at `public` folder and inject into `public/index.html`. Ex: `public/config.js`. You can edit it for some purpose like enviroment setting.
