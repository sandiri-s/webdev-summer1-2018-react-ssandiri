import React from 'react';
import LessonTabs from './LessonTabs';
import WidgetListEditor from './WidgetListEditor'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class ModuleEditor
  extends React.Component {

  constructor(props) {
    super(props)
    this.state = {ModuleId: ''};
    this.selectModule = this.selectModule.bind(this);
  }

  componentDidMount() {
    this.selectModule
    (this.props.match.params.moduleId);
  }
  componentWillReceiveProps(newProps) {
    this.selectModule
    (newProps.match.params.moduleId);
  }

  selectModule(moduleId) {
    this.setState({moduleId: moduleId});
  }

  render() {
    return(
      <Router>
      <div>
          <LessonTabs moduleId={this.state.moduleId}/>

        <div id="lesson-editor">
          <Route path="/lesson/:lessonId"
                exact component={WidgetListEditor}>
          </Route>
            </div>

</div>
</Router>
  );}}
