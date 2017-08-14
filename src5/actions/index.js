import * as HTTP from "../common/http";
import R from "ramda";

export const REQUEST_POSTS = "REQUEST_POSTS";
export const RECEIVE_POSTS = "RECEIVE_POSTS";

export const acts = (name, value, id) => ({
  type: "ACTS",
  name: name,
  value: value,
  Id: id
});


export const addFamiltySelected = (name, value, id) => ({
  type: 'ADD-FAMILY-SELECTED',
  name: name,
  value: value,
  Id: id
})

export const selectorOriginial = n => ({
  type: "SELECTOR",
  id: n
});

/************************************************************/
/* ASYNC  */

export const selector = n => async (dispatch, getState) => {
  console.log('selector action n: '+n)

  dispatch(selectorOriginial(n));
if(getState().data.projects) {
  console.log('select getState().projects[n].id '+JSON.stringify(getState().data.projects[getState().data.select - 1].CustomFieldValue_Id))
  const response = await HTTP.customFieldValue(getState().data.projects[getState().data.select - 1].CustomFieldValue_Id)
  const customFieldValue = await response.json()
  console.log('customFieldValue fam '+customFieldValue['CustomField5'])

  const response2 = await HTTP.familyMembers();
  const familyMembers = await response2.json()
  console.log('familyMembers... '+ JSON.stringify(familyMembers.ListItems))
 const s =R.filter(x => R.contains(x.Value,customFieldValue['CustomField5'].split(',')), familyMembers.ListItems)
//const s =R.prop('Name',R.filter(x => x.Value === customFieldValue['CustomField5'],familyMembers.ListItems))
  console.log('FAMILY MEMBER SELECTED '+ JSON.stringify(R.map(x =>x.Name,s)))
  dispatch(addFamiltySelected('familyMembersSelected', R.map(x =>x.Name,s), getState().data.projects[getState().data.select - 1].Id))
}
  //todo...change logic?
  if (getState().data.projects) return;
  console.log('select getState().projects[n].id '+getState().data.select)

  dispatch(requestPostsData());
  dispatch(requestStatuses());
  dispatch(requestTypes());
};
//selector(1);

export const requestPostsData = () => async dispatch => {
  dispatch(requestPosts(posts));
  const response = await HTTP.postsData();
  const posts = await response.json();
  //const response2 = await HTTP.customFieldValue();
  //const customField = await response2.json()
  //console.log('CUSTOM FIELD: '+JSON.stringify(customField))
  dispatch(receivePosts(posts));
  return posts;
};
export const requestPosts = () => ({
  type: REQUEST_POSTS
  //reddit
});
export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json,
  receivedAt: Date.now()
});

export const requestStatuses = () => async dispatch => {
  const response = await HTTP.projectStatuses();
  const statuses = await response.json();
  dispatch(receiveStatuses(statuses));
  return statuses;
};
export const receiveStatuses = json => ({
  type: "RECEIVE_STATUSES",
  statuses: json
});

export const requestTypes = () => async dispatch => {
  const response = await HTTP.projectTypes();
  const types = await response.json();
  dispatch(receiveTypes(types));
  return types;
};
export const receiveTypes = json => ({
  type: "RECEIVE_TYPES",
  projectTypes: json
});
