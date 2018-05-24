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

       <li className="nav-item">
        <div className="nav-link active ">
       <a id="nav-pills-link"
                              href="#">{this.props.lesson.title}</a>

        <span className="float-right">
          <i className="fa fa-trash" onClick={this.deleteModule}></i>
        </span>
        </div>
      </li>
    );
  }

  deleteModule(event){
    if(!window.confirm("are you sure, you want to delete?"))
    {return;}
    this.props.deleteFun(this.props.lesson.id,this.props.moduleId);

  }

}
