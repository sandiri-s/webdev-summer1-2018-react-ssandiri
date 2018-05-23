import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
  constructor(props) {
    super(props)
    this.deleteCourse = this.deleteCourse.bind(this);
  }
  render() {
    let displayModified;
    let currTime = new Date().toLocaleDateString();
    let lastModified = new Date(this.props.course.modified).toLocaleDateString();
    if(currTime == lastModified){
      displayModified = new Date(this.props.course.modified).toLocaleTimeString();
    }
    else{

      displayModified = lastModified;
    }
    return (
      <tr className ="">

        <td className ="">
      <Link to={`/course/${this.props.course.id}`}>
      {this.props.course.title}
      </Link>
      </td>
      <td className ="">
        me
      </td>
      <td className ="">
        {displayModified}
      </td>
      <td className ="">
      <button type="button" className="close" aria-label="Close" onClick ={this.deleteCourse}>
      <span aria-hidden="true">&times;</span>
      </button>
      </td>
      </tr>
    )
  }

  deleteCourse(event){
  if(!window.confirm("are you sure, you want to delete?"))
  {return;}
    this.props.deleteFun(this.props.course.id);

  }

}
export default CourseRow;
