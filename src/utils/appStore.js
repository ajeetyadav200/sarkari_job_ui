// // import { configureStore } from '@reduxjs/toolkit';
// // import userReducer from './userSlice';
// // import assistantReducer from '../slice/assistanceSlice';
// // import publisherSlice from '../slice/publisherSlice';
// // import jobReducer from '../slice/jobSlice';



// // const appStore = configureStore({
// //   reducer: {
// //     user: userReducer,
// //     assistants: assistantReducer,
// //     publishers: publisherSlice,
// //   jobs: jobReducer,
// //    middleware: (getDefaultMiddleware) =>
// //     getDefaultMiddleware({
// //       serializableCheck: false
// //     })
// //   },
// // });

// // export default appStore;



import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import assistantReducer from '../slice/assistanceSlice';
import publisherSlice from '../slice/publisherSlice';
import jobReducer from '../slice/jobSlice';
import admitCardReducer from '../slice/admitCardSlice';
import resultReducer from '../slice/resultSlice';

const appStore = configureStore({
  reducer: {
    user: userReducer,
    assistants: assistantReducer,
    publishers: publisherSlice,
    jobs: jobReducer,
    admitCards: admitCardReducer,
    results: resultReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default appStore;


