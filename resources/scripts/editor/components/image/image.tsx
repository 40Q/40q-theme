// image.tsx
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import {
	Button,
	Toolbar,
	ToolbarButton,
	ToggleControl,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	createDefaultAttributes,
	GetBlockAttributeValues,
	GetSetAttributesFunction,
} from "scripts/editor/utils/type-mapping";
import { useState, useRef, useEffect } from "react";
import { imageStyles } from "scripts/editor/utils/imageStyles";

/* Component attributes */
export const attributes = {
	url: {
		type: "string",
		default: "",
	},
	id: {
		type: "string",
		default: "",
	},
	alt: {
		type: "string",
		default: "",
	},
	textPlaceholder: {
		type: "string",
		default: __("Select Image", "40q"),
	},
	blockType: {
		type: "string",
		default: "default",
	},
	mobileImage: {
		type: "object",
		default: {
			url: "",
			id: "",
			alt: "",
		},
	},
	hasDifferentMobileImage: {
		type: "boolean",
		default: false,
	},
} as const;

/* Component types */
export type BlockAttributeValues = GetBlockAttributeValues<typeof attributes>;
type SetAttributesFunction = GetSetAttributesFunction<typeof attributes>;
export const defaultAttributes: BlockAttributeValues =
	createDefaultAttributes(attributes);

/* Component edit */
export const Edit = ({
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributeValues;
	setAttributes: SetAttributesFunction;
}) => {
	const { url, alt, textPlaceholder, blockType } = attributes;

	const [isHovered, setIsHovered] = useState(false);
	const contentRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (contentRef.current && !contentRef.current.contains(event.target)) {
				setIsHovered(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleToolbarToggle = () => {
		setIsHovered(!isHovered);
	};

	const styles = imageStyles[blockType] || imageStyles.default;

	return (
		<>
			<div
				className={url ? styles?.imageContainer : "h-full w-full"}
				ref={contentRef}
				onClick={handleToolbarToggle}
			>
				{url ? (
					<>
						<Toolbar
							className={`absolute top-0 z-50 bg-white left-0 w-max ${
								isHovered ? "block" : "hidden"
							}`}
							label="option"
						>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(image) =>
										setAttributes({
											...attributes,
											url: image?.url,
											alt: image?.alt,
											id: String(image?.id),
										})
									}
									render={({ open }) => (
										<ToolbarButton
											icon="edit"
											title={__("Select Image")}
											onClick={open}
										/>
									)}
								/>
							</MediaUploadCheck>
							<ToolbarButton
								icon="remove"
								title={__("Remove Image")}
								onClick={() => {
									setAttributes({
										...attributes,
										url: "",
										alt: "",
										id: "",
									});
								}}
							/>
						</Toolbar>
						<img src={url} alt={alt} className={styles?.imageClasses}></img>
					</>
				) : (
					<div className={styles?.imagePlaceholder}>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={(image) =>
									setAttributes({
										...attributes,
										url: image?.url,
										alt: image?.alt,
										id: String(image?.id),
									})
								}
								render={({ open }) => (
									<Button variant="primary" onClick={open}>
										{textPlaceholder ?? __("Select Image")}
									</Button>
								)}
							/>
						</MediaUploadCheck>
					</div>
				)}
			</div>
		</>
	);
};

export const Sidebar = ({
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributeValues;
	setAttributes: SetAttributesFunction;
}) => {
	const {
		hasDifferentMobileImage,
		mobileImage = {
			url: "",
			id: "",
			alt: "",
		},
	} = attributes;

	return (
		<>
			<ToggleControl
				label={__("Has different mobile image")}
				checked={!!hasDifferentMobileImage}
				onChange={(value) => {
					setAttributes({
						...attributes,
						hasDifferentMobileImage: value,
					});
				}}
			/>

			{hasDifferentMobileImage && (
				<div className="mb-6">
					<Edit
						attributes={mobileImage as BlockAttributeValues}
						setAttributes={(newAttributes) => {
							setAttributes({
								...attributes,
								mobileImage: {
									...mobileImage,
									...newAttributes,
								},
							});
						}}
					/>
				</div>
			)}
		</>
	);
};
