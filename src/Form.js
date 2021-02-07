import { useState, useRef } from "react";
import { DateTime } from "luxon";

// styles
import "./Form.scss";

function Form(props) {
  const [inputDate, setInputDate] = useState(
    DateTime.local().toFormat("yyyy-MM-dd")
  );
  const handleDateChange = (e) => {
    setInputDate(e.target.value);
  };

  const [inputPrice, setInputPrice] = useState("");
  const handlePriceChange = (e) => {
    setInputPrice(e.target.value);
  };

  const [inputDesc, setInputDesc] = useState("");
  const handleDescChange = (e) => {
    setInputDesc(e.target.value);
  };

  const resetInputValue = () => {
    setInputDate(DateTime.local().toFormat("yyyy-MM-dd"));
    setInputPrice('');
    setInputDesc('');
  }

  const dateInputEl = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    resetInputValue();
    const newList = [...props.listState.list];
    newList.push({
      inputDate,
      inputPrice,
      inputDesc
    });
    props.listState.setList(newList);
    dateInputEl.current.focus();
  }

  return (
    <form className="budget-form" onSubmit={handleSubmit}>
      <input
        className="budget-form__date"
        type="date"
        value={inputDate}
        onChange={handleDateChange}
        ref={dateInputEl}
      ></input>
      <input
        className="budget-form__price"
        type="text"
        name="price"
        value={inputPrice}
        onChange={handlePriceChange}
      ></input>
      <input
        className="budget-form__desc"
        type="text"
        list="descOption"
        name="desc"
        value={inputDesc}
        onChange={handleDescChange}
      ></input>
      <datalist id="descOption">
        <option value="食費"></option>　<option value="生活雑貨"></option>　
        <option value="Suica"></option>
      </datalist>
      <input className="budget-form__submit" type="submit" value="submit" />
    </form>
  );
}

export default Form;
