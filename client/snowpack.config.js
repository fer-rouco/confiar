const IS_TEST = process.env.NODE_ENV === 'test';

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
	mount: {
		public: { url: '/', static: true },
		src: { url: '/dist' },
		'node_modules/bootstrap-icons/font/fonts': '/fonts',
	},
	plugins: ['@snowpack/plugin-react-refresh', '@snowpack/plugin-dotenv', '@snowpack/plugin-babel'],
	routes: [
		/* Enable an SPA Fallback in development: */
		// { match: 'routes', src: '.*', dest: '/index.html' }
	],
	optimize: {
		/* Example: Bundle your final build: */
		// "bundle": true,
	},
	packageOptions: {
    polyfillNode: true
	},
	devOptions: {
    port: (IS_TEST) ? 3001 : 3000,
		src: 'src',
    bundle: false
	},
	buildOptions: {
		clean: true,
		out: 'dist'
	}
}
