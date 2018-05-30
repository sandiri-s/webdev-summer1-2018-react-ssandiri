import * as constants from "../constants/WidgetConstants"

export const WidgetReducer = (state = {widgets: [], preview: false}, action) => {
  let newState
  switch (action.type) {

    case constants.PREVIEW:
      return {
        widgets: state.widgets,
        preview: !state.preview
      }

    case constants.TEXT_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.text = action.text
          }
          return Object.assign({}, widget)
        })
      }

      case constants.HREF_CHANGED:
        return {
          widgets: state.widgets.map(widget => {
            if(widget.id === action.id) {
              widget.href = action.href
            }
            return Object.assign({}, widget)
          })
        }

    case constants.HEADING_SIZE_CHANGED:
      return {
        widgets: state.widgets.map(widget => {
          if(widget.id === action.id) {
            widget.size = action.size
          }
          return Object.assign({}, widget)
        })
      }

      case constants.LIST_TYPE_CHANGED:
        return {
          widgets: state.widgets.map(widget => {
            if(widget.id === action.id) {
              widget.listType = action.listType
            }
            return Object.assign({}, widget)
          })
        }

      case constants.NAME_CHANGED:
        return {
          widgets: state.widgets.map(widget => {
            if(widget.id === action.id) {
              widget.name = action.name
            }
            return Object.assign({}, widget)
          })
        }

        case constants.SRC_CHANGED:
          return {
            widgets: state.widgets.map(widget => {
              if(widget.id === action.id) {
                widget.src = action.src
              }
              return Object.assign({}, widget)
            })
          }


    case constants.SELECT_WIDGET_TYPE:
      console.log(action);
      let newState = {
        widgets: state.widgets.filter((widget) => {
          if(widget.id === action.id) {
            widget.widgetType = action.widgetType
          }
          return true;
        })
      }
      return JSON.parse(JSON.stringify(newState))

    case constants.SAVE:


      fetch('https://course-mngmnt-webdev-ssandiri.herokuapp.com/api/lesson/'+action.lessonId+"/widgets", {
        method: 'post',
        body: JSON.stringify(state.widgets),
        headers: {
          'content-type': 'application/json'}
      })


      return state
    case constants.FIND_ALL_WIDGETS_FOR_LESSON:
      newState = Object.assign({}, state)
      newState.widgets = action.widgets
      return newState
    case constants.DELETE_WIDGET:
      return {
        widgets: state.widgets.filter(widget => (
          widget.id !== action.id
        ))
      }

    case constants.INCREASE_ORDER_WIDGET:
    return {
      widgets: state.widgets.map(widget => {
        if(widget.order == action.order) {
          widget.order = widget.order + 1;
          return Object.assign({}, widget)
        }

        if(widget.order == (action.order+1)){
          widget.order = widget.order - 1;
          return Object.assign({}, widget)
        }
        return Object.assign({}, widget)
      }).sort(function(a,b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} )
    }

    case constants.DECREASE_ORDER_WIDGET:
    return {
      widgets: state.widgets.map(widget => {
        if(widget.order == action.order) {
          widget.order = widget.order - 1;
          return Object.assign({}, widget)
        }

        if(widget.order == (action.order-1)){
          widget.order = widget.order + 1;
          return Object.assign({}, widget)
        }
        return Object.assign({}, widget)
      }).sort(function(a,b) {return (a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0);} )
    }

    case constants.ADD_WIDGET:
      return {
        widgets: [
          ...state.widgets,
          {
            id: state.widgets.length + 1,
            text: 'New Widget',
            name: 'Widget Name',
            widgetType: 'Heading',
            size: '2',
            listType:'unordered',
            src:'',
            href:'',
            order:state.widgets.length + 1
          }
        ]
      }
    default:
      return state
  }
}
