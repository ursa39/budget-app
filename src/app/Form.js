import { useState, useRef } from "react";
import { DateTime } from "luxon";
import { useDispatch } from "react-redux";
import { currentAdded, currentSaved } from "../features/current/currentSlice";
import { categoryList } from './categoryList';
import { nanoid } from 'nanoid'

// styles
import "./Form.scss";

function Form(props) {
  const dispatch = useDispatch();
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

  const [inputCategory, setInputCategory] = useState("noCategory");
  const handleCategoryChange = (e) => {
    setInputCategory(e.target.value);
  };

  const [inputDesc, setInputDesc] = useState("");
  const handleDescChange = (e) => {
    setInputDesc(e.target.value);
  };

  const [inputPayment, setInputPayment] = useState("credit");
  const handlePaymentChange = (e) => {
    setInputPayment(e.target.value);
  };

  const [inputShared, setIinputShared] = useState(false);
  const handleSharedChange = (e) => {
    setIinputShared(e.target.checked);
  };

  const resetInputValue = () => {
    setInputDate(DateTime.local().toFormat("yyyy-MM-dd"));
    setInputPrice("");
    setInputDesc("");
    setInputCategory("");
  };

  const dateInputEl = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    resetInputValue();
    dispatch(
      currentAdded({
        id: nanoid(),
        date: inputDate,
        price: inputPrice,
        category: inputCategory,
        desc: inputDesc,
        pay: inputPayment,
        shared: inputShared
      })
    );
    dispatch(currentSaved());
    dateInputEl.current.focus();
  };

  const categoryOptions = categoryList.map(category => {
    return <option value={category.value} key={category.value}>{category.name}</option>;
  });

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
      <select className="budget-form__category" value={inputCategory} onChange={handleCategoryChange}>
        {categoryOptions}
      </select>
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
      <div className="budget-form__payment">
        <label><input defaultChecked className="budget-form__radio" name="payment" type="radio" value="credit" onChange={handlePaymentChange} />クレジット</label>
        <label><input className="budget-form__radio" name="payment" type="radio" value="cash" onChange={handlePaymentChange} />現金</label>
      </div>
      <div className="budget-form__shared">
        <input type="checkbox" checked={inputShared} onChange={handleSharedChange}></input>
        共同支出
      </div>
    </form>
  );
}

export default Form;
