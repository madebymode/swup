export default class PageLoadedResponse {

	page: Object;
	response: Object;

	constructor(page: Object, response: Object) {
		this.page = page;
		this.response = response;
	}
}
