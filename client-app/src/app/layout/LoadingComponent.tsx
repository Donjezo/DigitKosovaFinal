import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean; // this means if we want to draker or lighter background 
    content?: string;
}

export default function LoadingComponent({ inverted = true, content = 'Loading...' }: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}