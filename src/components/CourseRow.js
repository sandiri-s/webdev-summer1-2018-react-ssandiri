import React from 'react';
import { Link } from 'react-router-dom'

class CourseRow extends React.Component {
  constructor(props) {
    super(props)
    this.deleteCourse = this.deleteCourse.bind(this);
  }
  render() {
    return (
      <tr><td>
      <Link to={`/course/${this.props.course.id}`}>
      {this.props.course.title}
      </Link>
      </td>
      <td>
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
