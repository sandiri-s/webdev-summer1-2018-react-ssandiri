import React from  'react'
import {connect} from 'react-redux'
import {DELETE_WIDGET} from "../constants/WidgetConstants"
import * as actions from '../actions/WidgetActions'


class List extends React.Component {

  constructor(props) {
    super(props);
  }
  textToOrderedList(text){
    let stringArray = text.split("\n");
    return (

      <ol className="list-group" >
      {stringArray.map(line => ( <li> {line} </li>))}
    </ol>
  );
  }

  textToUnOrderedList(text){
    let stringArray = text.split("\n");
    return (

      <ul className="list-group" >
      {stringArray.map(line => ( <li> {line} </li>))}
    </ul>
  );
  }
  render(){
  let inputNameElem
  let inputElem
  let selectElem
  console.log(this.props.widget.listType);
  return(
    <div>

      <div hidden={this.props.preview} className="input-children">
        <div className="widget-elements">
          <textarea onChange={() => this.props.textChanged(this.props.widget.id, inputElem.value)}
                 value={this.props.widget.text}
                 ref={node => inputElem = node} placeholder="Enter one list item per line"/>
             </div>

             <div className="widget-elements">
                       <select onChange={() => this.props.listTypeChanged(this.props.widget.id, selectElem.value)}
                               value={this.props.widget.listType}
                               ref={node => selectElem = node}>
                         <option value="unordered">Unordered List</option>
                         <option value="ordered">Ordered List</option>
                       </select>
                     </div>


             <div className="widget-elements">
                 <input onChange={() => this.props.nameChanged(this.props.widget.id, inputNameElem.value)}
                          value={this.props.widget.name}
                          ref={node => inputNameElem = node} placeholder="Widget Name"/>
                      </div>

          <h5 className="widget-elements">Preview</h5>

      </div >
      <div>
      {this.props.widget.listType == 'unordered' && <div>{this.textToUnOrderedList(this.props.widget.text)} </div>}
      {this.props.widget.listType == 'ordered' && <div>{this.textToOrderedList(this.props.widget.text)}</div>}
    </div>

    </div>
  );
}
}
const dispathToPropsMapper = dispatch => ({
  textChanged: (widgetId, newText) =>
    actions.textChanged(dispatch, widgetId, newText),

    nameChanged: (widgetId, newName) =>
      actions.nameChanged(dispatch, widgetId, newName),
      listTypeChanged: (widgetId, newType) =>
        actions.listTypeChanged(dispatch, widgetId, newType)
})
const stateToPropsMapper = state => ({
  preview: state.preview
})
 const ListContainer = connect(stateToPropsMapper, dispathToPropsMapper)(List)
 export default ListContainer;
