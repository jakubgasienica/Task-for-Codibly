import { render, screen, waitFor, act } from "@testing-library/react";
import { Products } from "../Products";
import userEvent from "@testing-library/user-event";

jest.mock("../../../utils/fetchProducts", () => ({
	// ...jest.requireActual("../../../utils/fetchProducts"),
	fetchDetails: async () => ({
		json: async () => ({
			data: {
				id: 1,
				name: "cerulean",
				year: 2000,
				color: "#98B2D1",
				pantone_value: "15-4020",
			},
			support: {
				url: "https://reqres.in/#support-heading",
				text: "To keep ReqRes free, contributions towards server costs are appreciated!",
			},
		}),
	}),
	fetchProducts: async () => ({
		json: async () => ({
			page: 1,
			per_page: 5,
			total: 12,
			total_pages: 3,
			data: [
				{
					id: 1,
					name: "cerulean",
					year: 2000,
					color: "#98B2D1",
					pantone_value: "15-4020",
				},
				{
					id: 2,
					name: "fuchsia rose",
					year: 2001,
					color: "#C74375",
					pantone_value: "17-2031",
				},
				{
					id: 3,
					name: "true red",
					year: 2002,
					color: "#BF1932",
					pantone_value: "19-1664",
				},
				{
					id: 4,
					name: "aqua sky",
					year: 2003,
					color: "#7BC4C4",
					pantone_value: "14-4811",
				},
				{
					id: 5,
					name: "tigerlily",
					year: 2004,
					color: "#E2583E",
					pantone_value: "17-1456",
				},
			],
			support: {
				url: "https://reqres.in/#support-heading",
				text: "To keep ReqRes free, contributions towards server costs are appreciated!",
			},
		}),
	}),
}));

describe("Products.tsx", () => {
	test("if selected item will be only show by click an element", async () => {
		render(<Products />);
		const tableRow = await screen.findByText(/cerulean/i);

		userEvent.click(tableRow);

		await waitFor(async () => {
			expect(screen.queryByText(/fuchsia rose/i)).not.toBeInTheDocument();
		});
	});

	test("if render prooper 5 rows", async () => {
		render(<Products />);
		await waitFor(async () => {
			expect(screen.getAllByRole("row").length).toBe(6);
		});
	});
	test("if filters products", async () => {
		render(<Products />);

		const searchItem = screen.getByLabelText(/write id of offer/i);
		const searchButton = screen.getByText(/search/i);

		userEvent.type(searchItem, "1");
		userEvent.click(searchButton);

		// await waitFor(async () => {
		// 	expect(screen.queryByText(/cerulean/i)).toBeInTheDocument();
		// });

		expect(screen.findByText(/cerulean/i)).resolves.toBeInTheDocument();

		// expect(screen.queryByText(/fuchsia rose/i)).not.toBeInTheDocument();

		expect(screen.findByText(/fuchsia rose/i)).rejects.toThrow();
	});
});
