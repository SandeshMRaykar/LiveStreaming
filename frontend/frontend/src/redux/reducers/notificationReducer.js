const initialState = {
    notifications: []
};

export default function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload
            };
        case 'NEW_NOTIFICATION':
            return {
                ...state,
                notifications: [action.payload, ...state.notifications]
            };
        default:
            return state;
    }
}
