import React from 'react';
import ModuleService from '../services/ModuleService';
export default class ModuleListItem
  extends React.Component {
  constructor(props) {
    super(props);
      this.deleteModule = this.deleteModule.bind(this);
  }
  render() {
    return (
      <li className="list-group-item">
        {this.props.module.title}

        <span className="float-right">
    <button type="button" className="close" aria-label="Close" onClick ={this.deleteModule}>
            <span aria-hidden="true">&times;</span>
      </button>
        </span>
      </li>
    );
  }

  deleteModule(event){
    this.props.deleteFun(this.props.module.id,this.props.courseId);

  }

}
