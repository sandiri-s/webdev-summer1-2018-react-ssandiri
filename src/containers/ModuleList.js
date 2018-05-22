import React, {Component} from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';


export default class ModuleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseId: '',
      courseTitle: '',
      module: {
        title: ''
      },
      modules: []
    };
    this.createModule = this.createModule.bind(this);
    this.titleChanged = this.titleChanged.bind(this);

    this.setCourseId = this.setCourseId.bind(this);
    this.setCourseTitle = this.setCourseTitle.bind(this);

    this.courseService = CourseService.instance;
    this.moduleService = ModuleService.instance;
  }
  setModules(modules) {
    this.setState({modules: modules})
  }
  findAllModulesForCourse(courseId) {
    this.moduleService.findAllModulesForCourse(courseId).then((modules) => {
      this.setModules(modules)
    });
  }

  setCourseId(courseId) {

    this.setState({courseId: courseId});
  }

  setCourseTitle(courseTitle) {

    this.setState({courseTitle: courseTitle});
  }

  componentDidMount() {
        this.setCourseId(this.props.courseId);
  }
  componentWillReceiveProps(newProps) {
    this.setCourseId(newProps.courseId);
    this.courseService.findCourseById(newProps.courseId).then((course) => {
      this.setCourseTitle(course.title);});
    this.findAllModulesForCourse(newProps.courseId)
  }

  createModule() {
    this.moduleService.createModule(this.props.courseId, this.state.module).then(() => {
      this.findAllModulesForCourse(this.props.courseId)
    })
  }
  titleChanged(event) {
    this.setState({
      module: {
        title: event.target.value
      }
    });
  }
  renderListOfModules() {
    let modules = this.state.modules.map(function(module) {
      return <ModuleListItem module={module} key={module.id}/>
    });
    return modules;
  }
  render() {
    return (
      <div>
      <div className="row">

        <div className ="col-1">

            <i className="fa fa-times-circle fa-2x"></i>

        </div>

        <div className ="col-11">
          <h5 id="course-title">{this.state.courseTitle}</h5>
        </div>
      </div>

      <input onChange={this.titleChanged} value={this.state.module.title} placeholder="title" className="form-control"/>
      <button onClick={this.createModule} className="btn btn-primary btn-block">
        <i className="fa fa-plus "></i>
      </button>
      <br/>
      <ul className="list-group" id="modules-list">
        {this.renderListOfModules()}
      </ul>
    </div>);
  }
}
