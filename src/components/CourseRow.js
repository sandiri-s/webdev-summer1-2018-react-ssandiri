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
      <tr className ="col-12">

        <td className ="col-4">
      <Link to={`/course/${this.props.course.id}`}>
      {this.props.course.title}
      </Link>
      </td>
      <td className ="col-2">
        me
      </td>
      <td className ="col-4">
        {displayModified}
      </td>
      <td className ="col-2">
      <button type="button" className="close" aria-label="Close" onClick ={this.deleteCourse}>
      <span aria-hidden="true">&times;</span>
      </button>
      </td>
      </tr>
    )
  }

  deleteCourse(event){
    this.props.deleteFun(this.props.course.id);

  }

}
export default CourseRow;
