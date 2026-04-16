import { useState, useRef } from "@wordpress/element";
import { BaseControl, Button, Icon, Popover } from "@wordpress/components";
import { pencil } from "@wordpress/icons";
import { __ } from "@wordpress/i18n";
import { ReactNode } from "react";
import { PopoverProps } from "@wordpress/components/build-types/popover/types";
import type { Placement } from "@floating-ui/react-dom";

interface SidebarProps extends Partial<PopoverProps> {
	popoverSidebar?: boolean;
	title?: string;
	className?: string;
	children: ReactNode;
}

export type PopoverPlacement = Placement | "overlay";

export const ComponentSidebar = ({
	popoverSidebar = false,
	title,
	children,
	className,
	placement,
	...popoverProps
}: SidebarProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

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
