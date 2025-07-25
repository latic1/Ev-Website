import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";

interface SimpleToolTipProps {
    children: ReactNode;
    tooltip?: string;
    containerClass?: string;
}

const SimpleToolTip = ({ children, tooltip, containerClass }: SimpleToolTipProps) => {
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const container = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={container}
            onMouseEnter={({ clientX }) => {
                if (!tooltipRef.current || !container.current) return;
                const { left } = container.current.getBoundingClientRect();

                // tooltipRef.current.style.left = clientX - left + "px";
            }}
            className={cn(
                "group relative inline-block overflow-visible",
                containerClass ?? "",
            )}
        >
            {children}
            {tooltip ? (
                <span
                    ref={tooltipRef}
                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition text-xs text-center text-black bg-white/70 backdrop-blur-md border-1 border-accent-100 py-2 px-3 rounded-lg absolute bottom-[120%] left-1/2 transform -translate-x-1/2 w-max min-w-[200px] max-w-[500px]"
                >
                    {tooltip}
                </span>
            ) : null}
        </div>
    );
};

export default SimpleToolTip;