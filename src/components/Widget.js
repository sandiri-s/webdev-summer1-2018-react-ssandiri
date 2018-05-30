import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET,DECREASE_ORDER_WIDGET,INCREASE_ORDER_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'
import HeadingContainer from './HeadingWidget'
import ParagraphContainer from './ParagraphWidget'
import ListContainer from './ListWidget'
import ImageContainer from './ImageWidget'
import LinkContainer from './LinkWidget'

const Widget = ({widget, preview, widgetLength, dispatch}) => {
  let selectElement
  return(
    <li className="widget-list-item">

      <div id="row" className="row" hidden={preview}>
      <h3 className="col-6">
      {widget.className}
    </h3>

      <div className="col-6">
      <select className="button-space" value={widget.className}
              onChange={e =>
          dispatch({
            type: 'SELECT_WIDGET_TYPE',
            id: widget.id,
            className: selectElement.value
          })} ref={node => selectElement = node}>
        <option>Heading</option>
        <option>Paragraph</option>
        <option>List</option>
        <option>Link</option>
        <option>Image</option>
      </select>

      <button  onClick={e => (
        dispatch({type: DECREASE_ORDER_WIDGET, widgetOrder: widget.widgetOrder})
      )} disabled={(widget.widgetOrder == 1)} className="btn btn-warning my-2 my-sm-0 button-space" type="button"><i class="fa fa-arrow-circle-up fa-lg "></i></button>

    <button  onClick={e => (
        dispatch({type: INCREASE_ORDER_WIDGET, widgetOrder: widget.widgetOrder})
      )}  disabled={(widget.widgetOrder==widgetLength)} className="btn btn-warning my-2 my-sm-0 button-space" type="button"><i class="fa fa-arrow-circle-down fa-lg"></i></button>


    <button className="btn btn-danger button-space" onClick={e => (
        dispatch({type: DELETE_WIDGET, id: widget.id})
      )}><i className="fa fa-trash"></i></button>

  </div>
  </div>

      <div>
        {widget.className==='Heading' && <HeadingContainer widget={widget}/>}
        {widget.className==='Paragraph' && <ParagraphContainer widget={widget}/>}
        {widget.className==='List' && <ListContainer widget={widget}/>}
        {widget.className==='Image' && <ImageContainer widget={widget}/>}
        {widget.className==='Link' && <LinkContainer widget={widget}/>}
      </div>
    </li>
  )
}
const WidgetContainer = connect(state => ({
  preview: state.preview
}))(Widget)
export default WidgetContainer
