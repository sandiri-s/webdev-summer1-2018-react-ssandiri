import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
  constructor() {
    super();
    this.courseService = CourseService.instance;
    this.titleChanged = this.titleChanged.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }
  componentDidMount() {
    this.findAllCourses();
  }
  findAllCourses() {

    this.courseService
      .findAllCourses()
      .then((courses) => {
        this.setState({courses: courses});
      })
  }
  renderCourseRows() {
    let courses = null;
    if(this.state) {
      courses = this.state.courses.map(
        (course) => {
          return (<CourseRow deleteFun = {this.deleteCourse} key={course.id}
                            course={course}/>);
        }
      )
    }
    return (
      courses
    )
  }
  titleChanged(event) {
    this.setState({
      course: { title: event.target.value }
    });
  }
  createCourse() {
    this.courseService
      .createCourse(this.state.course)
      .then(() => { this.findAllCourses(); });
  }

  deleteCourse(courseId){
    this.courseService
        .deleteCourse(courseId)
        .then(() => {this.findAllCourses()})
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr><th>Title</th></tr>
            <tr>
              <th><input onChange={this.titleChanged}
                         className="form-control" id="titleFld"
                         placeholder="cs101"/></th>
              <th><button onClick={this.createCourse}
                          className="btn btn-primary">
                Add</button></th>
            </tr>
          </thead>
          <tbody>
            {this.renderCourseRows()}
          </tbody>
        </table>
      </div>
    )
  }
}
export default CourseList;
