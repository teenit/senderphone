import React, { Component} from "react";
import { createPortal } from "react-dom";
import './PortalModalRoot.scss'

export class PortalModalRoot extends Component{
    el = document.createElement('div')
    
    componentDidMount(){
        this.el.className = "modal";
        document.body.appendChild(this.el)
    }
    componentWillUnmount(){
        document.body.removeChild(this.el)
    }
    
    render(){
           return (
                    createPortal(
                        <div className={this.props.modalClass}>  
                            {this.props.children}
                        </div>, 
                        this.el)  
           )
    }  
}

export default PortalModalRoot;