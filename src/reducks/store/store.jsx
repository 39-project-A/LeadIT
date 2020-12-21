import {
  createStore as reduxCreateStore,
  combineReducers,
  compose,
  applyMiddleware,
} from "redux";
import { DotReducer } from "../dots/reducer";
import { StarReducer } from "../star/reducer";
import { LoadingReducer } from "../loading/reducer";
import { IconReducer } from "../userIcon/reducer";
import reduxThunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //Redux DevToolsを使うために定義
export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      dots: DotReducer,
      star: StarReducer,
      loading: LoadingReducer,
      icons: IconReducer,
    }),
    composeEnhancers(applyMiddleware(reduxThunk))
  );
}
