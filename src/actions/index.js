import firebase from 'firebase';

import * as T from './types';

/**
 * Delete Vehicle action creator.
 * @param {string} uid
 * @returns {function}
 */
export const deleteVehicle = (uid) => {
  const { currentUser } = firebase.auth();

  return dispatch => firebase.database().ref(`/users/${currentUser.uid}/vehicles/${uid}`)
    .remove()
    .then(() => {
      dispatch({
        type: T.VEHICLE_DELETE,
      });
    });
};

/**
 * Deselect Vehicle action creator.
 * @returns {{type: string}}
 */
export const deselectVehicle = () => ({
  type: T.VEHICLE_DESELECT,
});

/**
 * Edit Vehicle action creator.
 * @param {string} uid
 * @returns {{type: string, payload: string}}
 */
export const editVehicle = uid => ({
  type: T.VEHICLE_EDIT,
  payload: uid,
});

/**
 * Fetch Vehicles action creator.
 * @returns {function}
 */
export const fetchVehicles = () => {
  const { currentUser } = firebase.auth();

  return dispatch => firebase.database().ref(`/users/${currentUser.uid}/vehicles`)
    .on('value', (snapshot) => {
      let vehicles = snapshot.val();

      if (!vehicles) {
        vehicles = {};
      }

      // Provide vehicles with UIDs
      for (const uid of Object.keys(vehicles)) { // eslint-disable-line no-restricted-syntax
        vehicles[uid].uid = uid;
      }

      dispatch({
        type: T.VEHICLES_FETCH,
        payload: vehicles,
      });
    });
};

/**
 * Select Vehicle action creator.
 * @param {string} uid
 * @returns {{type: string, payload: string}}
 */
export const selectVehicle = uid => ({
  type: T.VEHICLE_SELECT,
  payload: uid,
});

/**
 * Update Vehicle action creator.
 * @param {string} uid
 * @param {{category: string, notes: string, title: string}}
 * @returns {function}
 */
export const updateVehicle = (uid, { category, notes, title }) => {
  const { currentUser } = firebase.auth();

  return dispatch => firebase.database().ref(`/users/${currentUser.uid}/vehicles/${uid}`)
    .set({
      uid, category, notes, title,
    })
    .then(() => {
      dispatch({
        type: T.VEHICLE_UPDATE,
      });
    });
};

/**
 * Update Vehicle Edit Form action creator.
 * @param {string} prop
 * @param {string} value
 * @returns {{type: string, payload: {prop: string, value: string}}}
 */
export const updateVehicleEditForm = (prop, value) => ({
  type: T.VEHICLE_EDIT_FORM_UPDATE,
  payload: {
    prop,
    value,
  },
});

export const storeVehicle = ({ title, category, notes }) => {
  const { currentUser } = firebase.auth();

  return dispatch => firebase.database().ref(`/users/${currentUser.uid}/vehicles`)
    .push({ title, category, notes })
    .then(() => {
      dispatch({
        type: T.VEHICLE_STORE,
      });
    });
};

export const updateVehicleForm = ({ prop, value }) => ({
  type: T.VEHICLE_FORM_UPDATE,
  payload: { prop, value },
});
