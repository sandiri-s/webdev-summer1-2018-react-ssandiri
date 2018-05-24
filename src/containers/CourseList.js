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
    this.state ={

      course: {
        title: ''
      },
      courses: []
    };
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
    let course ;
    if(this.state.course.title==''){
      course= {title:"New Course"}
    }
    else{

      course = this.state.course;
    }
    this.courseService.createCourse(course).then(() => {
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


        <table className="table ">
          <thead className ='bg-light'>
              <tr>
                <th className="">Title</th>
                <th className="">Owned by</th>
                <th className="">Last modified time</th>
                <th className=""></th>
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
