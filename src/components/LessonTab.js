import React from 'react';
import ModuleService from '../services/ModuleService';
import { Link } from 'react-router-dom';
export default class ModuleListItem
  extends React.Component {
  constructor(props) {
    super(props);
      this.deleteLesson = this.deleteLesson.bind(this);
  }
  render() {
    return (

       <li className="nav-item">
        <div className="nav-link active ">
                            <Link id="lesson-link" to={`/lesson/${this.props.lesson.id}`}>
                              {this.props.lesson.title}&nbsp;&nbsp;&nbsp;
                              </Link>

        <span className="float-right">
          <i className="fa fa-trash" onClick={this.deleteLesson}></i>
        </span>
        </div>
      </li>
    );
  }

  deleteLesson(event){
    if(!window.confirm("are you sure, you want to delete?"))
    {return;}
    this.props.deleteFun(this.props.lesson.id,this.props.moduleId);

  }

}
