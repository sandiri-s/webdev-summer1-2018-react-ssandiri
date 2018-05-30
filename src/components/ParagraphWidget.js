import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'


const Paragraph = ({widget, preview, textChanged,nameChanged}) => {
  let inputNameElem
  let inputElem
  return(
    <div>

      <div hidden={preview} className="input-children">
        <div className="widget-elements">
          <textarea onChange={() => textChanged(widget.id, inputElem.value)}
                 value={widget.text}
                 ref={node => inputElem = node}/>
             </div>
                     <div className="widget-elements">
                 <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                          value={widget.name}
                          ref={node => inputNameElem = node}/>
                      </div>
                        <h5>Preview</h5>

      </div >
      <div>
   <p>{widget.text}</p>
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
