import pckg from '../../package.json';
import Swup, { Options, Plugin } from '../index';

console.log = jest.fn();
console.warn = jest.fn();
console.error = jest.fn();

const baseUrl = window.location.origin;

describe('exports', () => {
	it('exports Swup, and Options/Plugin types', () => {
		class SwupPlugin implements Plugin {
			name = 'SwupPlugin';
			isSwupPlugin = true as const;
			mount = () => {};
			unmount = () => {};
		}

		const options: Partial<Options> = {
			animateHistoryBrowsing: false,
			animationSelector: '[class*="transition-"]',
			cache: true,
			containers: ['#swup'],
			ignoreVisit: (url, { el } = {}) => !!el?.closest('[data-no-swup]'),
			linkSelector: 'a[href]',
			plugins: [new SwupPlugin()],
			resolveUrl: (url) => url,
			requestHeaders: {
				'X-Requested-With': 'swup',
				Accept: 'text/html, application/xhtml+xml'
			},
			skipPopStateHandling: (event) => event.state?.source !== 'swup'
		};

		const swup = new Swup(options);
		expect(swup).toBeInstanceOf(Swup);
	});

	it('defines a version', () => {
		const swup = new Swup();
		expect(swup.version).not.toBeUndefined();
		expect(swup.version).toEqual(pckg.version);
	});

	it('passes relative URL to ignoreVisit', () => {
		let ignorableUrl = 'nothing';
		const swup = new Swup({
			ignoreVisit: (url, { el } = {}) => {
				ignorableUrl = url;
				return false;
			}
		});

		swup.shouldIgnoreVisit(baseUrl + '/path/?query#hash');

		expect(ignorableUrl).toEqual('/path/?query#hash');
	});
});
