import {
	AlignmentToolbar,
	BlockControls,
	RichText,
	useBlockProps,
} from "@wordpress/block-editor";
import {
	Button,
	ButtonGroup,
	Icon,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	defaultAttributes as defaultHeadingAttributes,
	Edit as HeadingEdit,
	Sidebar as HeadingSidebar,
	BlockAttributeValues as HeadingTypes,
} from "scripts/editor/components/heading/heading";
import {
	ComponentSidebar,
	PopoverPlacement,
} from "scripts/editor/utils/components/sidebar";
import {
	createDefaultAttributes,
	GetBlockAttributeValues,
	GetSetAttributesFunction,
} from "scripts/editor/utils/type-mapping";
import { alignCenter, alignLeft, alignRight } from "@wordpress/icons";

/* Component attributes */
export const attributes = {
	showEyebrow: {
		type: "boolean",
		default: true,
	},
	eyebrow: {
		type: "string",
		default: "",
	},
	showHeading: {
		type: "boolean",
		default: true,
	},
	heading: {
		type: "object",
		default: defaultHeadingAttributes,
	},
	showText: {
		type: "boolean",
		default: true,
	},
	text: {
		type: "string",
		default: "",
	},
	textAlign: {
		type: "string",
		default: "left",
	},
} as const;

/* Component types */
export type BlockAttributeValues = GetBlockAttributeValues<typeof attributes>;
type SetAttributesFunction = GetSetAttributesFunction<typeof attributes>;
export const defaultAttributes: BlockAttributeValues =
	createDefaultAttributes(attributes);

export const Edit = ({
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributeValues;
	setAttributes: SetAttributesFunction;
}) => {
	const {
		showEyebrow,
		eyebrow,
		showHeading,
		showText,
		text,
		heading,
		textAlign,
	} = attributes;

	const alignmentClass =
		textAlign === "center"
			? "text-center"
			: textAlign === "right"
			? "text-right"
			: "text-left";

	const blockProps = useBlockProps({
		className: `container ${alignmentClass}`,
	});

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={textAlign}
					onChange={(newAlign) =>
						setAttributes({ ...attributes, textAlign: newAlign || "left" })
					}
				/>
			</BlockControls>

			<div {...blockProps}>
				{showEyebrow && (
					<RichText
						tagName="p"
						placeholder={__("Eyebrow")}
						value={eyebrow}
						onChange={(eyebrow) => setAttributes({ ...attributes, eyebrow })}
						allowedFormats={[]}
					/>
				)}
				{showHeading && (
					<HeadingEdit
						attributes={heading as HeadingTypes}
						setAttributes={(updateHeading) =>
							setAttributes({
								...attributes,
								heading: {
									...heading,
									...updateHeading,
								},
							})
						}
					/>
				)}
				{showText && (
					<RichText
						tagName="p"
						placeholder={__("Lorem ipsum dolor sit amet.")}
						value={text}
						onChange={(text) => setAttributes({ ...attributes, text })}
					/>
				)}
			</div>
		</>
	);
};

export const Sidebar = ({
	attributes,
	setAttributes,
	popoverSidebar = false,
	popoverPlacement = "overlay",
}: {
	attributes: BlockAttributeValues;
	setAttributes: SetAttributesFunction;
	popoverSidebar?: boolean;
	popoverPlacement?: PopoverPlacement;
}) => {
	const { showEyebrow, showHeading, showText, heading, textAlign } = attributes;
	const sidebarTitle = __("Section Header Settings");
	const toggleClass = "p-0 !m-0";
	return (
		<ComponentSidebar
			popoverSidebar={popoverSidebar}
			title={sidebarTitle}
			placement={popoverPlacement}
			className="flex flex-col gap-6"
		>
			<ButtonGroup>
				<Button
					variant={textAlign === "left" ? "primary" : "secondary"}
					onClick={() => setAttributes({ ...attributes, textAlign: "left" })}
					label={__("Align Left")}
				>
					<Icon icon={alignLeft} />
				</Button>
				<Button
					variant={textAlign === "center" ? "primary" : "secondary"}
					onClick={() => setAttributes({ ...attributes, textAlign: "center" })}
					label={__("Align Center")}
				>
					<Icon icon={alignCenter} />
				</Button>
				<Button
					variant={textAlign === "right" ? "primary" : "secondary"}
					onClick={() => setAttributes({ ...attributes, textAlign: "right" })}
					label={__("Align Right")}
				>
					<Icon icon={alignRight} />
				</Button>
			</ButtonGroup>

			<ToggleControl
				label="Show Eyebrow"
				checked={!!showEyebrow}
				onChange={(showEyebrow) =>
					setAttributes({ ...attributes, showEyebrow })
				}
				className={toggleClass}
			/>
			<ToggleControl
				label="Show Title"
				checked={!!showHeading}
				onChange={(showHeading) =>
					setAttributes({ ...attributes, showHeading })
				}
				className={toggleClass}
			/>
			<ToggleControl
				label="Show Text"
				checked={!!showText}
				onChange={(showText) => setAttributes({ ...attributes, showText })}
				className={toggleClass}
			/>

			{!!showHeading && (
				<HeadingSidebar
					attributes={heading as HeadingTypes}
					setAttributes={(updateHeading) =>
						setAttributes({
							...attributes,
							heading: {
								...heading,
								...updateHeading,
							},
						})
					}
				/>
			)}
		</ComponentSidebar>
	);
};
