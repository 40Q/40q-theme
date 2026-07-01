import { RichText, useBlockProps } from "@wordpress/block-editor";
import {
	ToggleControl,
	SelectControl,
	BaseControl,
} from "@wordpress/components";
import clsx from "clsx";

/* Component attributes */
export const attributes = {
	heading: {
		type: "string",
		default: "",
	},
	isH1: {
		type: "boolean",
		default: false,
	},
	headingSize: {
		type: "string",
		enum: ["s", "m", "l"],
		default: "m",
	},
};

/* Component styles */
const styles = {
	heading: "font-extrabold font-serif leading-tight m-0 p-0",
	size: { s: "text-4xl", m: "text-5xl", l: "text-6xl" },
};

export const defaultAttributes =
	Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key, value.default]));

/* Component edit */
export const Edit = ({
	attributes,
	setAttributes,
	className,
}) => {
	const { heading, isH1, headingSize } = attributes;

	const blockProps = useBlockProps({
		className: "w-full",
	});

	return (
		<>
			<div {...blockProps}>
				<RichText
					tagName={isH1 ? "h1" : "h2"}
					className={clsx(
						className,
						styles?.heading,
						headingSize ? styles.size[headingSize] : styles.size.m
					)}
					value={heading}
					onChange={(heading) => setAttributes({ ...attributes, heading })}
					placeholder="Heading..."
					allowedFormats={[]}
				/>
			</div>
		</>
	);
};

/* Component sidebar */
export const Sidebar = ({
	attributes,
	setAttributes,
}) => {
	const { isH1, headingSize } = attributes;
	return (
		<BaseControl label="Heading Settings" className="mb-6">
			<ToggleControl
				label="Use H1"
				checked={!!isH1}
				onChange={(isH1) => setAttributes({ ...attributes, isH1 })}
			/>
			<SelectControl
				label="Heading Size"
				options={[
					{ label: "S", value: "s" },
					{ label: "M", value: "m" },
					{ label: "L", value: "l" },
				]}
				value={headingSize}
				onChange={(headingSize) => {
					setAttributes({ ...attributes, headingSize });
				}}
			/>
		</BaseControl>
	);
};
