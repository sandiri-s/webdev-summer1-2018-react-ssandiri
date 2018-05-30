import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'


const Paragraph = ({widget, preview, textChanged,nameChanged}) => {
  let inputNameElem
  let inputElem
  return(
    <div>

      <div hidden={preview}>
        <h2> Heading {widget.size}</h2>
          <textarea onChange={() => textChanged(widget.id, inputElem.value)}
                 value={widget.text}
                 ref={node => inputElem = node}/>
                 <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                          value={widget.name}
                          ref={node => inputNameElem = node}/>

          <h3>Preview</h3>

      </div >
      <div>
   <h1>{widget.text}</h1>
   </div>
    </div>
  )
}
const dispathToPropsMapper = dispatch => ({
  textChanged: (widgetId, newText) =>
    actions.textChanged(dispatch, widgetId, newText),

    nameChanged: (widgetId, newName) =>
      actions.nameChanged(dispatch, widgetId, newName),

})
const stateToPropsMapper = state => ({
  preview: state.preview
})
 const ParagraphContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Paragraph)
 export default ParagraphContainer;
