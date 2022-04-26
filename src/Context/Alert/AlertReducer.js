const AlertReducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_ALERT":
            return {
                msg: payload.msg,
                type: payload.type,
            };
        case "RESET_ALERT":
            return null;

        default:
            return state;
    }
};

export default AlertReducer;
