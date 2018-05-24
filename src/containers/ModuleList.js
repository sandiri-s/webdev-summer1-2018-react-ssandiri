import React, {Component} from 'react';
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService';
import CourseService from '../services/CourseService';
import { Link } from 'react-router-dom';

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

    this.deleteModule = this.deleteModule.bind(this);

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
    let module ;
    if(this.state.module.title==''){
      module= {title:"New Module"}
    }
    else{

      module = this.state.module;
    }

    this.moduleService.createModule(this.props.courseId, module).then(() => {
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

  deleteModule(ModuleId,CourseId) {
    this.moduleService.deleteModule(ModuleId).then(() => {
      //this.findAllModulesForCourse(CourseId)
      window.location.href = '/course/' + CourseId;
    })
  }

  routeToCourseList(){

    window.location.href = '/'
  }

  renderListOfModules() {
    let modules = this.state.modules.map((module) =>  {
      return <ModuleListItem deleteFun={this.deleteModule} module={module} courseId ={this.props.courseId} key={module.id}/>
    });
    return modules;
  }
  render() {
    return (
      <div>
        <div id="module-list-header" >
      <div className="row" >

        <div className ="col-1">

                      <i className="fa fa-chevron-circle-left fa-2x" onClick={this.routeToCourseList}></i>

        </div>

        <div className ="col-11">
          <h5 id="course-title">{this.state.courseTitle}</h5>
        </div>
      </div>

      <div className="input-group mb-3" id="module-list-searchbar">
  <input onChange={this.titleChanged} value={this.state.module.title} placeholder="Enter the module title" type="text" className="form-control"  aria-describedby="basic-addon2"/>
  <div className="input-group-append">
    <button onClick={this.createModule} className="btn btn-primary btn-block">
      <i className="fa fa-plus "></i>
    </button>
  </div>
</div>
</div>
      <br/>
      <ul className="list-group" id="modules-list">
        {this.renderListOfModules()}
      </ul>
    </div>
    );
  }
}
