import {
	RichText,
	URLInputButton,
	useBlockProps,
} from "@wordpress/block-editor";
import { SelectControl, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import clsx from "clsx";
import {
	ComponentSidebar,
} from "scripts/editor/utils/components/sidebar";

/* Component attributes */
export const attributes = {
	text: {
		type: "string",
		default: "",
	},
	href: {
		type: "string",
		default: "",
	},
	type: {
		type: "string",
		default: "primary",
	},
	openInNewTab: {
		type: "boolean",
		default: false,
	},
	linkType: {
		type: "string",
		enum: ["custom", "post"],
		default: "custom",
	},
	linkId: {
		type: "number",
		default: 0,
	},
};

/* Component styles */
const styles = {
	button:
		"py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out w-fit border border-black",
	text: "text-sm font-semibold",
	type: {
		primary: "bg-white text-black hover:bg-gray-200",
		secondary: "bg-black text-white hover:bg-gray-800",
	},
};

export const defaultAttributes =
	Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key, value.default]));

/* Component edit */
export const Edit = ({
	attributes,
	setAttributes,
}) => {
	const { text, href, type, openInNewTab } = attributes;
	const blockProps = useBlockProps();

	const onChangeLink = (newURL, post) => {
		if (post && post.kind === "post-type" && post.id) {
			setAttributes({
				...attributes,
				linkType: "post",
				linkId: post.id,
				href: newURL,
			});
		} else {
			setAttributes({
				...attributes,
				linkType: "custom",
				linkId: 0,
				href: newURL,
			});
		}
	};

	return (
		<>
			<div {...blockProps} className={type}>
				<div className="flex flex-col bg-white w-fit">
					<URLInputButton url={href} onChange={onChangeLink} />
					<ToggleControl
						label={__("Open in new tab")}
						checked={openInNewTab}
						onChange={(openInNewTab) =>
							setAttributes({ ...attributes, openInNewTab })
						}
					/>
				</div>
				<RichText
					tagName="p"
					placeholder={__("Button")}
					value={text}
					className={clsx(styles.button, styles.text, styles.type[type])}
					onChange={(text) => setAttributes({ ...attributes, text })}
				/>
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
	popoverSidebar = false,
	popoverPlacement = "overlay",
}) => {
	const { type } = attributes;
	const sidebarTitle = __(title ?? "Button Settings");
	return (
		<ComponentSidebar
			popoverSidebar={popoverSidebar}
			title={sidebarTitle}
			placement={popoverPlacement}
		>
			<SelectControl
				label="Type"
				value={type}
				options={[
					{ label: "Primary", value: "primary" },
					{ label: "Secondary", value: "secondary" },
				]}
				onChange={(type) => setAttributes({ ...attributes, type })}
			/>
			{children}
		</ComponentSidebar>
	);
};
