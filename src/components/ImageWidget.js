import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'


const Image = ({widget, preview, srcChanged,nameChanged}) => {
  let selectElem
  let inputNameElem
  let inputSrcElem
  return(
    <div>

      <div hidden={preview}>
        <h2> Heading {widget.size}</h2>
          <input onChange={() => srcChanged(widget.id, inputSrcElem.value)}
                 value={widget.src}
                 ref={node => inputSrcElem = node}/>
               <input onChange={() => nameChanged(widget.id, inputNameElem.value)}
                        value={widget.name}
                        ref={node => inputNameElem = node}/>

          <h3>Preview</h3>

      </div>
      <img src={widget.src} alt="preview image" />
    </div>
  )
}
const dispathToPropsMapper = dispatch => ({
  srcChanged: (widgetId, newText) =>
    actions.srcChanged(dispatch, widgetId, newText),
    nameChanged: (widgetId, newName) =>
      actions.nameChanged(dispatch, widgetId, newName),
  headingSizeChanged: (widgetId, newSize) =>
    actions.headingSizeChanged(dispatch, widgetId, newSize)
})
const stateToPropsMapper = state => ({
  preview: state.preview
})
 const ImageContainer = connect(stateToPropsMapper, dispathToPropsMapper)(Image)
 export default ImageContainer;
