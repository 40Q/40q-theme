import apiFetch from "@wordpress/api-fetch";
import { BlockStyle } from "@wordpress/blocks";
import { Post } from "@wordpress/core-data";
import { __ } from "@wordpress/i18n";
import { Media, PostType } from "../components/post-select/post-select";
import type { WP_REST_API_Categories } from "wp-types";

export const imageTextBlockStyles: BlockStyle[] = [
	{
		name: "",
		isDefault: true,
		label: __("6/6", "40q"),
	},
	{
		name: "7/5",
		isDefault: false,
		label: __("7/5", "40q"),
	},
	{
		name: "5/7",
		isDefault: false,
		label: __("5/7", "40q"),
	},
	{
		name: "5/6",
		isDefault: false,
		label: __("5/6", "40q"),
	},
	{
		name: "6/5",
		isDefault: false,
		label: __("6/5", "40q"),
	},
	{
		name: "8/4",
		isDefault: false,
		label: __("8/4", "40q"),
	},
	{
		name: "4/8",
		isDefault: false,
		label: __("4/8", "40q"),
	},
];

export const extractText = (
	htmlString: string,
	maxChars?: number
): string | null => {
	const parser = new DOMParser();
	const post = parser.parseFromString(htmlString, "text/html");
	const strongElement = post.querySelector("p > strong");

	const textContent = strongElement
		? strongElement.textContent
		: post.querySelector("p")?.textContent;

	if (maxChars && textContent.length > maxChars) {
		return textContent.substring(0, maxChars) + "...";
	}
	return textContent;
};

export const getMedia = async (id: number) => {
	try {
		return await apiFetch<Media>({
			path: `/wp/v2/media/${id}`,
		});
	} catch (error) {
		console.error("Error fetching media:", error);
	}
};

export const getPosts = async (queryParams: string, postTypes: PostType[]) => {
	return Promise.all(
		postTypes.map(async (postType) => {
			const posts = (await apiFetch({
				path: `/wp/v2/${postType}s?${queryParams.toString()}`,
			})) as Post[];
			return {
				label: postType,
				options: posts.map((post) => ({
					label: post.title.rendered,
					value: post.id,
					post,
				})),
			};
		})
	);
};

export const getCategories = async () => {
	try {
		const categories = await apiFetch({
			path: `/wp/v2/categories?per_page=100`,
		});

		return categories as WP_REST_API_Categories;
	} catch (error) {
		console.error("Error fetching categories:", error);
	}
};

export const getDefaultValues = (attribute) => {
	return Object.keys(attribute).reduce((defaults, key) => {
		defaults[key] = attribute[key].default;
		return defaults;
	}, {});
};

type ComponentStrategies = {
	[key: string]: {
		label: string;
		Edit: (props: unknown) => React.JSX.Element;
		Sidebar?: (props: unknown) => React.JSX.Element;
	};
};
type ComponentOption = {
	label: string;
	value: string;
};

export const getComponentOptions = (
	componentStrategies: ComponentStrategies
): ComponentOption[] => {
	return Object.keys(componentStrategies).map((key) => ({
		label: componentStrategies[key].label,
		value: key,
	}));
};

export const styleToGridClasses = (
	className: string | undefined,
	imageOnRight: boolean
): { textClass: string; imageClass: string } => {
	const stylesMap: { [key: string]: [string, string] } = {
		"": ["col-span-6", "col-span-6"],
		"7/5": ["col-span-7", "col-span-5"],
		"5/7": ["col-span-5", "col-span-7"],
		"5/6": ["col-span-5", "col-span-6"],
		"6/5": ["col-span-6", "col-span-5"],
		"8/4": ["col-span-8", "col-span-4"],
		"4/8": ["col-span-4", "col-span-8"],
	};
	const styleName = className?.replace("is-style-", "") || "";
	const gridClasses = stylesMap[styleName] || stylesMap[""];
	const textClass = imageOnRight ? gridClasses[0] : gridClasses[1];
	const imageClass = imageOnRight ? gridClasses[1] : gridClasses[0];

	return { textClass, imageClass };
};
