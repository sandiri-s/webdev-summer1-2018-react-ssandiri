import React from 'react';
import LessonTabs from './LessonTabs';

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
      <div>
          <LessonTabs moduleId={this.state.moduleId}/>

        <div className="row">
          This is a Lesson Editor
            </div>

</div>
  );}}
