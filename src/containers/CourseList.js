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

    this.courseService.findAllCourses().then((courses) => {
      this.setState({courses: courses});
    })
  }
  renderCourseRows() {
    let courses = null;
    if (this.state) {
      courses = this.state.courses.map((course) => {
        return (<CourseRow deleteFun={this.deleteCourse} key={course.id} course={course}/>);
      })
    }
    return (courses)
  }
  titleChanged(event) {
    this.setState({
      course: {
        title: event.target.value
      }
    });
  }
  createCourse() {
    this.courseService.createCourse(this.state.course).then(() => {
      this.findAllCourses();
    });
  }

  deleteCourse(courseId) {
    this.courseService.deleteCourse(courseId).then(() => {
      this.findAllCourses()
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="#">Course Manager</a>
          <form className="form-inline">
            <input onChange={this.titleChanged} id="titleFld" className="form-control mr-sm-2" type="search" placeholder="Enter the course title" aria-label="Search"/>
            <button onClick={this.createCourse} className="btn btn-danger my-2 my-sm-0" type="button">Add</button>
          </form>
        </nav>
        <nav className="navbar navbar-expand-lg navbar-light bg-light  col-12">
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <div className="col-4">Title</div>
                <div className="col-2">Owned by</div>
                <div className="col-4">Last modified time</div>
                <div className="col-2"></div>
    </div>
</nav>

        <table className="table">
                <tbody>
                  {this.renderCourseRows()}
                </tbody>
              </table>

            </div>

            )
    }
  }
  export default CourseList;
