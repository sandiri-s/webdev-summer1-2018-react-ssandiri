import React from 'react';
import LessonTabs from './LessonTabs';
import WidgetListContainer from './WidgetList'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class WidgetListEditor
  extends React.Component {

  constructor(props) {
    super(props)
    this.state = {lessonId: ''};
    this.selectLesson = this.selectLesson.bind(this);
  }

  componentDidMount() {
    this.selectLesson
    (this.props.match.params.lessonId);
  }
  componentWillReceiveProps(newProps) {
    this.selectLesson
    (newProps.match.params.lessonId);
  }

  selectLesson(lessonId) {
    this.setState({lessonId: lessonId});
  }

  render() {
    return(

      <div>
          <WidgetListContainer lessonId={this.state.lessonId}/>

</div>

  );}}
