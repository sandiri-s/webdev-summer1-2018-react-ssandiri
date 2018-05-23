import React from 'react';
import ModuleService from '../services/ModuleService';
import { Link } from 'react-router-dom';

export default class ModuleListItem
  extends React.Component {
  constructor(props) {
    super(props);
      this.deleteModule = this.deleteModule.bind(this);
  }
  render() {
    return (
      <li className="list-group-item">

        <Link to={`/module/${this.props.module.id}`}>
        {this.props.module.title}
        </Link>

        <span className="float-right">
    <button type="button" className="close" aria-label="Close" onClick ={this.deleteModule}>
            <span aria-hidden="true">&times;</span>
      </button>
        </span>
      </li>
    );
  }

  deleteModule(event){
    if(!window.confirm("are you sure, you want to delete?"))
    {return;}
    this.props.deleteFun(this.props.module.id,this.props.courseId);

  }

}
