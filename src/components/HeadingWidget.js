import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'


const Heading = ({widget, preview, headingTextChanged, headingSizeChanged,headingNameChanged}) => {
  let selectElem
  let inputNameElem
  let inputTextElem
  return(
    <div>

      <div hidden={preview}>
        <h2> Heading {widget.size}</h2>
          <input onChange={() => headingTextChanged(widget.id, inputTextElem.value)}
                 value={widget.text}
                 ref={node => inputTextElem = node}/>
               <input onChange={() => headingNameChanged(widget.id, inputNameElem.value)}
                        value={widget.name}
                        ref={node => inputNameElem = node}/>
          <select onChange={() => headingSizeChanged(widget.id, selectElem.value)}
                  value={widget.size}
                  ref={node => selectElem = node}>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>

          <h3>Preview</h3>

      </div>
      {widget.size == 1 && <h1>{widget.text}</h1>}
      {widget.size == 2 && <h2>{widget.text}</h2>}
      {widget.size == 3 && <h3>{widget.text}</h3>}
    </div>
  )
}
const dispathToPropsMapper = dispatch => ({
  headingTextChanged: (widgetId, newText) =>
    actions.headingTextChanged(dispatch, widgetId, newText),
    headingNameChanged: (widgetId, newName) =>
      actions.headingNameChanged(dispatch, widgetId, newName),
  headingSizeChanged: (widgetId, newSize) =>
    actions.headingSizeChanged(dispatch, widgetId, newSize)
})
const stateToPropsMapper = state => ({
  preview: state.preview
})
 const HeadingContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Heading)
 export default HeadingContainer;
