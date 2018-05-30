import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'


const Link = ({widget, preview, hrefChanged,nameChanged,textChanged}) => {
  let selectElem
  let inputNameElem
  let inputHrefElem
  let inputTextElem
  return(
    <div>

      <div hidden={preview}>
          <input onChange={() => hrefChanged(widget.id, inputHrefElem.value)}
                 value={widget.href}
                 ref={node => inputHrefElem = node}/>
                 <input onChange={() => textChanged(widget.id, inputTextElem.value)}
                        value={widget.text}
                        ref={node => inputTextElem = node}/>
               <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                        value={widget.name}
                        ref={node => inputNameElem = node}/>


                      <h4>Preview</h4>

      </div>
      <a href={widget.href}> {widget.text} </a>
    </div>
  )
}
const dispathToPropsMapper = dispatch => ({
  textChanged: (widgetId, newText) =>
    actions.textChanged(dispatch, widgetId, newText),
  hrefChanged: (widgetId, newHref) =>
    actions.hrefChanged(dispatch, widgetId, newHref),
    nameChanged: (widgetId, newName) =>
      actions.nameChanged(dispatch, widgetId, newName),


})
const stateToPropsMapper = state => ({
  preview: state.preview
})
 const LinkContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Link)
 export default LinkContainer;
