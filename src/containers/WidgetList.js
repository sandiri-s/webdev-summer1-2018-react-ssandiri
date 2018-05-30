import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from "../actions/WidgetActions"
import WidgetContainer from '../components/Widget'

class WidgetList extends Component {
  constructor(props) {
    super(props)
    this.state = {lessonId: ''};
    this.selectLesson = this.selectLesson.bind(this);
    this.saveToServer = this.saveToServer.bind(this);

  }

    componentDidMount() {
      this.selectLesson
      (this.props.lessonId);
    }
    componentWillReceiveProps(newProps) {
      this.selectLesson
      (newProps.lessonId);
      if(this.props.lessonId!=newProps.lessonId){
      this.props.findAllWidgetsForLesson(newProps.lessonId);
      }
    }

    selectLesson(lessonId) {
      this.setState({lessonId: lessonId});
    }

  saveToServer(){

    this.props.save(this.state.lessonId);
  }
  render() {
    console.log(this.props.widgets)
    return(
      <div>
        <div className="row" id="save-preview">
        <div className="col-8">
        </div>

        <div className="col-4">
        <button type="button" className="btn btn-success" id="save-btn" disabled={this.props.previewMode} onClick={this.saveToServer}>
          Save
        </button>
        <button type ="button" className="btn btn-primary"id="preview-btn" onClick={this.props.preview}>
            Preview
          </button>
        </div>
        </div>


        <ul>
          {this.props.widgets.map(widget => (
            <WidgetContainer widget={widget}
                             preview={this.props.previewMode}
                             key={widget.id} widgetLength ={this.props.widgets.length}/>
          ))}
        </ul>

        <button className ="btn btn-danger float-right" onClick={this.props.addWidget}><i class="fa fa-plus"></i>
        </button>

      </div>
    )
  }
}

const stateToPropertiesMapper = (state) => ({
  widgets: state.widgets,
  previewMode: state.preview
})
const dispatcherToPropsMapper
  = dispatch => ({
  findAllWidgetsForLesson: (lessonId) => actions.findAllWidgetsForLesson(dispatch,lessonId),
  addWidget: () => actions.addWidget(dispatch),
  save: (lessonId) => actions.save(dispatch,lessonId),
  preview: () => actions.preview(dispatch)
})
const WidgetListContainer = connect(
  stateToPropertiesMapper,
  dispatcherToPropsMapper)(WidgetList)

export default WidgetListContainer
