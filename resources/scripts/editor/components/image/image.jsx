import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { Button, Toolbar, ToolbarButton } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState, useRef, useEffect } from "@wordpress/element";

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
};

/* Component styles */
const styles = {
	imageClasses: "",
	imageContainer: "h-full relative",
	imagePlaceholder:
		"bg-black/60 text-xl text-center font-serif mx-auto flex items-center justify-center relative z-30 h-full text-white",
};

export const defaultAttributes =
	Object.fromEntries(Object.entries(attributes).map(([key, value]) => [key, value.default]));

/* Component edit */
export const Edit = ({
	attributes,
	setAttributes,
}) => {
	const { url, alt } = attributes;

	const [isHovered, setIsHovered] = useState(false);
	const contentRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
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
