import { useState, useRef } from "@wordpress/element";
import { BaseControl, Button, Icon, Popover } from "@wordpress/components";
import { pencil } from "@wordpress/icons";
import { __ } from "@wordpress/i18n";

export const ComponentSidebar = ({
	popoverSidebar = false,
	title,
	children,
	className,
	placement,
	...popoverProps
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef(null);

	const effectivePlacement = placement;
	if (!popoverSidebar) {
		return (
			<BaseControl label={title}>
				<div className={className}>{children}</div>
			</BaseControl>
		);
	}

	return (
		<BaseControl>
			<Button
				variant="secondary"
				icon={<Icon icon={pencil} />}
				ref={buttonRef}
				onClick={() => setIsOpen(true)}
			>
				{title || __("Edit Settings")}
			</Button>
			{isOpen && (
				<Popover
					onClose={() => setIsOpen(false)}
					className="sidebar-popover"
					placement={effectivePlacement}
					title={title}
					anchor={buttonRef.current || undefined}
					{...popoverProps}
				>
					<div className={className}>{children}</div>
					<Button variant="primary" onClick={() => setIsOpen(false)}>
						{__("Close")}
					</Button>
				</Popover>
			)}
		</BaseControl>
	);
};
