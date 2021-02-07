import { DateTime } from "luxon";

// styles
import "./BudgetList.scss";

function BudgetList(props) {
  const list = props.listState.list;
  const items = list.map((item, index) => {
    const date = DateTime.fromFormat(item.inputDate, "yyyy-MM-dd").toFormat('MM/dd');
    return <li className="budget-list__item" key={ index }>{ date }: ¥{ parseInt(item.inputPrice).toLocaleString() }: { item.inputDesc }</li>;
  });
  return (
    <ul className="budget-list">
      {items}
    </ul>
  );
}

export default BudgetList;