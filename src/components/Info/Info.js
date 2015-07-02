//
// Component Modules
// -----------------------------------------------------------------------------
import './Info.scss';
import React from 'react';

//
// External Modules
// -----------------------------------------------------------------------------
import lorem from 'lorem-ipsum';

//
// Component
// -----------------------------------------------------------------------------
class Info {

    static propTypes = {};

    //
    // React
    // -----------------------------------------------------------------------------

    render() {
        return (
            <div className="Info" dangerouslySetInnerHTML={{__html:lorem({units: 'paragraphs', count: 50, format:'html'})}}>
            </div>
        );
    }
}

export default Info;
