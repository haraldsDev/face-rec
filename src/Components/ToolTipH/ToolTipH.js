import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Tooltip} from 'primereact/tooltip';

class TooltipH extends Component {
    constructor() {
        super();
        this.state = {
            title: null, 
            tooltipPosition: 'right'
            };
        this.onTooltipPosition = this.onTooltipPosition.bind(this);
    }

    onTooltipPosition(e) {
        let element = e.target;

        switch(element.id) {
            case "username":
                this.setState({title: "Enter your username", tooltipPosition: 'right'});
            break;
            default: break;
        }
    }

    render() {
        return (
            <div>
                <div className="content-section implementation">                    
                    <div className="p-grid p-fluid">
                        <div className="p-col-12 p-md-3">
                            <InputText type="text" placeholder="Right" tooltip="Enter your username" />              
                        </div>
                    </div>              
                </div>
            </div>
        )
    }
}

export default TooltipH;