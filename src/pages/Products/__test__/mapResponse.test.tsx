import type { ResponseData, MappedResponseData } from "../../../utils/utils";
import { mapResponse } from "../useProducts";

const responseData: ResponseData = {
	page: 1,
	per_page: 1,
	total: 3,
	total_pages: 3,
	data: [
		{
			id: 1,
			name: "Junior",
			year: 2000,
			color: "#333333",
			pantone_value: "#4444",
		},
	],
};

const mappedResponseData: MappedResponseData = {
	page: 1,
	perPage: 1,
	total: 3,
	totalPages: 3,
	products: [
		{
			id: 1,
			name: "Junior",
			year: 2000,
			color: "#333333",
			pantoneValue: "#4444",
		},
	],
};

test("If mapResposnse is proper", () => {
	const body = mapResponse(responseData);
	expect(body).toMatchObject(mappedResponseData);
});
