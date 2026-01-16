import { Plus } from "lucide-react";
import "./CreateChannelButton.scss";

export interface CreateChannelButtonProperties {
    onClick?: () => void;
}

export default function CreateChannelButton({ onClick }: CreateChannelButtonProperties) {
    return (
        <div className="mixer-create-channel-button" onClick={ onClick }>
            <div className="mixer-create-channel-button__container">
                <Plus size={20}/>
            </div>
        </div>
    )
}