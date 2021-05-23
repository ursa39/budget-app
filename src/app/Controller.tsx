import './controller.scss';
import { useSelector } from "react-redux";

import { StoreState } from './store';

declare module 'react-redux' {
  interface DefaultRootState extends StoreState {}
}

function Controller() {

  const list = useSelector((state) => state.current);
  const postData = async () => {
    if (window.confirm('データをJSONに出力しますか？')) {
      fetch("http://localhost:3010", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(list),
      });
    }
  };

  return (
    <div className="controller">
      <button className="controller__save-button" onClick={postData}>JSON出力</button>
    </div>
  );
}

export default Controller;