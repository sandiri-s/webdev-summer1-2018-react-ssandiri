import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'
import HeadingContainer from './HeadingWidget'
import ParagraphContainer from './ParagraphWidget'
import ListContainer from './ListWidget'
import ImageContainer from './ImageWidget'

const Widget = ({widget, preview, dispatch}) => {
  let selectElement
  return(
    <li>
      <div hidden={preview}>
      {widget.id} {widget.widgetType}

      <select value={widget.widgetType}
              onChange={e =>
          dispatch({
            type: 'SELECT_WIDGET_TYPE',
            id: widget.id,
            widgetType: selectElement.value
          })} ref={node => selectElement = node}>
        <option>Heading</option>
        <option>Paragraph</option>
        <option>List</option>
        <option>Link</option>
        <option>Image</option>
      </select>

      <button onClick={e => (
        dispatch({type: DELETE_WIDGET, id: widget.id})
      )}>Delete</button>
      </div>
      <div>
        {widget.widgetType==='Heading' && <HeadingContainer widget={widget}/>}
        {widget.widgetType==='Paragraph' && <ParagraphContainer widget={widget}/>}
        {widget.widgetType==='List' && <ListContainer widget={widget}/>}
        {widget.widgetType==='Image' && <ImageContainer widget={widget}/>}
      </div>
    </li>
  )
}
const WidgetContainer = connect(state => ({
  preview: state.preview
}))(Widget)
export default WidgetContainer
