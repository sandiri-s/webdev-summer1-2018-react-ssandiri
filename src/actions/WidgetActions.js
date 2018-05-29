import * as constants from "../constants/WidgetConstants"

export const headingTextChanged = (dispatch, widgetId, newText) => (
  dispatch({
    type: constants.HEADING_TEXT_CHANGED,
    id: widgetId,
    text: newText})
)
export const headingSizeChanged = (dispatch, widgetId, newSize) => (
  dispatch({
    type: constants.HEADING_SIZE_CHANGED,
    id: widgetId,
    size: newSize})
)

export const findAllWidgetsForLesson = (dispatch,lessonId) => {
  fetch('https://course-mngmnt-webdev-ssandiri.herokuapp.com/api/lesson/'+lessonId+"/widget")
    .then(response => (response.json()))
    .then(widgets => dispatch({
      type: constants.FIND_ALL_WIDGETS_FOR_LESSON,
      widgets: widgets }))
}
export const addWidget = dispatch => (
  dispatch({type: constants.ADD_WIDGET})
)
export const save = (dispatch,lessonId) => (
  dispatch({type: constants.SAVE,
            lessonId : lessonId})
)
export const preview = dispatch => (
  dispatch({type: constants.PREVIEW})
)
