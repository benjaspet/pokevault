import React from "react";
import { Helmet } from "react-helmet";

export interface ITitleProps {
    title: string;
}

const PageSpecificTitle: React.FC<ITitleProps> = (props: ITitleProps) => {
    return (
        <div>
            <Helmet>
                <title>{props.title}</title>
            </Helmet>
        </div>
    );
}

export default PageSpecificTitle;