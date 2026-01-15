import { Plus } from "lucide-react";

export interface CreateChannelButtonProperties {
    onClick?: () => void;
}

export default function CreateChannelButton({ onClick }: CreateChannelButtonProperties) {
    return (
        <div
            onClick={onClick}
            className="
                h-full w-[40px] flex-[0_0_40px]
                select-none
                rounded-[5px]
                bg-[var(--color-panel)]
                text-[var(--color-panel-text-muted)]
                transition-[background,color] duration-[150ms]
                hover:bg-[var(--color-panel-hover)]
                hover:text-[var(--color-panel-text-active)]
            "
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <Plus size={20} />
            </div>
        </div>
    );
}
