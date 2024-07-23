import {
	RichText,
	URLInputButton,
	useBlockProps,
} from "@wordpress/block-editor";
import { PanelBody, SelectControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	createDefaultAttributes,
	GetBlockAttributeValues,
	GetSetAttributesFunction,
} from "scripts/editor/utils/type-mapping";
import clsx from "clsx";
import PlusSign from "images/plusSign";
import ArrowRight from "images/arrowRight";
import AppStore from "images/app-store.svg";
import PlayStore from "images/google-play.svg";
import AppGallery from "images/app-gallery.svg";

/* Component attributes */
const normalButtonTypes = ["primary", "secondary", "accent"];
const storeButtonTypes = ["appStore", "playStore", "appGallery"];
export const attributes = {
	text: {
		type: "string",
		default: "",
	},
	href: {
		type: "string",
		default: "",
	},
	showIcon: {
		type: "boolean",
		default: false,
	},
	iconOnRight: {
		type: "boolean",
		default: false,
	},
	isLoading: {
		type: "boolean",
		default: false,
	},
	size: {
		type: "string",
		enum: ["s", "m"],
		default: "m",
	},
	type: {
		type: "string",
		enum: [...normalButtonTypes, "icon", ...storeButtonTypes],
		default: "primary",
	},
	openInNewTab: {
		type: "boolean",
		default: false,
	},
} as const;

/* Component types */
export type BlockAttributeValues = GetBlockAttributeValues<typeof attributes>;
type SetAttributesFunction = GetSetAttributesFunction<typeof attributes>;
export const defaultAttributes: BlockAttributeValues =
	createDefaultAttributes(attributes);

/* Component styles */
const styles = {
	button:
		"justify-center focus:outline-none focus:ring-4 focus:ring-blue-600 disabled:text-neutral-300 disabled:bg-neutral-100 disabled:border-neutral-100",
	text: "text-xs font-serif font-bold",
	iconSize: {
		s: "px-1 py-1 w-8 h-8",
		m: "px-2 py-2 w-11 h-11",
	},
	shared: {
		store: "px-4 py-3 rounded-xl hover:shadow-lg",
		regular: "border w-full lg:w-fit px-5 rounded-full",
		icon: "border rounded-full",
	},
	type: {
		primary:
			"bg-black border-black hover:bg-neutral-700 hover:border-neutral-700 active:bg-neutral-600 active:border-neutral-600 text-white",
		secondary:
			"bg-white border-neutral-300 hover:bg-neutral-100 hover:border-neutral-400 active:bg-neutral-200 active:border-neutral-400 text-black",
		accent:
			"bg-green-400 border-green-400 hover:bg-green-300 hover:border-green-300 active:bg-green-200 active:border-green-200 text-black disabled:bg-white",
		icon: "text-black dark:text-white bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 hover:border-neutral-400 dark:hover:bg-neutral-600 dark:hover:border-neutral-600 active:bg-neutral-200 active:border-neutral-500 dark:active:bg-neutral-500 disabled:border-neutral-100 dark:disabled:bg-neutral-700 dark:disabled:border-neutral-700",
		appStore: "bg-black",
		playStore: "bg-white border border-neutral-200",
		appGallery: "bg-white border border-neutral-200",
	},
};

/* Component edit */
export const Edit = ({
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributeValues;
	setAttributes: SetAttributesFunction;
}) => {
	const { text, href, type, size, iconOnRight, openInNewTab } = attributes;
	const blockProps = useBlockProps();
	const buttonSizeClass = type === "icon" ? styles?.iconSize?.[size] : "py-3";

	const typeClass = clsx({
		[styles?.type?.[type]]: true,
		[styles?.shared?.store]: storeButtonTypes?.includes(type),
		[styles?.shared?.regular]: normalButtonTypes?.includes(type),
		[styles?.shared?.icon]: type === "icon",
	});

	return (
		<>
			<div {...blockProps} className={clsx(type, "flex flex-col")}>
				{!storeButtonTypes.includes(type) && (
					<div className="flex flex-col bg-white w-fit">
						<URLInputButton
							url={href}
							onChange={(href) => setAttributes({ ...attributes, href })}
						/>
						<ToggleControl
							label={__("Open in new tab")}
							checked={openInNewTab}
							onChange={(openInNewTab) =>
								setAttributes({ ...attributes, openInNewTab })
							}
						/>
					</div>
				)}
				<div
					className={clsx(
						"flex gap-1",
						styles?.text,
						styles?.button,
						buttonSizeClass,
						typeClass
					)}
				>
					{(() => {
						switch (type) {
							case "icon":
								return <PlusSign className="fill-current" />;
							case "appStore":
								return (
									<img
										className="object-none"
										src={AppStore}
										alt="App Store logo"
										aria-hidden="true"
									/>
								);
							case "playStore":
								return (
									<img
										className="object-none"
										src={PlayStore}
										alt="Google Play logo"
										aria-hidden="true"
									/>
								);
							case "appGallery":
								return (
									<img
										className="object-none"
										src={AppGallery}
										alt="App Gallery logo"
										aria-hidden="true"
									/>
								);

							default:
								return (
									<>
										{attributes.showIcon && (
											<div
												className={clsx(
													iconOnRight ? "order-last" : "order-first"
												)}
											>
												<ArrowRight className="object-none" />
											</div>
										)}
										<RichText
											tagName="p"
											placeholder={__("Button")}
											value={text}
											onChange={(text) =>
												setAttributes({ ...attributes, text })
											}
										/>
									</>
								);
						}
					})()}
				</div>
			</div>
		</>
	);
};

/* Component sidebar */
export const Sidebar = ({
	attributes,
	setAttributes,
	title,
	children,
}: {
	attributes: BlockAttributeValues;
	setAttributes: SetAttributesFunction;
	title?: string;
	children?: React.ReactNode;
}) => {
	const { type, showIcon, size, iconOnRight } = attributes;

	return (
		<PanelBody title={__(title ?? "Button Settings")} initialOpen>
			<SelectControl
				label="Type"
				value={type}
				options={[
					{ label: "Primary", value: "primary" },
					{ label: "Secondary", value: "secondary" },
					{ label: "Accent", value: "accent" },
					{ label: "Icon", value: "icon" },
					{ label: "App Store", value: "appStore" },
					{ label: "Play Store", value: "playStore" },
					{ label: "App Gallery", value: "appGallery" },
				]}
				onChange={(value) => setAttributes({ ...attributes, type: value })}
			/>
			{type === "icon" && (
				<SelectControl
					label="Size"
					value={size}
					options={[
						{ label: "Small", value: "s" },
						{ label: "Medium", value: "m" },
					]}
					onChange={(value) => setAttributes({ ...attributes, size: value })}
				/>
			)}
			{normalButtonTypes?.includes(type) && (
				<>
					<ToggleControl
						label={__("Show Icon")}
						checked={showIcon}
						onChange={(showIcon) => setAttributes({ ...attributes, showIcon })}
					/>
					{showIcon && (
						<ToggleControl
							label={__("Icon on Right")}
							checked={iconOnRight}
							onChange={(iconOnRight) =>
								setAttributes({ ...attributes, iconOnRight })
							}
						/>
					)}
				</>
			)}
			{children}
		</PanelBody>
	);
};
