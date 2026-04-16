import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button, Toolbar, ToolbarButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import {
	createDefaultAttributes,
	GetBlockAttributeValues,
	GetSetAttributesFunction,
} from "scripts/editor/utils/type-mapping";
import { useState, useRef, useEffect } from "react";

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
} as const;

/* Component styles */
const styles = {
	imageClasses: "",
	imageContainer: "h-full relative",
	imagePlaceholder:
		"bg-black/60 text-xl text-center font-serif mx-auto flex items-center justify-center relative z-30 h-full text-white",
};

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
	const { url, alt } = attributes;

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

	return (
		<>
			<div
				className={styles?.imageContainer}
				ref={contentRef}
				onClick={handleToolbarToggle}
			>
				{url ? (
					<>
						<Toolbar
							className={`absolute top-0 z-30 bg-white left-0 ${
								isHovered ? "block" : "hidden"
							}`}
							label="option"
						>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={(image) =>
										setAttributes({
											...attributes,
											url: image.url,
											alt: image.alt,
											id: String(image.id),
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
										url: image.url,
										alt: image.alt,
										id: String(image.id),
									})
								}
								render={({ open }) => (
									<Button variant="primary" onClick={open}>
										{__("Select Image")}
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
