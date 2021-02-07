// styles
import "./PriceSum.scss";

function PriceSum(props) {
  const list = props.listState.list;
  const sum = list.reduce((acc, val) => {
    return acc + parseInt(val.inputPrice);
  }, 0);
  return (
    <div className="price-sum">合計: ¥{ sum.toLocaleString() }</div>
  );
}

export default PriceSum;