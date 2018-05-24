// <li className="nav-item"><a className="nav-link active"
//                         href="#">Active Tab</a></li>
// <li className="nav-item"><a className="nav-link"
//                         href="#">Another Tab</a></li>

import React, {Component} from 'react';
import LessonTab from '../components/LessonTab';
import LessonService from '../services/LessonService';

export default class LessonTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleId: '',
      lesson: {
        title: ''
      },
      lessons: []
    };
    this.createLesson = this.createLesson.bind(this);
    this.titleChanged = this.titleChanged.bind(this);

    this.setModuleId = this.setModuleId.bind(this);

    this.deleteLesson = this.deleteLesson.bind(this);

    this.lessonService = LessonService.instance;
  }
  setLessons(lessons) {
    this.setState({lessons: lessons})
  }
  findAllLessonsForModule(moduleId) {
    this.lessonService.findAllLessonsForModule(moduleId).then((lessons) => {
      this.setLessons(lessons)
    });
  }

  setModuleId(moduleId) {

    this.setState({moduleId: moduleId});
  }

  componentDidMount() {
    this.setModuleId(this.props.moduleId);
  }
  componentWillReceiveProps(newProps) {
    this.setModuleId(newProps.moduleId);
    this.findAllLessonsForModule(newProps.moduleId)
  }

  createLesson() {
    let lesson ;
    if(this.state.lesson.title==''){
      lesson= {title:"Untitled Lesson"}
    }
    else{

      lesson = this.state.lesson;
    }

    this.lessonService.createLesson(this.props.moduleId, lesson).then(() => {
      this.findAllLessonsForModule(this.props.moduleId)
    })
  }
  titleChanged(event) {
    this.setState({
      lesson: {
        title: event.target.value
      }
    });
  }

  deleteLesson(lessonId, moduleId) {
    this.lessonService.deleteLesson(lessonId).then(() => {
      this.findAllLessonsForModule(moduleId)
    })
  }

  renderListOfLessons() {
    let lessons = this.state.lessons.map((lesson) => {
      return <LessonTab deleteFun={this.deleteLesson} lesson={lesson} moduleId={this.props.moduleId} key={lesson.id}/>
    });
    return lessons;
  }
  render() {
    return (<div>
      <div className="row">

        <div className="col-8">
          <ul className="nav nav-pills" id= "list-of-lessons">
            {this.renderListOfLessons()}
          </ul>
        </div>

        <div className="col-4">
          <div className="input-group mb-3">
            <input onChange={this.titleChanged} value={this.state.lesson.title} placeholder="Enter the lesson title" type="text" className="form-control" aria-describedby="basic-addon2"/>
            <div className="input-group-append">
              <button onClick={this.createLesson} className="btn btn-primary btn-block">
                <i className="fa fa-plus "></i>
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>);
  }
}
